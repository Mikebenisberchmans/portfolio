import {
  useCallback,
  useLayoutEffect,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

import { SkillsCanvas, createBallInput } from "../canvas";
import { SectionWrapper } from "../../hoc";
import { skills } from "../../constants";

const TIP_WIDTH = 220;
const TOUCH_HIDE_MS = 2600;

type TLayout = {
  cell: number;
  height: number;
  /** ball centres relative to the top-left of the grid (DOM pixels) */
  dom: { x: number; y: number }[];
  /** the same centres in canvas space (origin centre, y up) */
  world: { x: number; y: number }[];
};

/**
 * Same layout as the original `flex flex-row flex-wrap justify-center gap-10`
 * grid of 112px cells, computed by hand so the DOM hit areas and the shared
 * canvas always agree on where each ball is.
 */
const getLayout = (width: number, count: number): TLayout => {
  const compact = width < 520;
  const cell = compact ? 88 : 112;
  const gap = compact ? 16 : 40;
  const cols = Math.max(
    1,
    Math.min(count, Math.floor((width + gap) / (cell + gap)))
  );
  const rows = Math.ceil(count / cols);
  const height = rows * cell + (rows - 1) * gap;

  const dom: TLayout["dom"] = [];
  for (let r = 0; r < rows; r++) {
    const inRow = r === rows - 1 ? count - cols * (rows - 1) : cols;
    const rowWidth = inRow * cell + (inRow - 1) * gap;
    for (let c = 0; c < inRow; c++) {
      dom.push({
        x: (width - rowWidth) / 2 + c * (cell + gap) + cell / 2,
        y: r * (cell + gap) + cell / 2,
      });
    }
  }

  const world = dom.map((p) => ({ x: p.x - width / 2, y: height / 2 - p.y }));

  return { cell, height, dom, world };
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const Tech = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [inView, setInView] = useState(true);
  const [active, setActive] = useState(-1);

  const input = useRef(createBallInput(skills.length));
  const drag = useRef<{ x: number; y: number; t: number } | null>(null);
  const hideTimer = useRef<number>();

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const update = () => setWidth(el.clientWidth);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const layout = useMemo(
    () => (width > 0 ? getLayout(width, skills.length) : null),
    [width]
  );

  const setHover = useCallback((index: number) => {
    window.clearTimeout(hideTimer.current);
    input.current.hovered = index;
    setActive(index);
  }, []);

  const handleDown = (e: ReactPointerEvent<HTMLDivElement>, index: number) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    input.current.dragging[index] = true;
    input.current.vel[index] = { x: 0, y: 0 };
    drag.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    if (e.pointerType !== "mouse") setHover(index);
  };

  const handleMove = (e: ReactPointerEvent<HTMLDivElement>, index: number) => {
    const last = drag.current;
    if (!input.current.dragging[index] || !last) return;

    const now = performance.now();
    const dt = Math.max((now - last.t) / 1000, 0.001);
    const dx = (e.clientX - last.x) * 0.012;
    const dy = (e.clientY - last.y) * 0.012;

    input.current.rot[index].y += dx;
    input.current.rot[index].x += dy;
    input.current.vel[index] = {
      x: clamp(dy / dt, -8, 8),
      y: clamp(dx / dt, -8, 8),
    };
    drag.current = { x: e.clientX, y: e.clientY, t: now };
  };

  const handleUp = (e: ReactPointerEvent<HTMLDivElement>, index: number) => {
    input.current.dragging[index] = false;
    drag.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    if (e.pointerType !== "mouse") {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setHover(-1), TOUCH_HIDE_MS);
      return;
    }

    // after a drag the pointer may have left the ball: close the card then
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    if (Math.hypot(dx, dy) > rect.width / 2) setHover(-1);
  };

  const hit = layout ? layout.cell * 0.8 : 0;
  const activePoint = layout && active >= 0 ? layout.dom[active] : null;
  const activeSkill = active >= 0 ? skills[active] : null;

  return (
    <div
      ref={rootRef}
      className="relative w-full"
      style={{ height: layout ? layout.height : 112 }}
    >
      {layout && (
        <>
          {/* violet glow behind the hovered ball */}
          {layout.dom.map((p, i) => (
            <motion.div
              key={`glow-${skills[i].name}`}
              aria-hidden
              className="pointer-events-none absolute rounded-full"
              style={{
                left: p.x - layout.cell * 0.85,
                top: p.y - layout.cell * 0.85,
                width: layout.cell * 1.7,
                height: layout.cell * 1.7,
                background:
                  "radial-gradient(circle, rgba(145,94,255,0.38) 0%, rgba(145,94,255,0) 62%)",
              }}
              initial={false}
              animate={{
                opacity: active === i ? 1 : 0,
                scale: active === i ? 1 : 0.7,
              }}
              transition={{ type: "spring", stiffness: 140, damping: 16 }}
            />
          ))}

          <div className="pointer-events-none absolute inset-0">
            <SkillsCanvas
              skills={skills}
              points={layout.world}
              cell={layout.cell}
              input={input}
              active={inView}
            />
          </div>

          {/* invisible hit areas: hover, tap, keyboard focus and drag-to-spin */}
          {layout.dom.map((p, i) => (
            <div
              key={`hit-${skills[i].name}`}
              role="img"
              tabIndex={0}
              aria-label={`${skills[i].name}: ${skills[i].description}`}
              className="absolute cursor-grab rounded-full outline-none active:cursor-grabbing"
              style={{
                left: p.x - hit / 2,
                top: p.y - hit / 2,
                width: hit,
                height: hit,
                touchAction: "pan-y",
              }}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setHover(i);
              }}
              onPointerLeave={(e) => {
                if (e.pointerType === "mouse" && !input.current.dragging[i]) {
                  setHover(-1);
                }
              }}
              onPointerDown={(e) => handleDown(e, i)}
              onPointerMove={(e) => handleMove(e, i)}
              onPointerUp={(e) => handleUp(e, i)}
              onPointerCancel={(e) => handleUp(e, i)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(-1)}
            />
          ))}

          <AnimatePresence>
            {activePoint && activeSkill && (
              <div
                key={activeSkill.name}
                className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-full"
                style={{
                  width: TIP_WIDTH,
                  left: clamp(
                    activePoint.x,
                    TIP_WIDTH / 2 + 4,
                    width - TIP_WIDTH / 2 - 4
                  ),
                  top: activePoint.y - layout.cell * 0.46,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  <div className="green-pink-gradient shadow-card relative rounded-[16px] p-[1px]">
                    <div className="bg-tertiary rounded-[16px] px-4 py-3">
                      <p className="text-[14px] font-bold text-white">
                        {activeSkill.name}
                      </p>
                      <p className="text-secondary mt-1 text-[12px] leading-[18px]">
                        {activeSkill.description}
                      </p>
                    </div>
                    <div
                      className="bg-tertiary absolute -bottom-[5px] h-[10px] w-[10px] -translate-x-1/2 rotate-45 border-b border-r border-[#804dee]/60"
                      style={{
                        left: `calc(50% + ${
                          activePoint.x -
                          clamp(
                            activePoint.x,
                            TIP_WIDTH / 2 + 4,
                            width - TIP_WIDTH / 2 - 4
                          )
                        }px)`,
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default SectionWrapper(Tech, "tech");
