export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Results', href: '/results' },
  { label: 'Rules', href: '#rules' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'FAQ', href: '#faq' },
] as const

export const BUILD_STEPS = [
  {
    number: '01',
    title: 'BRICK',
    description: 'Every breakthrough begins with a single idea — raw, unpolished, full of potential.',
    color: 'bg-lego-red',
  },
  {
    number: '02',
    title: 'IDEA',
    description: 'Shape your concept. Define the problem. Sketch the solution on paper or whiteboard.',
    color: 'bg-lego-yellow',
  },
  {
    number: '03',
    title: 'PROTOTYPE',
    description: 'Build fast. Break things. Iterate relentlessly until something clicks.',
    color: 'bg-lego-blue',
  },
  {
    number: '04',
    title: 'IMPACT',
    description: 'Ship something real. Demo it. Show the world what your team can build in 24 hours.',
    color: 'bg-lego-green',
  },
] as const

export const STATS = [
  { value: 24, suffix: '', label: 'HOURS', prefix: '' },
  { value: 1, suffix: 'L', label: 'PRIZE POOL', prefix: '₹' },
  { value: 200, suffix: '+', label: 'BUILDERS', prefix: '' },
  { value: 50, suffix: '+', label: 'TEAMS', prefix: '' },
] as const

export const CHALLENGES = [
  {
    title: 'AI',
    description: 'Teach machines something new.',
    color: 'bg-lego-blue',
    rotate: '-rotate-1',
  },
  {
    title: 'SUSTAINABILITY',
    description: 'Build for a better planet.',
    color: 'bg-lego-green',
    rotate: 'rotate-1',
  },
  {
    title: 'MOBILITY',
    description: 'Reimagine how we move.',
    color: 'bg-lego-yellow',
    rotate: '-rotate-2',
  },
  {
    title: 'EDUCATION',
    description: 'Make learning limitless.',
    color: 'bg-lego-red',
    rotate: 'rotate-1',
  },
  {
    title: 'HEALTH',
    description: 'Build healthier futures.',
    color: 'bg-lego-blue',
    rotate: '-rotate-1',
  },
  {
    title: 'OPEN INNOVATION',
    description: 'Your rules. Your idea.',
    color: 'bg-lego-green',
    rotate: 'rotate-2',
  },
] as const

export const TIMELINE_EVENTS = [
  { time: '09:00', title: 'Registration & Check-in', highlight: false },
  { time: '10:00', title: 'Opening Ceremony', highlight: false },
  { time: '11:00', title: 'Problem Statements Revealed', highlight: false },
  { time: '12:00', title: 'BUILD BEGINS', highlight: true },
  { time: '18:00', title: 'Mentor Check-in', highlight: false },
  { time: '00:00', title: 'Midnight Sprint', highlight: false },
  { time: '06:00', title: 'Final Testing', highlight: false },
  { time: '09:00', title: 'Submission Deadline', highlight: true },
  { time: '10:00', title: 'Demo Day', highlight: false },
  { time: '12:00', title: 'Winners Announced', highlight: false },
] as const

export const PRIZES = [
  { place: '1st Place', amount: '₹50,000', color: 'bg-lego-yellow' },
  { place: '2nd Place', amount: '₹30,000', color: 'bg-lego-blue' },
  { place: '3rd Place', amount: '₹20,000', color: 'bg-lego-green' },
] as const

export const MENTORS = [
  { name: 'Aarav Mehta', role: 'AI Engineer', company: 'TechLabs', initial: 'AM', frame: 'border-lego-blue' },
  { name: 'Priya Shah', role: 'Product Designer', company: 'BuildWorks', initial: 'PS', frame: 'border-lego-red' },
  { name: 'Rohan Kulkarni', role: 'Founder', company: 'InnovateX', initial: 'RK', frame: 'border-lego-green' },
  { name: 'Neha Patel', role: 'Engineering Lead', company: 'FutureStack', initial: 'NP', frame: 'border-lego-yellow' },
] as const

/** Placeholder sponsors — replace with real logos/names before launch */
export const SPONSORS = [
  'TECHFORGE',
  'NEXUS',
  'CUBE LABS',
  'BYTEWORKS',
  'INNOVATE X',
] as const

export const RULES = [
  'Open to current college students.',
  'Teams can have 2–4 members.',
  'All projects must be built during the hackathon.',
  'Participants may use open-source libraries and APIs.',
  'Teams must submit their project before the deadline.',
  'Projects must comply with the event code of conduct.',
] as const

export const FAQ_ITEMS = [
  {
    question: 'Who can participate?',
    answer:
      'BRICK//24 is open to all current college students. You must be enrolled in an undergraduate or postgraduate program at the time of the event.',
  },
  {
    question: 'Can I participate individually?',
    answer:
      'Teams of 2–4 members are required. If you don\'t have a team, join our Discord to find teammates before registration closes.',
  },
  {
    question: 'How many people can be on a team?',
    answer: 'Each team must have between 2 and 4 members. Solo projects are not eligible.',
  },
  {
    question: 'Is prior hackathon experience required?',
    answer:
      'Not at all. BRICK//24 welcomes first-timers and veterans alike. Mentors will be available throughout the event.',
  },
  {
    question: 'What technologies can we use?',
    answer:
      'Any stack, framework, or language. You may use open-source libraries, APIs, and pre-existing boilerplate — but all core project work must happen during the 24-hour build window.',
  },
  {
    question: 'Will food and refreshments be provided?',
    answer:
      'Yes. Meals, snacks, and beverages will be available throughout the hackathon. Dietary requirements can be noted during registration.',
  },
  {
    question: 'What should we bring?',
    answer:
      'Your laptop, charger, student ID, and enthusiasm. We provide Wi-Fi, power outlets, workspace, and everything else you need to build.',
  },
  {
    question: 'How are projects judged?',
    answer:
      'Projects are evaluated on innovation, technical execution, design, impact potential, and presentation quality during Demo Day.',
  },
] as const

export const FOOTER_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Rules', href: '#rules' },
  { label: 'FAQ', href: '#faq' },
] as const

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' as const },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' as const },
  { label: 'GitHub', href: 'https://github.com', icon: 'github' as const },
] as const
