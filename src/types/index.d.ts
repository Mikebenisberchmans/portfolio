export type TCommonProps = {
  title?: string;
  name?: string;
  icon?: string;
};

export type TTag = {
  name: string;
  color: string;
};

export type TExperience = {
  companyName: string;
  iconBg: string;
  date: string;
  points: string[];
} & Required<Omit<TCommonProps, "name">>;

export type TCertificate = {
  title: string;
  issuer: string;
  tag: TTag;
  /** Optional picture of the certificate, served from /public/certificates */
  image?: string;
  /** Optional credential / verification link */
  link?: string;
};

export type TPaper = {
  title: string;
  description: string;
  link: string;
  source: string;
  badge: "mine" | "favorite";
  tags: TTag[];
};

export type TProject = {
  description: string;
  tags: TTag[];
  image: string;
  sourceCodeLink: string;
  link?: { label: string; url: string };
} & Required<Pick<TCommonProps, "name">>;

export type TSkill = {
  name: string;
  /** One-line description of the tool, shown in the hover card */
  description: string;
  /** Logo image. When omitted, a monogram decal is drawn instead. */
  icon?: string;
  monogram?: string;
  color?: string;
};

export type TNavLink = {
  id: string;
} & Required<Pick<TCommonProps, "title">>;

export type TService = Required<Omit<TCommonProps, "name">>;

export type TMotion = {
  direction: "up" | "down" | "left" | "right" | "";
  type: "tween" | "spring" | "just" | "";
  delay: number;
  duration: number;
};
