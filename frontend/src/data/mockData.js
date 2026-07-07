export const student = {
  name: 'Gopinath K.',
  role: 'Senior Student',
  avatar: null,
  initials: 'GK',
  resumeScore: 84,
  skillScore: 72,
  placementReadiness: 91,
  interviewScore: 68,
  learningProgress: 4.2,
  rank: 'Top 12%',
  status: 'High Fit',
}

export const skillDistributionData = [
  { name: 'Jan', coreTech: 60, softSkills: 40 },
  { name: 'Feb', coreTech: 72, softSkills: 45 },
  { name: 'Mar', coreTech: 68, softSkills: 50 },
  { name: 'Apr', coreTech: 85, softSkills: 55 },
  { name: 'May', coreTech: 78, softSkills: 60 },
  { name: 'Jun', coreTech: 90, softSkills: 65 },
]

export const recentActivities = [
  { id: 1, icon: 'cpu', title: 'Node.js Mastery Assessment', sub: 'Completed with 92% score', time: '6h ago' },
  { id: 2, icon: 'file-text', title: 'Resume Updated', sub: "AI suggestions applied to 'Experience'", time: 'Yesterday' },
]

export const upcomingInterviews = [
  { id: 1, day: '24', month: 'OCT', title: 'Frontend Engineer Mock', sub: 'With Senior AI Interviewer' },
]

export const recommendedRoles = [
  { role: 'Full Stack Engineer', company: 'Hyperion Tech', match: 96 },
  { role: 'Frontend Developer', company: 'Nexus Labs', match: 85 },
  { role: 'Backend Engineer', company: 'Aether Systems', match: 79 },
  { role: 'DevOps Specialist', company: 'CloudCore', match: 68 },
]

export const adminStudents = [
  { id: 1, initials: 'EC', name: 'Ethan Carter', email: 'e.carter@careerforge.edu', dept: 'Software Engineering', resumeScore: 92, interviewAvg: 8.4, readiness: 'Highly Ready' },
  { id: 2, initials: 'AL', name: 'Amara Lawson', email: 'a.lawson@careerforge.edu', dept: 'Data Science', resumeScore: 74, interviewAvg: 7.1, readiness: 'In Progress' },
  { id: 3, initials: 'SK', name: 'Soren Kvist', email: 'soren.k@careerforge.edu', dept: 'Business Analytics', resumeScore: 88, interviewAvg: 8.6, readiness: 'Highly Ready' },
]

export const liveActivities = [
  { id: 1, title: 'New Resume Analyzed', sub: 'Sarah Chen - CS Dept (Score: 84)', time: '2 mins ago' },
  { id: 2, title: 'Interview Completed', sub: 'David Miller - Mock AI Round', time: '14 mins ago' },
  { id: 3, title: 'Skill Gap Alert', sub: 'System identified low SQL proficiency', time: '1 hour ago' },
  { id: 4, title: 'Portfolio Verified', sub: "James Wilson's GitHub connected", time: '3 hours ago' },
]

export const skillTrendsData = [
  { month: 'JAN', value: 45 },
  { month: 'FEB', value: 55 },
  { month: 'MAR', value: 68 },
  { month: 'APR', value: 60 },
  { month: 'MAY', value: 75 },
  { month: 'JUN', value: 70 },
  { month: 'JUL', value: 82 },
  { month: 'AUG', value: 78 },
]

export const skillGapData = [
  { skill: 'Neural Network Architecture', level: 90, mastered: true },
  { skill: 'Python & PyTorch', level: 85, mastered: true },
  { skill: 'LLM Fine-tuning (Gap)', level: 40, mastered: false },
  { skill: 'Kubernetes Orchestration', level: 15, mastered: false },
]

export const careerMatches = [
  { role: 'Full Stack Developer', match: 96, context: 'Enterprise & FinTech', demand: 'Critical', salaryMin: 145, salaryMax: 185, confidence: 9.8 },
  { role: 'Frontend Engineer', match: 89, context: 'Product-Led Growth', demand: 'High', salaryMin: 130, salaryMax: 160, confidence: 9.2 },
  { role: 'Backend Developer', match: 84, context: 'Infrastructure & Scale', demand: 'Moderate', salaryMin: 125, salaryMax: 155, confidence: 8.5 },
]

export const capabilityMatrixData = [
  { subject: 'Frontend', A: 90, fullMark: 100 },
  { subject: 'Backend', A: 75, fullMark: 100 },
  { subject: 'DevOps', A: 50, fullMark: 100 },
  { subject: 'Systems', A: 65, fullMark: 100 },
]

