console.log('Hello from the index.js file');

const fetch = require('node-fetch')
const _ = require('lodash');
const path = require('path');
const fs = require('fs');

async function run() {
  const response = await fetch("https://dev.to/api/articles?state=rising");
  const json = await response.json();
  const sorted = _.sortBy(json, ["public_reactions_count"], ['desc']);
  const top3 = _.take(sorted, 3);

  const filePrefix = new Date().toISOString().split('T')[0];
  fs.writeFileSync(path.join(__dirname, `${filePrefix}-feed.json`), JSON.stringify(top3, null, 2));
}

run();

/*console.log('Hello World, from a script file.');

import fetch from 'node-fetch';

console.log(`start`);
try {
  const res = await fetch('https://github.com/MicrosoftDocs/node-essentials');

  console.log('statusCode:', res.status);
} catch (error) {
  console.log(`error: ${error}`);
}
console.log(`end`);
*/