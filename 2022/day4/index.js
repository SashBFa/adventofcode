// Importing the fs module
fs = require('fs');

try {
  // Intitializing the readFileLines with filename
  const input = fs.readFileSync('input.txt', 'utf8').split('\n');
  let score = 0;

  for (const line of input) {
    const [[leftFirst, leftLast], [rightFirst, rightLast]] = line
      .split(',')
      .map((element) => element.split('-').map((string) => parseInt(string)));

    // if (
    //   (leftFirst <= rightFirst && leftLast >= rightLast) ||
    //   (rightFirst <= leftFirst && rightLast >= leftLast)
    // ) {
    //   score++;
    // }

    //   const left = [];
    //   const right = [];
    //   for (let l = leftFirst; l <= leftLast; l++) {
    //     left.push(l);
    //   }
    //   for (let r = rightFirst; r <= rightLast; r++) {
    //     right.push(r);
    //   }
    //   if (left.filter((nbr) => right.includes(nbr))[0]) score++;
    // }

    const getNumbers = (min, max) =>
      Array.from({ length: max - min + 1 }, (_, i) => min + i);
    if (
      getNumbers(leftFirst, leftLast).filter((nbr) =>
        getNumbers(rightFirst, rightLast).includes(nbr)
      )[0]
    )
      score++;
  }

  console.log(score);
} catch (e) {
  // Printing error
  console.log('Error:', e.stack);
}
