import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, Float, useTexture } from "@react-three/drei";
import * as THREE from "three";

import type { TSkill } from "../../types";

const TWO_PI = Math.PI * 2;

/**
 * The original portfolio drew every ball in its own 112px canvas (perspective
 * camera, fov 75, z = 5). All balls now share ONE canvas (browsers allow only
 * ~16 WebGL contexts, so 28 canvases would blank out the oldest ones). This is
 * the scale that makes a ball here look exactly like one of the originals.
 */
const UNIT = 112 / (2 * 5 * Math.tan((75 / 2) * (Math.PI / 180)));

export type BallInput = {
  /** index of the hovered ball, -1 for none */
  hovered: number;
  /** extra rotation (radians) given to each ball by dragging it */
  rot: { x: number; y: number }[];
  /** drag inertia (radians / second) */
  vel: { x: number; y: number }[];
  dragging: boolean[];
};

export const createBallInput = (count: number): BallInput => ({
  hovered: -1,
  rot: Array.from({ length: count }, () => ({ x: 0, y: 0 })),
  vel: Array.from({ length: count }, () => ({ x: 0, y: 0 })),
  dragging: Array.from({ length: count }, () => false),
});

/** Draws a bold coloured monogram (used when a skill has no logo image). */
const makeMonogramTexture = (text: string, color: string) => {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;

  const fontSize = text.length >= 4 ? 84 : text.length === 3 ? 108 : 150;
  const draw = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `800 ${fontSize}px Poppins, sans-serif`;
    ctx.fillText(text, size / 2, size / 2 + fontSize * 0.06);
    texture.needsUpdate = true;
  };

  draw();
  // redraw once Poppins has finished loading so the glyphs match the site font
  if (document.fonts) {
    document.fonts
      .load(`800 ${fontSize}px Poppins`)
      .then(draw)
      .catch(() => undefined);
  }

  return texture;
};

const DECAL_POSITION: [number, number, number] = [0, 0, 1];
const DECAL_ROTATION: [number, number, number] = [2 * Math.PI, 0, 6.25];

const ImageDecal: React.FC<{ url: string }> = ({ url }) => {
  const [map] = useTexture([url]);

  return (
    <Decal
      position={DECAL_POSITION}
      rotation={DECAL_ROTATION}
      scale={1}
      map={map}
    />
  );
};

const MonogramDecal: React.FC<{ text: string; color: string }> = ({
  text,
  color,
}) => {
  const map = useMemo(() => makeMonogramTexture(text, color), [text, color]);

  useEffect(() => () => map.dispose(), [map]);

  return (
    <Decal
      position={DECAL_POSITION}
      rotation={DECAL_ROTATION}
      scale={1}
      map={map}
    />
  );
};

interface IBall {
  skill: TSkill;
  index: number;
  x: number;
  y: number;
  k: number;
  input: React.MutableRefObject<BallInput>;
}

const Ball: React.FC<IBall> = ({ skill, index, x, y, k, input }) => {
  const body = useRef<THREE.Group>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);
  const motion = useRef({ scale: 1, velocity: 0, glow: 0 });

  useFrame((_state, delta) => {
    const dt = Math.min(delta, 0.05);
    const state = input.current;
    const hovered = state.hovered === index;
    const m = motion.current;

    // Bulge: an underdamped spring, the same soft "spring" feel as the cards.
    const target = hovered ? 1.2 : 1;
    m.velocity += (-170 * (m.scale - target) - 13 * m.velocity) * dt;
    m.scale += m.velocity * dt;

    // Violet glow that fades in on hover (the site's accent colour).
    m.glow += ((hovered ? 1 : 0) - m.glow) * (1 - Math.exp(-dt * 8));
    if (material.current) material.current.emissiveIntensity = m.glow * 0.35;

    // Drag rotation with inertia, easing back so the logo faces front again.
    const rot = state.rot[index];
    const vel = state.vel[index];
    if (!state.dragging[index]) {
      rot.x += vel.x * dt;
      rot.y += vel.y * dt;
      const decay = Math.exp(-dt * 3);
      vel.x *= decay;
      vel.y *= decay;
      if (Math.abs(vel.x) + Math.abs(vel.y) < 0.35) {
        const settle = 1 - Math.exp(-dt * 0.9);
        rot.x += (0 - rot.x) * settle;
        rot.y += (Math.round(rot.y / TWO_PI) * TWO_PI - rot.y) * settle;
      }
    }

    if (body.current) {
      body.current.scale.setScalar(m.scale);
      body.current.rotation.set(rot.x, rot.y, 0);
    }
  });

  return (
    <group position={[x, y, 0]} scale={k}>
      <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
        <group ref={body}>
          <mesh castShadow receiveShadow scale={2.75}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
              ref={material}
              color="#fff8eb"
              emissive="#915EFF"
              emissiveIntensity={0}
              polygonOffset
              polygonOffsetFactor={-5}
              flatShading
            />
            <Suspense fallback={null}>
              {skill.icon ? (
                <ImageDecal url={skill.icon} />
              ) : (
                <MonogramDecal
                  text={skill.monogram ?? skill.name.slice(0, 2)}
                  color={skill.color ?? "#915EFF"}
                />
              )}
            </Suspense>
          </mesh>
        </group>
      </Float>
    </group>
  );
};

interface ISkillsCanvas {
  skills: TSkill[];
  /** ball centres in canvas pixels, origin at the canvas centre, y pointing up */
  points: { x: number; y: number }[];
  /** size of one ball cell in px (112 on desktop) */
  cell: number;
  input: React.MutableRefObject<BallInput>;
  /** pause rendering while the section is off screen */
  active: boolean;
}

const SkillsCanvas: React.FC<ISkillsCanvas> = ({
  skills,
  points,
  cell,
  input,
  active,
}) => {
  const k = (cell / 112) * UNIT;

  return (
    <Canvas
      orthographic
      frameloop={active ? "always" : "never"}
      dpr={[1, 2]}
      camera={{ zoom: 1, position: [0, 0, 600], near: 0.1, far: 2000 }}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      {skills.map((skill, index) => {
        const point = points[index];
        if (!point) return null;

        return (
          <Ball
            key={skill.name}
            skill={skill}
            index={index}
            x={point.x}
            y={point.y}
            k={k}
            input={input}
          />
        );
      })}
    </Canvas>
  );
};

export default SkillsCanvas;
