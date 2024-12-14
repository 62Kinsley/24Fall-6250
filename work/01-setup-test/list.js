const path = require('path');

const people = `
Name           |  NEUID   | Email                     | Slack handle           | github username
Qinjian Su     | 002874890| su.qin@northeastern.edu   | @Qinjian Su  (She/Her) | 62Kinsley

`.split('\n') // convert to array of lines
.filter( line => !!line.replace(/\s/g,'' )); // Remove empty lines

if (require.main === module) {
  // Run if we are being run directly

  // List the people
  for ( person of people ) {
    console.log(person);
  }
}
// If not being run directly, return the text
module.exports = people;
