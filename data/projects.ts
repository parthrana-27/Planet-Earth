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
        image: "/projects/rag.jpg",
        github: "https://github.com/parthrana-27/Enterprise-RAG",
        demo: "https://enterprise-rag-lime.vercel.app",
        category: "Generative AI"
    },
    {
        id: "devtrack",
        title: "DevTrack",
        hook: "Comprehensive agile issue tracking and project management suite.",
        metric: "Streamlined sprint planning & velocity tracking",
        description: "A robust Java-based backend application designed for software development teams to track issues, manage sprints, and collaborate efficiently.",
        content: "DevTrack is architected using Java and modern enterprise frameworks to deliver a scalable project management solution. It features robust RESTful APIs for creating tickets, assigning tasks, progressing states via Kanban workflows, and generating team velocity metrics. The system emphasizes clean architecture and security, while a relational database guarantees ACID compliance for all transactions.",
        technologies: ["Java", "Spring Boot", "PostgreSQL", "REST APIs", "Hibernate", "Agile"],
        image: "/projects/devtrack.jpg",
        github: "https://github.com/parthrana-27/devtrack",
        category: "Enterprise Backend"
    },
    {
        id: "ats-resume",
        title: "ATS Resume Builder",
        hook: "Intelligent resume generation to bypass Applicant Tracking Systems.",
        metric: "98% ATS Parsability Score",
        description: "A developer-focused web tool that generates cleanly formatted, highly parsable resumes optimized to pass modern automated recruiting filters.",
        content: "Developed utilizing TypeScript and modern frontend frameworks, this application allows users to seamlessly input their professional experience, projects, and skills to dynamically generate a clean, ATS-compliant resume. The rendering engine ensures proper semantic structure and clean PDF generation, deliberately avoiding common pitfalls like complex tables or unreadable graphics that confuse ATS parsers.",
        technologies: ["TypeScript", "Next.js", "React", "PDF Generation", "Tailwind CSS"],
        image: "/projects/resume.jpg",
        github: "https://github.com/parthrana-27/ats-resume",
        category: "Full-Stack Web"
    }
];
