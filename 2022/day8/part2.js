import { readFile } from 'node:fs/promises';

const input = await readFile('input.txt', 'utf8');

const forest = input
  .split('\n')
  .map((item) => item.trim().split('').map(Number));
let sum = 0;

const maxDist = (tree, direction) => {
  let dist = 0;
  for (let i = 0; i < direction.length; i++) {
    if (direction[i] >= tree) {
      dist++;
      break;
    } else {
      dist++;
    }
  }
  return dist;
};

for (const row of forest) {
  const rowID = forest.indexOf(row);
  if (row !== forest[0] || row !== forest[forest.length - 1]) {
    row.map((tree, index) => {
      if (index !== 0 || index !== row.length - 1) {
        const left = row.slice(0, index).reverse();
        const right = row.slice(index + 1, row.length);
        const top = forest
          .slice(0, rowID)
          .map((x) => x[index])
          .reverse();
        const bottom = forest
          .slice(rowID + 1, forest.length)
          .map((x) => x[index]);
        const scenic =
          maxDist(tree, left) *
          maxDist(tree, right) *
          maxDist(tree, bottom) *
          maxDist(tree, top);
        if (scenic > sum) sum = scenic;
      }
    });
  }
}

console.log(sum);
