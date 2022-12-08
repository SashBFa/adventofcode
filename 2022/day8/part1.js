import { readFile } from 'node:fs/promises';

const input = await readFile('input.txt', 'utf8');

const forest = input.split('\n').map((item) => item.trim().split(''));
let sum = 0;

for (const row of forest) {
  const rowID = forest.indexOf(row);
  if (row === forest[0] || row === forest[forest.length - 1]) {
    sum += row.length;
  } else {
    row.map((tree, index) => {
      if (index === 0 || index === row.length - 1) {
        sum++;
      } else {
        const left = row.slice(0, index);
        const right = row.slice(index + 1, row.length);
        const top = forest.slice(0, rowID).map((x) => x[index]);
        const bottom = forest
          .slice(rowID + 1, forest.length)
          .map((x) => x[index]);
        if (tree > Math.max(...left)) {
          sum++;
        } else if (tree > Math.max(...right)) {
          sum++;
        } else if (tree > Math.max(...top)) {
          sum++;
        } else if (tree > Math.max(...bottom)) {
          sum++;
        }
      }
    });
  }
}

console.log(sum);
