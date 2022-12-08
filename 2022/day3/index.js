// Importing the fs module
const fs = require('fs');

try {
  // Intitializing the readFileLines with filename
  const input = fs.readFileSync('input.txt', 'utf8').split('\n');

  const charCodeMin = 'a'.charCodeAt(0);
  const charCodeMaj = 'A'.charCodeAt(0);

  let score = 0;

  // const linePart = (line, start, end) => {
  //   return line.slice(start, end).toString().split('');
  // };

  // for (const line of input) {
  //   const [left, right] = [
  //     linePart(line, 0, line.length / 2),
  //     linePart(line, line.length / 2, line.length),
  //   ];
  //   const charSame = left
  //     .filter((letter) => right.includes(letter))[0]
  //     .charCodeAt(0);

  //   if (charSame >= 96) {
  //     score += charSame - charCodeMin + 1;
  //   } else {
  //     score += charSame - charCodeMaj + 27;
  //   }
  // }

  for (let i = 0; i < input.length; i++) {
    if (i % 3 === 0) {
      const [first, second, third] = [
        input[i].toString().split(''),
        input[i + 1].toString().split(''),
        input[i + 2].toString().split(''),
      ];
      const charSame = first
        .filter(
          (letter) => second.includes(letter) && third.includes(letter)
        )[0]
        .charCodeAt(0);
      if (charSame >= 96) {
        score += charSame - charCodeMin + 1;
      } else {
        score += charSame - charCodeMaj + 27;
      }
    }
  }

  console.log(score);
} catch (e) {
  // Printing error
  console.log('Error:', e.stack);
}
