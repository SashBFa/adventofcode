// Importing the fs module
fs = require('fs');

try {
  // Intitializing the readFileLines with filename
  const file = fs.readFileSync('input.txt', 'utf8');
  const cwd = [];
  const hierarchy = {};

  const SIZE_KEY = '_size';
  const MAX_SIZE = 100_000;

  const addSize = (object, keys, value) => {
    let copy = object;
    for (const key of keys) {
      copy = copy[key] ||= {};
    }
    copy[SIZE_KEY] = (copy[SIZE_KEY] || 0) + value;
  };

  // Two parties because it's more efficient than bubbling up in real time
  // Create the hierarchy
  for (const line of file.split('\n')) {
    const parts = line.split(' ');

    // Commands
    if (parts[0] === '$') {
      // cd
      if (parts[1] === 'cd') {
        switch (parts[2]) {
          case '/':
            cwd.length = 0;
            break;

          case '..':
            cwd.pop();
            break;

          default:
            cwd.push(parts[2]);
        }
      }

      // Ignore ls
      continue;
    }

    // ls result (ignore directories)
    if (parts[0] !== 'dir') {
      addSize(hierarchy, cwd, parseInt(parts[0]));
    }
  }

  // Bubble the sums up
  const bubbleUp = (hierarchy) => {
    if (!hierarchy[SIZE_KEY]) {
      hierarchy[SIZE_KEY] = 0;
    }

    for (const [key, value] of Object.entries(hierarchy)) {
      if (key === SIZE_KEY) {
        continue;
      }

      hierarchy[SIZE_KEY] += bubbleUp(value)[SIZE_KEY] || 0;
    }

    return hierarchy;
  };

  const sum = bubbleUp(hierarchy);

  // Find directories that are under a certain size
  const calculateSum = (hierarchy) => {
    let sum = 0;

    for (const value of Object.values(hierarchy)) {
      if (value[SIZE_KEY] < MAX_SIZE) {
        sum += value[SIZE_KEY];
      }

      // Recursion
      sum += calculateSum(value);
    }

    return sum;
  };

  console.log(calculateSum(sum));
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

// const limit = 100000;
// let document = {
//   name: '/',
//   directory: true,
//   size: 0,
//   children: [],
// };
// let path = [document];
// let currentDirectory = path[path.length - 1];
// let sum = 0;

// for (let line = 0; line < input.length; line++) {
//   if (input[line][0] === '$') {
//     if (input[line][0] === '$' && input[line][2] === 'l') {

//       for (
//         let i = 1;
//         line + i < input.length || input[line + i][0] !== '$';
//         i++
//       ) {
//         const [left, right] = input[line + i].split(' ');
//         if (left === 'dir') {
//           const dirChildren = {
//             name: right.split('\r')[0],
//             directory: true,
//             size: 0,
//             children: [],
//           };
//           currentDirectory.children.push(dirChildren);
//         } else if (parseInt(left) < limit) {
//           const fileChildren = {
//             name: right.split('\r')[0],
//             directory: false,
//             size: parseInt(left),
//           };
//           currentDirectory.children.push(fileChildren);
//           for (const element of path) {
//             element.size += parseInt(left);
//           }
//         }
//       }
//     } else if (input[line][2] === 'c') {
//       const [dol, cd, name] = input[line].split(' ');
//       if (name[0].charCodeAt(0) === 47) {
//         //
//       } else if (name[0].charCodeAt(0) === 46) {
//         if (path.length > 1) {
//           path.pop();
//         }
//       } else {
//         let target = currentDirectory.children.filter(
//           (item) => item.name == name.trim()
//         )[0];

//         let idTarget = currentDirectory.children.indexOf(target);
//         path.push(currentDirectory.children[idTarget]);
//         currentDirectory = currentDirectory.children[idTarget];
//       }
//     }
//   }
// }

// const getSum = (doc) => {
//   if (doc.directory) {
//     if (doc.size < limit) sum += doc.size;
//     if (doc.children.length > 0) doc.children.map((child) => getSum(child));
//   }
// };

// // document.size = 0;
// // getSum(document);
// console.log(document);

// const limit = 100000;
// let document = {
//   name: '/',
//   directory: true,
//   size: 0,
//   children: [],
// };
// let path = [document];
// let currentDirectory = path[path.length - 1];
// let sum = 0;

// for (const line of input) {
//   if (line.startsWith('$')) {
//     const [dol, cd, name] = line.split(' ');
//     if (line.startsWith('$ cd ..')) {
//       path.pop();
//     } else if (line.startsWith('$ cd') && !line.startsWith('$ cd /')) {
//       let target = currentDirectory.children.filter(
//         (item) => item.name == name.trim()
//       )[0];
//       let idTarget = currentDirectory.children.indexOf(target);

//       path.push(currentDirectory.children[idTarget]);
//     }
//   } else {
//     const [left, right] = line.split(' ');
//     if (line.startsWith('dir')) {
//       const dirChildren = {
//         name: right.split('\r')[0],
//         directory: true,
//         size: 0,
//         children: [],
//       };
//       currentDirectory.children.push(dirChildren);
//     } else if (parseInt(left) <= limit) {
//       const fileChildren = {
//         name: right.split('\r')[0],
//         directory: false,
//         size: parseInt(left),
//       };
//       currentDirectory.children.push(fileChildren);
//       for (const element of path) {
//         element.size += parseInt(left);
//       }
//     }
//   }
// }

// const getSum = (doc) => {
//   if (doc.directory) {
//     if (doc.size <= limit) sum += doc.size;
//     if (doc.children.length > 0) doc.children.map((child) => getSum(child));
//   }
// };

// getSum(document);
// console.log(sum);