export const notificationsData = [
  {
    id: 1, group: 'TODAY', icon: 'file-text', category: 'Resume',
    title: 'Resume analyzed successfully',
    desc: 'Our AI has completed the deep-scan of your Software Engineer resume. Your readiness score is now 84%.',
    time: '2h ago', unread: true, actions: ['View Report', 'Dismiss'],
  },
  {
    id: 2, group: 'TODAY', icon: 'message-square', category: 'Interviews',
    title: 'Mock interview completed',
    desc: 'Great job! You showed 15% improvement in technical articulation. AI feedback is now available.',
    time: '5h ago', unread: true, actions: ['Review Feedback'],
  },
  {
    id: 3, group: 'THIS WEEK', icon: 'zap', category: 'Learning',
    title: 'Skill gap identified',
    desc: "We've identified 'Cloud Architecture' as a missing component for your target roles. Added to learning path.",
    time: '2 days ago', unread: false, actions: [],
  },
  {
    id: 4, group: 'THIS WEEK', icon: 'award', category: 'Achievements',
    title: 'New Achievement: Interview Pro',
    desc: "You've successfully completed 5 mock interviews this month! Your badge has been added to your profile.",
    time: '4 days ago', unread: false, actions: [],
  },
  {
    id: 5, group: 'EARLIER', icon: 'settings', category: 'Resume',
    title: 'Security update: Password changed',
    desc: 'Your account password was successfully updated. If this wasn\'t you, please contact support immediately.',
    time: '1 week ago', unread: false, actions: [],
  },
]

export const learningMomentumData = [
  { day: 'Mon', hours: 2 },
  { day: 'Tue', hours: 3.5 },
  { day: 'Wed', hours: 5 },
  { day: 'Thu', hours: 4 },
  { day: 'Fri', hours: 2.5 },
  { day: 'Sat', hours: 1.5 },
  { day: 'Sun', hours: 3 },
]

export const savedResources = [
  { id: 1, title: 'Mastering Kuberne...', meta: '12 Lessons • O\'Reilly' },
  { id: 2, title: 'System Design for ...', meta: '8 Modules • Udemy' },
  { id: 3, title: 'PyTorch for AI Engi...', meta: '24h content • Coursera' },
]

export const aiRecommendations = [
  { id: 1, tag: 'High Priority', title: 'Microservices Architecture with Spring Boot', desc: 'Fills your identified gap in system modularization and high-scale backends.', duration: '24h 45m Course' },
  { id: 2, tag: 'Missing Skill', title: 'Advanced React & Performance Optimization', desc: 'Identified weakness in frontend profiling and memory leak detection.', duration: '18h 30m Course' },
  { id: 3, tag: 'Career Booster', title: 'Cloud Native Infrastructure (AWS/GCP)', desc: 'Accelerate your transition to Senior roles with strong cloud-native knowledge.', duration: '32h Total' },
  { id: 4, tag: 'Personalized', title: 'LLM Integration for Full Stack Apps', desc: 'Relevant to your current industry project focus in career-tech AI.', duration: '12h Workshop' },
]

export const courseGrid = [
  { id: 1, platform: 'COURSERA', title: 'Mastering Next.js 14 and Server Components', instructor: 'Vercel Learning Center', progress: 68, timeLeft: '15h Left', action: 'Continue' },
  { id: 2, platform: 'UDEMY', title: 'Deep Learning Foundations: From Zero to Hero', instructor: 'by Andrej Karpathy', progress: 12, timeLeft: '42h Left', action: 'Continue' },
  { id: 3, platform: 'PLURAL SIGHT', title: 'Scalable Backend Systems: The Complete Guide', instructor: 'by Martin Kleppmann', progress: 0, timeLeft: '35h Content', action: 'Start Course' },
  { id: 4, platform: 'UDEMY', title: 'Flutter & Dart: Cross-Platform Mastery', instructor: 'by Google Dev Team', progress: 94, timeLeft: '2h Left', action: 'Finish Now' },
]

export const roadmapWeeks = [
  {
    week: '01', status: 'completed', title: 'Advanced React Patterns', completion: 100,
    desc: 'Mastering HOCs, Render Props, and the latest React 18 Concurrent features for scalable frontends.',
    hours: 12, lessons: 4, cert: 'Foundation Cert',
  },
  {
    week: '02', status: 'in-progress', title: 'LLM Integration & Prompt Eng.', completion: 45,
    desc: 'Learning LangChain, OpenAI API orchestration, and vector database management with Pinecone.',
    hours: 16, lessons: 6, cert: null,
    resources: ['RAG Architecture 101', 'Vector DB Setup'],
  },
  {
    week: '03', status: 'locked', title: 'Scalable Backend with Go', completion: 0,
    desc: 'Building high-concurrency microservices and implementing gRPC communication protocols.',
    hours: 14, lessons: 5, cert: null,
  },
  {
    week: '04', status: 'locked', title: 'Cloud Infrastructure (AWS)', completion: 0,
    desc: 'Deploying AI models using AWS SageMaker and managing clusters with Kubernetes (EKS).',
    hours: 18, lessons: 7, cert: null,
  },
]

