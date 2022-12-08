// Importing the fs module
const fs = require('fs');

try {
  // Intitializing the readFileLines with filename
  const input = fs.readFileSync('day2.txt', 'utf8');

  const charCodeA = 'A'.charCodeAt(0);
  const charCodeDiff = 'X'.charCodeAt(0) - charCodeA;

  let score = 0;

  const charToShape = (char) => {
    return char.charCodeAt(0) - charCodeA;
  };

  for (const line of input.split('\n')) {
    const [them, me] = line.split(' ');

    const themCode = charToShape(them);
    const action = me.charCodeAt(0) - charCodeDiff - charCodeA;
    const meCode = (themCode + action - 1 + 3) % 3;

    // Score because of chosen schape
    score += meCode + 1;

    // Score if win or draw
    if (themCode === meCode) {
      score += 3;
    } else if (meCode === (themCode + 1) % 3) {
      score += 6;
    }
  }

  console.log(score);
} catch (e) {
  // Printing error
  console.log('Error:', e.stack);
}

// const splitData = data
//   .toString()
//   .split('\n')
//   .map(
//     (x) =>
//       x
//         .split('\r')
//         .slice(0, 1)
//         .map((y) => {
//           switch (y[0]) {
//             case 'A':
//               if (y[2] === 'X') return 3 + 0;
//               if (y[2] === 'Y') return 1 + 3;
//               if (y[2] === 'Z') return 2 + 6;
//               break;
//             case 'B':
//               if (y[2] === 'X') return 1 + 0;
//               if (y[2] === 'Y') return 2 + 3;
//               if (y[2] === 'Z') return 3 + 6;
//               break;
//             case 'C':
//               if (y[2] === 'X') return 2 + 0;
//               if (y[2] === 'Y') return 3 + 3;
//               if (y[2] === 'Z') return 1 + 6;
//               break;
//             default:
//               y = 0;
//           }
//         })[0]
//   )
//   .reduce((a, b) => a + b);
