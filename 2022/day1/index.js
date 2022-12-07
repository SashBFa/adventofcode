// Importing the fs module
fs = require('fs');

try {
  // Intitializing the readFileLines with filename
  const data = fs.readFileSync('day1.txt', 'utf8');
  const splitData = data
    .toString()
    .split('\n\r')
    .map((x) =>
      x
        .split('\n')
        .map(Number)
        .reduce((a, b) => a + b)
    )
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b);

  // Printing the response
  console.log(splitData);
} catch (e) {
  // Printing error
  console.log('Error:', e.stack);
}