export const selectedResources = [
  { id: 1, title: 'LLM Orchestration', meta: 'YOUTUBE • 45 MIN', color: 'red' },
  { id: 2, title: 'Deep Learning Specialization', meta: 'COURSERA • 4 WEEKS', color: 'blue' },
  { id: 3, title: 'Go Microservices Mastery', meta: 'UDEMY • 24 HOURS', color: 'orange' },
  { id: 4, title: 'Data Structures & Algo', meta: 'NPTEL • 12 WEEKS', color: 'green' },
]

export const heatmapData = Array.from({ length: 5 }, (_, row) =>
  Array.from({ length: 14 }, (_, col) => ({
    row, col, value: Math.random(),
  }))
).flat()

export const interviewMessages = [
  {
    id: 1, from: 'ai', time: '11:24 AM',
    text: "Great start, Alex. Now, let's dive into a technical scenario. Imagine you're leading a project where the team is divided between two different architectural approaches. How would you facilitate a resolution and ensure the project remains on schedule?",
  },
  {
    id: 2, from: 'user', time: '11:26 AM',
    text: "In that situation, my first step would be to organize a formal 'decision matrix' meeting. I'd have both sides present their technical pros and cons, specifically focusing on scalability and maintenance. By moving the conversation from opinions to data-driven trade-offs, we can usually find a middle ground or a clear winner.",
  },
]

export const coachMessages = [
  {
    id: 1, from: 'ai',
    text: "Hi! I'm your AI Career Coach. I've analyzed your profile — you have strong aptitude in React and System Design. How can I help you accelerate your career today?",
    suggestions: ['Career Path: "How do I become an AI Engineer?"', 'Interview Prep: "Prepare me for Amazon interviews."'],
  },
  {
    id: 2, from: 'user',
    text: "I'm interested in transition to Machine Learning. What are the top 3 skills I should focus on this month based on my current background?",
  },
  {
    id: 3, from: 'ai',
    text: null,
    list: [
      { label: 'Python & NumPy', desc: 'Since you know JS, focus on the synchronous data manipulation patterns in Python.' },
      { label: 'Linear Algebra Foundations', desc: 'Essential for understanding how neural networks process weights.' },
      { label: 'Scikit-Learn', desc: 'Start with classic ML models before diving into Deep Learning.' },
    ],
    actions: ['Deep Dive: Python', 'Find Courses'],
  },
]

export const profileData = {
  name: 'Alexander Pierce',
  degree: 'Computer Science & Engineering',
  placementScore: 88,
  topPercent: '5%',
  resumeScore: 88,
  skillScore: 92,
  readiness: 'Ready',
  skills: [
    { name: 'Machine Learning', level: 85 },
    { name: 'Full-Stack Development', level: 92 },
  ],
  skillChips: ['Python', 'React.js', 'Node.js', 'TensorFlow', 'PostgreSQL', 'Docker', 'AWS', 'Tailwind CSS'],
  projects: [
    { name: 'NeuralPath AI', desc: 'Automated career guidance system using GPT-4.', tags: ['Next.js', 'PyTorch'] },
    { name: 'EduChain', desc: 'Decentralized credential verification on Ethereum.', tags: ['Solidity', 'React'] },
  ],
  achievements: [
    { title: 'Winner, National AI Hackathon', sub: 'Organized by Google Cloud · 2023' },
    { title: 'AWS Certified Solutions Architect', sub: 'Validation ID: AWS-88210-CF · 2024' },
    { title: "Dean's List Award", sub: 'Academic Excellence · 3 Semesters' },
  ],
  journey: [
    { date: 'JANUARY 12, 2024', title: 'Resume Uploaded', desc: 'AI Parsed 15+ skills and suggested 4 key improvements for ATS optimization.' },
    { date: 'JANUARY 15, 2024', title: 'Roadmap Generated', desc: 'Personalized Full-Stack Engineer path created with focus on Cloud Architecture.' },
    { date: 'FEBRUARY 02, 2024', title: 'Mock Interview Completed', desc: 'Achieved 82% performance in System Design round. Feedback saved to profile.' },
  ],
}
