import { Project, Skill, Education, Certification, Achievement } from './types';

export const PERSONAL_INFO = {
  name: "Abhay Anand",
  title: "Software Engineer & Computer Science Student",
  email: "abhayanandsayhi@gmail.com",
  phone: "+91-9748756135",
  github: "https://github.com/Abhay-Anand-hi",
  linkedin: "https://www.linkedin.com/in/abhay-anand-25436b37a",
  location: "Punjab, India",
  summary: "Computer Science and Engineering undergraduate at Lovely Professional University. Experienced in full-stack web development with React, Node.js, and Python, alongside automated robotic systems. Committed to building high-performance, user-centric software applications and innovative technology solutions."
};

export const SKILLS: Skill[] = [
  {
    category: "Languages",
    items: [
      { name: "C++" },
      { name: "JavaScript" },
      { name: "Python" },
      { name: "C" },
      { name: "PHP" }
    ]
  },
  {
    category: "Frameworks & Web",
    items: [
      { name: "React" },
      { name: "Node.js" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "Tailwind CSS" }
    ]
  },
  {
    category: "Databases & Tools",
    items: [
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "Git" },
      { name: "GitHub" },
      { name: "Replit" }
    ]
  },
  {
    category: "Core & Competencies",
    items: [
      { name: "Sensors & Embedded" },
      { name: "Robotics" },
      { name: "Adaptability" },
      { name: "Teamwork" },
      { name: "Communication" }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Habit-Flow Dashboard",
    description: "Responsive habit-tracking web application designed to help users build and maintain daily habits through an interactive dashboard with focus on usability, performance, and overall user experience.",
    techStack: ["React", "Node.js", "JavaScript", "HTML/CSS", "Replit"],
    period: "April 2026",
    liveUrl: "https://github.com/Abhay-Anand-hi",
    githubUrl: "https://github.com/Abhay-Anand-hi"
  },
  {
    title: "Automated Fire Detecting Robot",
    description: "Hardware and software-based robotic system designed to detect and respond to fire hazards autonomously. Combines programming and electronics with sensor integration for automated safety response.",
    techStack: ["Sensors", "Embedded Systems", "Robotics", "C++", "Automation"],
    period: "November 2025",
    liveUrl: "https://github.com/Abhay-Anand-hi",
    githubUrl: "https://github.com/Abhay-Anand-hi"
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "Top 10 Position in Hackathon",
    metric: "Top 10 Finalist",
    tag: "Competitive Hackathon",
    description: "Participated in a competitive hackathon and ranked among the Top 10 teams, collaborating to develop and present an innovative technology-based solution."
  },
  {
    title: "250+ Programming Problems Solved",
    metric: "250+ Solved",
    tag: "Data Structures & Algorithms",
    description: "Solved more than 250 programming problems across online coding platforms during continuous practice and algorithmic problem solving."
  },
  {
    title: "150+ Hours Computer Programming Course",
    metric: "150+ Hours",
    tag: "Professional Coursework",
    description: "Successfully completed 150+ hours of intensive coursework in Computer Programming, demonstrating consistency, dedication, and technical mastery."
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "Introduction to Artificial Intelligence",
    issuer: "Infosys",
    date: "March 2026"
  },
  {
    name: "Introduction to Cyber Security",
    issuer: "Infosys",
    date: "March 2026"
  },
  {
    name: "Times Of India - CDP",
    issuer: "Times of India",
    date: "July 2026"
  },
  {
    name: "Computer Programming : C",
    issuer: "Certification Authority",
    date: "May 2026"
  }
];

export const EDUCATION: Education[] = [
  {
    school: "Lovely Professional University",
    degree: "Bachelor of Technology — Computer Science and Engineering",
    period: "August 2025 — Present",
    location: "Punjab, India",
    details: "Focusing on core computer science foundations, algorithms, full-stack web engineering, and autonomous systems."
  },
  {
    school: "Litera Valley School",
    degree: "Intermediate (Senior Secondary)",
    period: "April 2023 — March 2025",
    location: "Patna, Bihar",
    details: "Completed higher secondary curriculum with primary concentration on Mathematics and Science."
  },
  {
    school: "Litera Valley School",
    degree: "Matriculation (Secondary Education)",
    period: "April 2022 — March 2023",
    location: "Patna, Bihar",
    details: "Completed secondary education with rigorous coursework in foundational sciences and analytical studies."
  }
];
