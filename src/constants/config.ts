type TSection = {
  p: string;
  h2: string;
  content?: string;
};

type TConfig = {
  html: {
    title: string;
    fullName: string;
    email: string;
  };
  socials: {
    github: string;
    linkedin: string;
    instagram: string;
  };
  hero: {
    name: string;
    p: string[];
  };
  contact: {
    form: {
      name: {
        span: string;
        placeholder: string;
      };
      email: {
        span: string;
        placeholder: string;
      };
      message: {
        span: string;
        placeholder: string;
      };
    };
  } & TSection;
  sections: {
    about: Required<TSection>;
    experience: TSection;
    certificates: TSection;
    research: Required<TSection>;
    works: Required<TSection>;
  };
};

export const config: TConfig = {
  html: {
    title: "Mike Benis B — Portfolio",
    fullName: "Mike Benis B",
    email: "mikebenisberchmans@gmail.com",
  },
  socials: {
    github: "https://github.com/Mikebenisberchmans",
    linkedin: "https://linkedin.com/in/mike-beni",
    instagram: "https://www.instagram.com/__mik__al___ben__",
  },
  hero: {
    name: "Mike Benis B",
    p: ["I build AI products, agents and", "data pipelines from idea to demo"],
  },
  contact: {
    p: "Get in touch",
    h2: "Contact.",
    form: {
      name: {
        span: "Your Name",
        placeholder: "What's your name?",
      },
      email: { span: "Your Email", placeholder: "What's your email?" },
      message: {
        span: "Your Message",
        placeholder: "What do you want to say?",
      },
    },
  },
  sections: {
    about: {
      p: "Introduction",
      h2: "Overview.",
      content: `I'm a Data Science graduate and former ServiceNow intern who builds AI
      products from the user's problem all the way to a working demo. I've shipped a
      voice-to-CRM pipeline that cut data entry from 12 minutes to 1, and an NL-to-SQL
      agent that cut dashboard build time from about 3 hours to 10 minutes. I work in
      Python, SQL, GenAI, agents and MCP, and I judge everything I build by its metrics.`,
    },
    experience: {
      p: "My journey so far",
      h2: "Experience & Education.",
    },
    certificates: {
      p: "What I have earned",
      h2: "Certificates.",
    },
    research: {
      p: "My papers and the ones I admire",
      h2: "Research Papers.",
      content: `A mix of my own published work and the papers and projects that shaped
      how I think about language models, agents and retrieval. Each card is tagged so
      you can tell mine from my favourites.`,
    },
    works: {
      p: "My work",
      h2: "Projects.",
      content: `Following projects showcases my skills and experience through
    real-world examples of my work. Each project is briefly described with
    links to code repositories and live demos in it. It reflects my
    ability to solve complex problems, work with different technologies,
    and manage projects effectively.`,
    },
  },
};
