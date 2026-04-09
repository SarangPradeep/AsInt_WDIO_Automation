const fs = require('fs');

const input = fs.readFileSync('logs/raw.log', 'utf8');
const lines = input.split('\n');

const suites = {};
let currentSuite = 'global';

for (const line of lines) {

  // detect suite start
  if (line.includes('Starting suite:')) {
    currentSuite = line.split('Starting suite:')[1].trim()
      .replace(/[^a-z0-9]/gi, '_');
    suites[currentSuite] = [];
  }

  if (!suites[currentSuite]) {
    suites[currentSuite] = [];
  }

  suites[currentSuite].push(line);
}

// create separated files
for (const suite in suites) {
  fs.writeFileSync(`logs/${suite}.log`, suites[suite].join('\n'));
}

console.log('Logs split by suite');