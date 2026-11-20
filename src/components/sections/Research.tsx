import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { SectionWrapper } from "../../hoc";
import { papers } from "../../constants";
import { fadeIn } from "../../utils/motion";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";
import { TPaper } from "../../types";

const BADGES: Record<TPaper["badge"], { label: string; className: string }> = {
  mine: {
    label: "My Paper",
    className: "green-pink-gradient text-white",
  },
  favorite: {
    label: "Favorite",
    className: "border border-[#915EFF] text-[#dfd9ff]",
  },
};

const PaperCard: React.FC<{ index: number } & TPaper> = ({
  index,
  title,
  description,
  link,
  source,
  badge,
  tags,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        glareEnable
        tiltEnable
        tiltMaxAngleX={30}
        tiltMaxAngleY={30}
        glareColor="#aaa6c3"
        className="h-full"
      >
        <div className="bg-tertiary flex h-full w-full flex-col rounded-2xl p-5 sm:w-[300px]">
          <div className="flex items-center justify-between gap-2">
            <span
              className={`rounded-full px-3 py-1 text-[12px] font-semibold ${BADGES[badge].className}`}
            >
              {BADGES[badge].label}
            </span>
            <span className="text-secondary text-[12px]">{source}</span>
          </div>

          <div className="mt-5">
            <h3 className="text-[22px] font-bold leading-[30px] text-white">
              {title}
            </h3>
            <p className="text-secondary mt-3 text-[14px]">{description}</p>
          </div>

          <div className="mt-auto flex flex-wrap gap-2 pt-4">
            {tags.map((tag) => (
              <p key={tag.name} className={`text-[14px] ${tag.color}`}>
                #{tag.name}
              </p>
            ))}
          </div>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="black-gradient mt-5 w-fit rounded-full px-5 py-2 text-[13px] font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Read it ↗
          </a>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Research = () => {
  return (
    <>
      <Header useMotion={true} {...config.sections.research} />

      <div className="flex w-full">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="text-secondary mt-3 max-w-3xl text-[17px] leading-[30px]"
        >
          {config.sections.research.content}
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {papers.map((paper, index) => (
          <PaperCard key={paper.title} index={index} {...paper} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Research, "research");
