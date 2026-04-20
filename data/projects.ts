export interface Project {
    id: string;
    title: string;
    description: string;
    content: string;
    technologies: string[];
    image: string;
}

export const projects: Project[] = [
    {
        id: "fake-news",
        title: "Fake News Detection System",
        description: "An AI-powered system designed to automatically classify news content as real or fake using natural language processing and machine learning.",
        content: "The system takes raw news articles or headlines as input and processes them through a structured pipeline that includes text cleaning, tokenization, stopword removal, and stemming. The processed text is then transformed into numerical features using TF-IDF (Term Frequency–Inverse Document Frequency). A Logistic Regression model is trained on a labeled dataset, allowing it to learn patterns that distinguish fake news from legitimate information. This project showcases the practical use of machine learning in solving real-world problems and highlights the importance of responsible AI in the information age.",
        technologies: ["Python", "NLP", "Machine Learning", "Logistic Regression", "TF-IDF", "Scikit-Learn"],
        image: "/projects/fake-news.jpg"
    },
    {
        id: "aqi-ga",
        title: "Genetic Algorithm AQI Optimization",
        description: "A soft computing approach that leverages Genetic Algorithms (GA) to optimize feature selection for Air Quality Index (AQI) prediction.",
        content: "This project presents a system that utilizes real-world air quality data containing pollutant concentrations such as PM2.5, PM10, NO₂, CO, O₃, and SO₂. The Genetic Algorithm is employed to identify the most relevant subset of pollutants, represented as binary chromosomes, with fitness evaluated using a Random Forest model. Through evolutionary operations including selection, crossover, and mutation, the algorithm iteratively converges toward an optimal feature subset, enhancing model efficiency and interpretability in environmental data analysis.",
        technologies: ["Genetic Algorithm", "Random Forest", "Python", "Feature Optimization", "Soft Computing", "Environmental AI"],
        image: "/projects/aqi.jpg"
    }
];

