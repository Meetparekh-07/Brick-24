export interface ResultEntry {
  team: string
  college: string
  score: number
  status: 'QUALIFIED' | 'ELIMINATED' | 'WINNER' | 'FINALIST'
}

export interface Round {
  number: string
  title: string
  description: string
  entries: ResultEntry[]
  isActive: boolean
}

export const RESULTS: Round[] = [
  {
    number: '01',
    title: 'IDEA PITCH',
    description: 'Teams present innovative concepts',
    isActive: true,
    entries: [
      {
        team: 'Code Builders',
        college: 'DJ Sanghvi College',
        score: 92,
        status: 'QUALIFIED',
      },
      {
        team: 'Byte Force',
        college: 'VJTI',
        score: 87,
        status: 'QUALIFIED',
      },
      {
        team: 'Hack Titans',
        college: 'SPIT',
        score: 71,
        status: 'ELIMINATED',
      },
      {
        team: 'Tech Innovators',
        college: 'IIT Bombay',
        score: 88,
        status: 'QUALIFIED',
      },
      {
        team: 'Digital Dreams',
        college: 'Mumbai University',
        score: 65,
        status: 'ELIMINATED',
      },
    ],
  },
  {
    number: '02',
    title: 'PROTOTYPE',
    description: 'Teams build working prototypes',
    isActive: false,
    entries: [
      {
        team: 'Code Builders',
        college: 'DJ Sanghvi College',
        score: 85,
        status: 'QUALIFIED',
      },
      {
        team: 'Byte Force',
        college: 'VJTI',
        score: 82,
        status: 'QUALIFIED',
      },
      {
        team: 'Tech Innovators',
        college: 'IIT Bombay',
        score: 89,
        status: 'FINALIST',
      },
    ],
  },
  {
    number: '03',
    title: 'FINAL DEMO',
    description: 'Teams present final solutions',
    isActive: false,
    entries: [
      {
        team: 'Code Builders',
        college: 'DJ Sanghvi College',
        score: 92,
        status: 'FINALIST',
      },
      {
        team: 'Byte Force',
        college: 'VJTI',
        score: 88,
        status: 'FINALIST',
      },
      {
        team: 'Tech Innovators',
        college: 'IIT Bombay',
        score: 95,
        status: 'WINNER',
      },
    ],
  },
]
