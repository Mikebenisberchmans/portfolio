import type {
  TNavLink,
  TService,
  TSkill,
  TExperience,
  TCertificate,
  TPaper,
  TProject,
} from "../types";

import {
  mobile,
  backend,
  creator,
  web,
  docker,
  git,
  reactjs,
  servicenow,
  education,
  salenie,
  queryforge,
  talentRank,
  schemaContext,
  nyayaSetu,
  stockPipeline,
  recruitFlow,
  javascript,
  pytorch,
  tensorflow,
  hf,
  aws,
  azure,
  python,
  sql,
  pandas,
  numpy,
  sklearn,
  scipy,
  statsmodels,
  lg,
  fastapi,
  flask,
  pgs,
  snflk,
  databricks,
  streamlit,
  powerbi,
  plolty,
  jupyter,
  kb,
  spark,
} from "../assets";

export const navLinks: TNavLink[] = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
  id: "projects",
  title: "Projects",
  },
  {
    id: "certificates",
    title: "Certificates",
  },
  {
    id: "research",
    title: "Research",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services: TService[] = [
  {
    title: "Data Scientist",
    icon: web,
  },
  {
    title: "AI Product Builder",
    icon: creator,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Agentic AI Expert",
    icon: mobile,
  },
];

/**
 * Skill balls. A skill with an `icon` shows that logo on the ball; a skill
 * without one gets a monogram (`monogram` + `color`) drawn on the ball instead.
 * To use an official logo later, drop a PNG into src/assets/tech, import it in
 * src/assets/index.ts and set `icon` here.
 */
const skills: TSkill[] = [
  {
    name: "Python",
    icon: python,
    description: "General-purpose language, my go-to for ML, data and APIs.",
  },
  {
    name: "SQL",
    icon: sql,
    description: "The language of relational data: analytics and warehouse queries.",
  },
  {
    name: "pandas",
    icon: pandas,
    description: "DataFrame library for cleaning, joining and shaping data.",
  },
  {
    name: "NumPy",
    icon: numpy,
    description: "Fast n-dimensional arrays, the maths under every model.",
  },
  {
    name: "scikit-learn",
    icon: sklearn,
    description: "Classic ML toolkit: classification, regression, clustering.",
  },
  {
    name: "Apache spark",
    icon: spark,
    description: "A fast, distributed big data processing engine for large-scale analytics, SQL, machine learning, and streaming.",
  },
  {
    name: "PyTorch",
    icon: pytorch,
    description: "Deep learning framework I use to fine-tune language models.",
  },
  {
    name: "TensorFlow",
    icon: tensorflow,
    description: "Google's framework for building and training neural networks.",
  },
  {
    name: "Hugging Face",
    icon: hf,
    description: "Hub and libraries for transformers and embedding models.",
  },
  {
    name: "Javascript",
    icon: javascript,
    description: "The programming language that makes web pages interactive.",
  },
  {
    name: "React",
    icon: reactjs,
    description: "A popular JavaScript library for building fast, component-based user interfaces.",
  },
  {
    name: "Scipy",
    icon: scipy,
    description: "A Python library for scientific computing, optimization, and numerical routines.",
  },
  {
    name: "statsmodels",
    icon: statsmodels,
    description: "A Python library for statistical modeling, hypothesis testing, and econometric analysis.",
  },
  {
    name: "LangGraph",
    icon: lg,
    description: "Graph framework for stateful, multi-step agent workflows.",
  },
  {
    name: "Plolty",
    icon: plolty,
    description: "A graphing library for creating interactive, publication-quality charts and dashboards in Python, R, and JavaScript.",
  },
  {
    name: "FastAPI",
    icon: fastapi,
    description: "Fast, typed Python framework for REST APIs and model serving.",
  },
  {
    name: "Flask",
    icon: flask,
    description: "Minimal Python web framework for quick backends.",
  },
  {
    name: "PostgreSQL",
    icon: pgs,
    description: "Open-source relational database with rich SQL support.",
  },
  {
    name: "Snowflake",
    icon: snflk,
    description: "Cloud data warehouse, home of the 4M+ records I analysed.",
  },
  {
    name: "Databricks",
    icon: databricks,
    description: "Unified analytics platform for data engineering and ML.",
  },
  {
    name: "Azure",
    icon: azure,
    description: "Microsoft's cloud. I deploy models on Azure ML (AZ-900).",
  },
  {
    name: "AWS S3",
    icon: aws,
    description: "Scalable cloud object storage for files and recordings.",
  },
  {
    name: "Docker",
    icon: docker,
    description: "Containers that package apps to run the same anywhere.",
  },
  {
    name: "Git",
    icon: git,
    description: "Distributed version control for tracking and sharing code.",
  },
  {
    name: "Kubernetes",
    icon: kb,
    description: "An open-source container orchestration platform that automates deploying, scaling, and managing containerized applications.",
  },
  {
    name: "Streamlit",
    icon: streamlit,
    description: "Turns Python scripts into live data apps and dashboards.",
  },
  {
    name: "Power BI",
    icon: powerbi,
    description: "Microsoft's BI tool for interactive reports and dashboards.",
  },
  {
    name: "Jupyter",
    icon: jupyter,
    description: "Notebooks for exploratory analysis and quick experiments.",
  },
];

const experiences: TExperience[] = [
  {
    title: "Associate Data Engineer Intern",
    companyName: "ServiceNow, Sales & Analytics Team",
    icon: servicenow,
    iconBg: "#383E56",
    date: "Jun 2025 - Aug 2025",
    points: [
      "Analyzed 4M+ Snowflake opportunity records with EDA, feature engineering and cross-source validation to feed the forecasting model.",
      "Built and deployed a hybrid XGBoost classifier on Azure ML that extended the forecast horizon by one quarter, reaching 93% ROC-AUC; used SHAP to explain the top 5 sales drivers to Sales and Finance.",
      "Raised usable sales data capture from 20% to 70% with an AI voice-to-Snowflake pipeline, and demoed the proof-of-concept to executive leadership through a React dashboard.",
    ],
  },
  {
    title: "B.Tech, Computer Science Engineering (AI & DS)",
    companyName: "Hindusthan Institute of Technology, Coimbatore",
    icon: education,
    iconBg: "#383E56",
    date: "2022 - 2026",
    points: [
      "Graduated with a CGPA of 7.73, specialising in Artificial Intelligence and Data Science.",
      "Published NyayaSetu, an AI civic petition classification and routing system, in JSTAR (2026).",
    ],
  },
];

/**
 * Drop each certificate picture into /public/certificates using the file name
 * below (or change `image`). Until then a placeholder badge is shown.
 */
const certificates: TCertificate[] = [
  {
    title: "Microsoft Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
    tag: { name: "cloud", color: "blue-text-gradient" },
    image: "./certificates/az-900.png",
  },
  {
    title: "Diploma in Data Science & Machine Learning",
    issuer: "Uptor",
    tag: { name: "datascience", color: "green-text-gradient" },
    image: "./certificates/ds-ml-diploma.jpg",
  },
  {
    title: "Rinex AI Course",
    issuer: "Rinex",
    tag: { name: "ai", color: "pink-text-gradient" },
    image: "./certificates/rinex-ai.jpg",
  },
  {
    title: "Power BI Certificate",
    issuer: "Skill Nation",
    tag: { name: "analytics", color: "orange-text-gradient" },
    image: "./certificates/power-bi.jpg",
  },
];

const papers: TPaper[] = [
  {
    title: "NyayaSetu: AI Civic Petition Classification & Routing",
    description:
      "SBERT + SVC pipeline that classifies multilingual civic petitions by urgency and routes them to the right department, reaching 93% cross-validation accuracy.",
    link: "https://journalstar.in/wp-content/uploads/2026/04/202671015.pdf",
    source: "JSTAR · 2026",
    badge: "mine",
    tags: [
      { name: "nlp", color: "blue-text-gradient" },
      { name: "sbert", color: "green-text-gradient" },
      { name: "multilingual", color: "pink-text-gradient" },
    ],
  },
  {
    title: "Attention Is All You Need",
    description:
      "This foundational 2017 paper introduced the Transformer architecture, replacing recurrent and convolutional networks with self-attention mechanisms. It forms the backbone of nearly all modern Large Language Models (LLMs).",
    link: "https://arxiv.org/abs/1706.03762",
    source: "arXiv · 2017",
    badge: "favorite",
    tags: [
      { name: "transformers", color: "blue-text-gradient" },
      { name: "nlp", color: "green-text-gradient" },
      { name: "llm", color: "pink-text-gradient" },
    ],
  },
  {
    title: "Sparks of Artificial General Intelligence: Early experiments with GPT-4",
    description:
      'Published by Microsoft Research in 2023, this paper documents early experiments with GPT-4, arguing that its capabilities across coding, math, and vision represent early "sparks" of Artificial General Intelligence (AGI).',
    link: "https://arxiv.org/abs/2303.12712",
    source: "arXiv · 2023",
    badge: "favorite",
    tags: [
      { name: "gpt-4", color: "blue-text-gradient" },
      { name: "agi", color: "green-text-gradient" },
      { name: "llm", color: "pink-text-gradient" },
    ],
  },
  {
    title: "Google Agent Development Kit (ADK)",
    description:
      "Google's open-source framework and specification designed for building, testing, and deploying production-grade AI agents, providing a standardized architecture to connect LLMs to external tools and enterprise APIs.",
    link: "https://adk.dev/",
    source: "Google · Open source",
    badge: "favorite",
    tags: [
      { name: "agents", color: "blue-text-gradient" },
      { name: "framework", color: "green-text-gradient" },
      { name: "tooling", color: "pink-text-gradient" },
    ],
  },
  {
    title: "ScaNN (Scalable Nearest Neighbors)",
    description:
      "This research introduces anisotropic vector quantization to radically accelerate vector similarity search. It allows systems to search billions of high-dimensional embeddings in milliseconds, which is critical for Retrieval-Augmented Generation (RAG).",
    link: "https://research.google/blog/announcing-scann-efficient-vector-similarity-search/",
    source: "Google Research",
    badge: "favorite",
    tags: [
      { name: "vector-search", color: "blue-text-gradient" },
      { name: "embeddings", color: "green-text-gradient" },
      { name: "rag", color: "pink-text-gradient" },
    ],
  },
];

const projects: TProject[] = [
  {
    name: "Salenie",
    description:
      "Voice-to-CRM desktop app: Whisper transcribes sales calls and a fine-tuned Phi-4-mini fills a 19-field record, cutting data entry from 12 min to 1.",
    tags: [
      { name: "whisper", color: "blue-text-gradient" },
      { name: "fastapi", color: "green-text-gradient" },
      { name: "lora", color: "pink-text-gradient" },
    ],
    image: salenie,
    sourceCodeLink: "https://github.com/Mikebenisberchmans/Sales-genie-v1-Windows-",
    link:{ label: "demo", url: "https://lnkd.in/p/g8DEkNH7" },
  },
  {
    name: "QueryForge",
    description:
      "MCP server with 9 tools that turns plain-English questions into read-only SQL and live Streamlit dashboards, cutting build time from 3 hours to 10 min.",
    tags: [
      { name: "mcp", color: "blue-text-gradient" },
      { name: "rag", color: "green-text-gradient" },
      { name: "streamlit", color: "pink-text-gradient" },
    ],
    image: queryforge,
    sourceCodeLink: "https://github.com/Mikebenisberchmans/Queryforge",
    link: { label: "demo", url: "https://lnkd.in/p/gMKkVaYg" },
  },
  {
    name: "talent-rank",
    description:
      "Offline candidate ranking pipeline: hard filters, heuristic scoring and semantic re-ranking score 100K applications against a JD in under 5 min on CPU.",
    tags: [
      { name: "python", color: "blue-text-gradient" },
      { name: "nlp", color: "green-text-gradient" },
      { name: "streamlit", color: "pink-text-gradient" },
    ],
    image: talentRank,
    sourceCodeLink: "https://github.com/Mikebenisberchmans/talent-rank",
  },
  {
    name: "Schema-Context MCP",
    description:
      "Next.js and MCP proof of concept that gives coding agents on-demand access to a live Postgres schema through five scoped tools, so prompts stay lean.",
    tags: [
      { name: "nextjs", color: "blue-text-gradient" },
      { name: "mcp", color: "green-text-gradient" },
      { name: "postgres", color: "pink-text-gradient" },
    ],
    image: schemaContext,
    sourceCodeLink:
      "https://github.com/Mikebenisberchmans/IDE-Dataplatform-conn-feat-Demo",
      link: { label: "app", url: "https://ide-dataplatform-conn-feat-demo.vercel.app/" },
  },
  {
    name: "NyayaSetu",
    description:
      "Civic petition portal that detects language, translates, classifies urgency with SBERT and SVC, and emails daily digests to the relevant departments.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "flask", color: "green-text-gradient" },
      { name: "sbert", color: "pink-text-gradient" },
    ],
    image: nyayaSetu,
    sourceCodeLink:
      "https://github.com/Mikebenisberchmans/Pettition-classifier-tracker",
  },
  {
    name: "Stock Data Pipeline",
    description:
      "Pipeline that rolls daily OHLCV stock data into monthly records, adds SMA and EMA indicators in Pandas, and writes one analytics-ready CSV per symbol.",
    tags: [
      { name: "python", color: "blue-text-gradient" },
      { name: "pandas", color: "green-text-gradient" },
      { name: "plotly", color: "pink-text-gradient" },
    ],
    image: stockPipeline,
    sourceCodeLink:
      "https://github.com/Mikebenisberchmans/stock-market-data-pipeline",
  },
  {
    name: "RecruitFlow",
    description:
      "Recruiting app with a FastAPI and Supabase backend and a React frontend that matches candidates to jobs by skill weight and tracks team workflows.",
    tags: [
      { name: "fastapi", color: "blue-text-gradient" },
      { name: "react", color: "green-text-gradient" },
      { name: "supabase", color: "pink-text-gradient" },
    ],
    image: recruitFlow,
    sourceCodeLink: "https://github.com/Mikebenisberchmans/recruit-flow",
  },
];

export { services, skills, experiences, certificates, papers, projects };
