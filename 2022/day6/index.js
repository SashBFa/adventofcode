// Importing the fs module
const fs = require('fs');

try {
  // Intitializing the readFileLines with filename
  const input = fs.readFileSync('input.txt', 'utf8').split('');

  // for (let i = 0; i < input.length - 4; i++) {
  //   const uniqueChars = [...new Set(input.slice(i, i + 4))];

  //   if (uniqueChars.length === 4) {
  //     console.log(uniqueChars, i + 4);
  //     return;
  //   }
  // }

  for (let i = 0; i < input.length - 14; i++) {
    const uniqueChars = [...new Set(input.slice(i, i + 14))];

    if (uniqueChars.length === 14) {
      console.log(uniqueChars, i + 14);
      return;
    }
  }
} catch (e) {
  // Printing error
  console.log('Error:', e.stack);
}
