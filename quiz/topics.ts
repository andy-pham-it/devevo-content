/**
 * Topic/Category definitions for the app
 */

export interface Topic {
  id: string;
  name: string;
  slug: string;
  icon: string; // Ionicons name
  color: string;
  totalQuestions: number;
  dataFile: string; // Path to JSON file
}

export const topics: Topic[] = [
  {
    id: "reactjs-hooks",
    name: "ReactJS Hooks",
    slug: "reactjs-hooks",
    icon: "logo-react",
    color: "#61DAFB",
    totalQuestions: 20,
    dataFile: "reactjs/hooks.json",
  },
  {
    id: "css-scss",
    name: "CSS/SCSS",
    slug: "css-scss",
    icon: "logo-css3",
    color: "#1572B6",
    totalQuestions: 17,
    dataFile: "languages/css-scss.json",
  },
  {
    id: "javascript",
    name: "JavaScript Core",
    slug: "javascript",
    icon: "logo-javascript",
    color: "#F7DF1E",
    totalQuestions: 26,
    dataFile: "languages/javascript.json",
  },
  {
    id: "typescript",
    name: "TypeScript",
    slug: "typescript",
    icon: "code-slash",
    color: "#3178C6",
    totalQuestions: 20,
    dataFile: "languages/typescript.json",
  },
  {
    id: "git",
    name: "Git Commands",
    slug: "git",
    icon: "git-branch",
    color: "#F05032",
    totalQuestions: 15,
    dataFile: "tools/git.json",
  },
  {
    id: "react-native",
    name: "React Native",
    slug: "react-native",
    icon: "phone-portrait-outline",
    color: "#61DAFB",
    totalQuestions: 20,
    dataFile: "mobile/react-native.json",
  },
  {
    id: "system-design",
    name: "System Design",
    slug: "system-design",
    icon: "server-outline",
    color: "#8b5cf6",
    totalQuestions: 20,
    dataFile: "architecture/system-design.json",
  },
  {
    id: "nodejs",
    name: "Node.js",
    slug: "nodejs",
    icon: "logo-nodejs",
    color: "#4ade80",
    totalQuestions: 20,
    dataFile: "backend/nodejs.json",
  },
  {
    id: "sql-databases",
    name: "SQL & Databases",
    slug: "sql-databases",
    icon: "file-tray-full-outline",
    color: "#f59e0b",
    totalQuestions: 20,
    dataFile: "backend/sql.json",
  },
  {
    id: "docker-devops",
    name: "Docker & DevOps",
    slug: "docker-devops",
    icon: "logo-docker",
    color: "#3b82f6",
    totalQuestions: 20,
    dataFile: "devops/docker.json",
  },
];

export function getTopicById(topicId: string): Topic | undefined {
  return topics.find((topic) => topic.id === topicId);
}

export default topics;
