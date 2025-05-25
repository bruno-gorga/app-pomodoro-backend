export const DEFAULT_FOCUS_DURATION = 25 * 60; // 25 minutes in seconds
export const DEFAULT_BREAK_DURATION = 5 * 60; // 5 minutes in seconds
export const MIN_DURATION = 60; // 1 minute in seconds

// Mock data for sessions
export const MOCK_SESSIONS = [
  {
    _id: 'mock-1',
    userId: 'user-1',
    duration: 1500, // 25 minutes
    startTime: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    notes: 'Worked on project planning'
  },
  {
    _id: 'mock-2',
    userId: 'user-1',
    duration: 1500,
    startTime: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    notes: 'Research and documentation'
  },
  {
    _id: 'mock-3',
    userId: 'user-1',
    duration: 1800, // 30 minutes
    startTime: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    notes: 'Feature implementation'
  },
  {
    _id: 'mock-4',
    userId: 'user-1',
    duration: 1200, // 20 minutes
    startTime: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    notes: 'Bug fixes'
  }
];
