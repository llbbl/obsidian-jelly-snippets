// Mock Obsidian API for testing
global.app = {
  vault: {
    adapter: {
      fs: {
        readFileSync: jest.fn(),
        writeFileSync: jest.fn(),
        existsSync: jest.fn()
      }
    }
  },
  workspace: {
    getActiveViewOfType: jest.fn(),
    on: jest.fn(),
    off: jest.fn()
  }
} as any;

// Mock console methods to reduce noise during tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
};

// Setup DOM environment
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
  },
  writable: true
});