export interface Project {
    id: string;
    title: string;
    description: string;
    hook?: string;
    metric?: string;
    content: string;
    technologies: string[];
    image: string;
    github?: string;
    demo?: string;
    category?: string;
}

export const projects: Project[] = [
    {
        id: "enterprise-rag",
        title: "Enterprise RAG System",
        hook: "Production-ready Retrieval-Augmented Generation for enterprise data.",
        metric: "Millisecond latency with context-aware search",
        description: "A full-stack AI application implementing Retrieval-Augmented Generation (RAG) to allow enterprises to query their internal documents securely using large language models.",
        content: "Built with TypeScript, this system ingests, chunks, and vectorizes complex documents, storing embeddings in a high-performance vector database. It leverages modern LLMs to generate highly accurate responses, grounding all answers in the provided enterprise knowledge base to eliminate hallucinations. The interface is highly optimized for speed and reliability, featuring real-time streaming responses and conversation memory.",
        technologies: ["TypeScript", "Next.js", "Vector DB", "LLMs", "RAG", "TailwindCSS"],
        image: "/projects/rag.png",
        github: "https://github.com/parthrana-27/Enterprise-RAG",
        demo: "https://enterprise-rag-lime.vercel.app",
        category: "Generative AI"
    },
    {
        id: "devtrack",
        title: "DevTrack",
        hook: "Ship Faster. Track Smarter.",
        metric: "High-Performance Project Visibility & Workflows",
        description: "A high-performance project management platform built for modern engineering teams — combining intelligent issue tracking, collaborative workflows, and real-time project visibility in one powerful workspace.",
        content: "DevTrack is architected to deliver a scalable, enterprise-grade project management solution. It features intelligent issue tracking, collaborative workflows, Kanban state transitions, and real-time visibility metrics for modern engineering teams, ensuring high velocity and seamless team alignment.",
        technologies: ["Java", "Spring Boot", "TypeScript", "PostgreSQL", "REST APIs", "Agile"],
        image: "/projects/devtrack.png",
        github: "https://github.com/parthrana-27/devtrack",
        category: "Project Management Platform"
    },
    {
        id: "ats-resume",
        title: "ATS Intelligence",
        hook: "The recruiter who never sleeps. Production-grade AI resume screening.",
        metric: "< 2s Parse Latency & 6-Dimension Scoring",
        description: "Multi-agent LangGraph pipelines, vector similarity, and a transparent six-dimension scoring formula — so your team reviews signal, not noise.",
        content: "ATS Intelligence is a production-grade AI resume screening platform running 100% locally with sub-2s latency per resume. Powered by multi-agent LangGraph pipelines and vector similarity, it provides transparent 6-dimension candidate scoring and semantic matching to streamline recruitment workflows.",
        technologies: ["LangGraph", "Multi-Agent AI", "Vector Similarity", "TypeScript", "Next.js", "Tailwind CSS"],
        image: "/projects/resume.png",
        github: "https://github.com/parthrana-27/ats-resume",
        category: "AI Recruitment Intelligence"
    }
];
