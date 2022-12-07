// Importing the fs module
fs = require('fs');

try {
  // Intitializing the readFileLines with filename
  const input = fs.readFileSync('input.txt', 'utf8').split('\n');

  const limit = 100000;
  let document = {
    name: '/',
    directory: true,
    size: 0,
    children: [],
  };
  let path = [document];
  let currentDirectory = path[path.length - 1];
  let sum = 0;

  for (let line = 0; line < input.length; line++) {
    if (input[line][0] === '$') {
      if (input[line][2] === 'l') {
        for (
          let i = 1;
          line + i < input.length && input[line + i][0] !== '$';
          i++
        ) {
          const [left, right] = input[line + i].split(' ');
          if (left === 'dir') {
            const dirChildren = {
              name: right.split('\r')[0],
              directory: true,
              size: 0,
              children: [],
            };
            currentDirectory.children.push(dirChildren);
          } else if (parseInt(left) < limit) {
            const fileChildren = {
              name: right.split('\r')[0],
              directory: false,
              size: parseInt(left),
            };
            currentDirectory.children.push(fileChildren);
            for (const element of path) {
              element.size += parseInt(left);
            }
          }
        }
      }

      if (input[line][2] === 'c') {
        const [dol, cd, name] = input[line].split(' ');
        if (name[0].charCodeAt(0) === 47) {
          //
        } else if (name[0].charCodeAt(0) === 46) {
          if (path.length < 1) {
            path.pop();
          }
        } else {
          let target = currentDirectory.children.filter(
            (item) => item.name == name.trim()
          )[0];

          let idTarget = currentDirectory.children.indexOf(target);
          path.push(currentDirectory.children[idTarget]);
          currentDirectory = currentDirectory.children[idTarget];
        }
      }
    }
  }

  const getSum = (doc) => {
    if (doc.directory) {
      if (doc.size < limit) sum += doc.size;
      if (doc.children.length > 0) doc.children.map((child) => getSum(child));
    }
  };

  document.size = 0;
  getSum(document);
  console.log(sum);
} catch (e) {
  // Printing error
  console.log('Error:', e.stack);
}
// const limit = 100000;
// let directory = [];
// let returnCount = 0;
// let result = 0;

// for (const line of input) {
//   const id = input.indexOf(line);
//   if (line[0] === 'd') {
//     const [dirLeft, dirRight] = line.split(' ');
//     directory.push([dirRight.split('\r')[0], 0]);
//   }
//   if (line[0] !== '$' && line[0] !== 'd') {
//     const [fileSize, fileName] = line.split(' ');
//     if (parseInt(fileSize) < limit) {
//       for (let i = 0; i + id > 0; i--) {
//         if (input[id + i][0] === '$') {
//           if (input[i + id][2] !== 'l') {
//             if (input[i + id][6].charCodeAt(0) === 46) {
//               returnCount++;
//             } else {
//               if (returnCount === 0) {
//                 const [dol, cd, name] = input[i + id].split(' ');
//                 const target = directory.filter(
//                   (item) => item[0] === name.trim()
//                 );
//                 const position = directory.indexOf(target[0]);
//                 directory[position][1] += parseInt(fileSize);
//               } else {
//                 returnCount--;
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
// directory.map((item) => item[1] < limit && (result += item[1]));
// console.log(directory);
