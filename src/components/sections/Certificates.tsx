import React, { useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../../constants/styles";
import { fadeIn } from "../../utils/motion";
import { certificates } from "../../constants";
import { Header } from "../atoms/Header";
import { AwardIcon } from "../atoms/SocialIcons";
import { TCertificate } from "../../types";
import { config } from "../../constants/config";

const CertificateCard: React.FC<{ index: number } & TCertificate> = ({
  index,
  title,
  issuer,
  tag,
  image,
  link,
}) => {
  // if the picture has not been added to /public/certificates yet, show a badge
  const [broken, setBroken] = useState(false);
  const showImage = Boolean(image) && !broken;

  const content = (
    <>
      <div className="bg-tertiary flex h-[150px] w-full items-center justify-center overflow-hidden rounded-xl">
        {showImage ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
            onError={() => setBroken(true)}
          />
        ) : (
          <AwardIcon className="h-14 w-14 text-[#915EFF]" />
        )}
      </div>

      <div className="mt-6">
        <p className="text-[18px] font-bold tracking-wider text-white">
          {title}
        </p>
        <p className="text-secondary mt-1 text-[12px]">{issuer}</p>
        <p className={`mt-4 text-[14px] ${tag.color}`}>#{tag.name}</p>
      </div>
    </>
  );

  return (
    <motion.div
      variants={fadeIn("", "spring", index * 0.5, 0.75)}
      className="bg-black-200 xs:flex-[1_1_260px] w-full rounded-3xl p-10 xs:max-w-[360px]"
    >
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        content
      )}
    </motion.div>
  );
};

const Certificates = () => {
  return (
    <section
      id="certificates"
      className="bg-black-100 mt-12 scroll-mt-24 rounded-[20px]"
    >
      <div
        className={`${styles.padding} bg-tertiary min-h-[300px] rounded-2xl`}
      >
        <Header useMotion={true} {...config.sections.certificates} />
      </div>
      <div
        className={`${styles.paddingX} -mt-20 flex flex-wrap gap-7 pb-14 max-sm:justify-center`}
      >
        {certificates.map((certificate, index) => (
          <CertificateCard
            key={certificate.title}
            index={index}
            {...certificate}
          />
        ))}
      </div>
    </section>
  );
};

export default Certificates;
