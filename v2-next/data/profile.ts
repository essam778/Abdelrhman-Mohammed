export const profile = {
  name: 'Abdulrahman Mohamed',
  fullName: 'Abdulrahman Mohamed Abdelalem',
  title: 'AI Engineer & Data Scientist',
  email: 'roma47757@gmail.com',
  phone: '+201014836226',
  location: 'Benha, Egypt',
  github: 'https://github.com/Abdo265',
  linkedin: 'https://www.linkedin.com/in/abdul-rahman-abdelalem-a70230372',
  kaggle: 'https://kaggle.com/Abdo265',
  portfolio: 'https://abdo265.github.io/portfolio',

  objective: 'Aspiring AI & Machine Learning Engineer with a strong foundation in Computer and Communication Engineering. Proven expertise in developing end-to-end AI solutions, from data preprocessing and model development to deployment, with hands-on experience across computer vision, NLP, and Agentic systems.',

  education: {
    university: 'Benha University',
    degree: 'B.Sc. Computer and Communication Engineering',
    location: 'Benha, Egypt',
    period: '2021 – 2026',
    coursework: ['Python', 'C', 'C++', 'Data Structures', 'MATLAB', 'Simulink', 'Signal Processing', 'Statistics', 'Calculus', 'Math', 'CCNA', 'Git'],
  },

  stats: [
    { label: 'NLP Accuracy', value: 97, suffix: '%' },
    { label: 'ML Capstone', value: 82, suffix: '%' },
    { label: 'Records Processed', value: 70, suffix: 'K+' },
    { label: 'Students Mentored', value: 100, suffix: '+' },
  ],

  experience: [
    {
      date: 'Mar 2026 – Present',
      title: 'Freelance Coach – Data Science & Freelancing',
      org: 'Elharefa — Digital Egypt Pioneers Initiative (DEPI), MCIT',
      details: [
        'Teaching at Elharefa as part of the Digital Egypt Pioneers Initiative (DEPI) in collaboration with the Egyptian Ministry of Communications and Information Technology (MCIT).',
        'Trained 80+ students in freelancing fundamentals and data science concepts.',
      ],
      tech: ['Python', 'Data Science', 'Teaching'],
    },
    {
      date: 'Aug 2025 – Dec 2025',
      title: 'Samsung Innovation Campus – AI Program',
      org: 'Samsung',
      details: [
        '4-month intensive program covering Python for data analysis, probability, statistics, data preprocessing, Power BI visualization, introductory LLM applications, and model deployment.',
        'Also served as an instructor for the Samsung DSIC track, guiding students through AI fundamentals and project-based learning.',
      ],
      tech: ['Python', 'Power BI', 'LLM', 'ML'],
    },
    {
      date: 'Jun 2025 – Dec 2025',
      title: 'Generative AI Diploma',
      org: 'DEPI, EYOUTH',
      details: [
        '6-month intensive diploma covering ML, Deep Learning, NLP, and Computer Vision.',
        'Built a text classification model with 97% accuracy on a medical dataset.',
      ],
      tech: ['TensorFlow', 'Scikit-learn', 'NLP', 'Computer Vision'],
    },
    {
      date: 'Sep 2024',
      title: 'ETA AI Course',
      org: 'NTI, Huawei',
      details: ['Completed Python, ML, and deep learning applications training.'],
      tech: ['Python', 'ML', 'Deep Learning'],
    },
    {
      date: 'Jul 2024',
      title: 'Embedded AVR Course',
      org: 'ITI',
      details: ['Learned AVR microcontrollers, GPIO, UART, SPI, and embedded C in a 168-hour intensive course.'],
      tech: ['C', 'Embedded C', 'AVR', 'Microcontrollers'],
    },
    {
      date: 'Jul – Aug 2023',
      title: 'Maintenance Engineer Intern',
      org: 'ELARABY Group, Egypt',
      details: ['Industrial control systems & PLC', 'Safety protocols & machine maintenance'],
      tech: ['PLC', 'Industrial Control'],
    },
  ],

  projects: [
    {
      num: 'PROJECT_01',
      title: 'SignBridge – AI Sign Language Translation System',
      subtitle: 'Computer Vision & Deep Learning',
      description: 'Graduation Project 2026. Developed an end-to-end AI system that translates Arabic Sign Language into text using MediaPipe Holistic and LSTM networks. Built a custom dataset, implemented preprocessing, sequence normalization, data augmentation, and achieved robust real-time gesture recognition integrated into a mobile application.',
      tags: ['Python', 'MediaPipe', 'LSTM', 'Computer Vision', 'Mobile App'],
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&q=80',
    },
    {
      num: 'PROJECT_02',
      title: 'Cardiovascular Disease Prediction System',
      subtitle: 'Machine Learning',
      description: 'Built end-to-end ML pipeline using Python, Scikit-learn, and TensorFlow on 70,000+ patient records with 82% prediction accuracy, surpassing all Kaggle public benchmarks by 12%.',
      tags: ['Python', 'TensorFlow', 'Scikit-learn', 'Healthcare'],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
    },
    {
      num: 'PROJECT_03',
      title: 'Medical Voice Assistant Chatbot',
      subtitle: 'RAG & NLP',
      description: 'Built a voice-based medical assistant chatbot using a Retrieval-Augmented Generation (RAG) pipeline to deliver accurate, context-aware medical responses. Integrated speech-to-text and text-to-speech for natural voice interaction, with document retrieval and LLM-based response generation grounded in trusted medical sources.',
      tags: ['RAG', 'NLP', 'LLM', 'Voice AI', 'Python'],
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80',
    },
    {
      num: 'PROJECT_04',
      title: 'Udemy Courses Dataset Analysis',
      subtitle: 'Power BI Dashboard',
      description: 'Interactive 3-page Power BI dashboard with KPIs, trend analysis, and pricing insights using Power Query ETL and custom DAX measures.',
      tags: ['Power BI', 'DAX', 'ETL', 'Analytics'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    },
  ],

  skills: {
    'AI & ML': {
      icon: 'network',
      items: [
        { name: 'TensorFlow', pct: 90 },
        { name: 'PyTorch', pct: 80 },
        { name: 'Scikit-learn', pct: 88 },
        { name: 'Deep Learning', pct: 85 },
        { name: 'NLP', pct: 82 },
      ],
    },
    Programming: {
      icon: 'code',
      items: [
        { name: 'Python', pct: 95 },
        { name: 'C/C++', pct: 80 },
        { name: 'MATLAB', pct: 75 },
      ],
    },
    'Data & BI': {
      icon: 'chart',
      items: [
        { name: 'Power BI', pct: 88 },
        { name: 'Data Viz', pct: 85 },
        { name: 'Pandas', pct: 92 },
        { name: 'Matplotlib', pct: 85 },
      ],
    },
    Tools: {
      icon: 'settings',
      items: [
        { name: 'Git', pct: 85 },
        { name: 'OpenCV', pct: 78 },
        { name: 'Kaggle', pct: 88 },
        { name: 'Colab', pct: 92 },
      ],
    },
  },

  certifications: [
    { title: 'Building LLM Applications With Prompt Engineering', org: 'NVIDIA — Deep Learning Institute', year: '2026', icon: 'monitor' },
    { title: 'Leadership & Soft Skills', org: 'Life Makers Foundation · Global Volunteering', year: '2025', icon: 'users' },
    { title: 'Machine Learning Specialization', org: 'DeepLearning.AI · Coursera by Andrew Ng', year: '2024', icon: 'shield' },
    { title: 'AI Innovation Excellence', org: 'Samsung Innovation Campus', year: '2025', icon: 'star' },
    { title: 'Networking & CyberSec', org: 'Cisco Networking Academy · NTI', year: '2025', icon: 'lock' },
  ],

  achievements: [
    {
      title: '2nd Place – Industry Innovators Hackathon v2',
      subtitle: 'AI Leads the Future of Industry',
      description: 'Our team CREATOCARE won 2nd place in the Industry Innovators Hackathon v2 under the theme "AI Leads the Future of Industry," organized by ICEAlex and Creativa Hub Benha. Awarded a prize of 125,000 EGP for delivering an innovative AI-powered solution in an industry-focused competitive environment.',
      year: '2026',
    },
  ],

  technicalSkills: {
    languages: 'Python, C, C++ (ML and embedded systems)',
    mlLibraries: 'NumPy, Pandas, TensorFlow, Scikit-learn, Matplotlib, OCR, Seaborn',
    llmStack: 'LangChain, LangGraph, LlamaIndex, RAG Core',
    cs: 'Data Structures, Algorithms, OOP, Signal Processing',
    tools: 'Power BI, n8n, VS Code, Git, MATLAB, Simulink, Colab, Kaggle, Jupyter, FastAPI',
  },
};
