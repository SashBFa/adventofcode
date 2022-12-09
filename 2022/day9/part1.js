import { readFile } from 'node:fs/promises';

const input = await readFile('input.txt', 'utf8');

const xyTail = [{ x: 0, y: 0 }];
const xyHead = [{ x: 0, y: 0 }];

const isEmpty = (tailPos, headPos) => {
  let result = true;
  const arrPos = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
    { x: -1, y: 1 },
    { x: -1, y: 0 },
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
  ];
  for (const pos of arrPos) {
    if (pos.x + tailPos.x === headPos.x && pos.y + tailPos.y === headPos.y) {
      result = false;
      break;
    }
  }
  return result;
};

for (const line of input.split('\n')) {
  const [direction, count] = line.trim().split(' ');
  switch (direction) {
    case 'R':
      for (let r = 0; r < count; r++) {
        xyHead.push({
          x: xyHead[xyHead.length - 1].x + 1,
          y: xyHead[xyHead.length - 1].y,
        });
        if (isEmpty(xyTail[xyTail.length - 1], xyHead[xyHead.length - 1])) {
          xyTail.push({
            x: xyHead[xyHead.length - 2].x,
            y: xyHead[xyHead.length - 2].y,
          });
        }
      }
      break;
    case 'U':
      for (let u = 0; u < count; u++) {
        xyHead.push({
          x: xyHead[xyHead.length - 1].x,
          y: xyHead[xyHead.length - 1].y + 1,
        });
        if (isEmpty(xyTail[xyTail.length - 1], xyHead[xyHead.length - 1])) {
          xyTail.push({
            x: xyHead[xyHead.length - 2].x,
            y: xyHead[xyHead.length - 2].y,
          });
        }
      }
      break;
    case 'L':
      for (let l = 0; l < count; l++) {
        xyHead.push({
          x: xyHead[xyHead.length - 1].x - 1,
          y: xyHead[xyHead.length - 1].y,
        });
        if (isEmpty(xyTail[xyTail.length - 1], xyHead[xyHead.length - 1])) {
          xyTail.push({
            x: xyHead[xyHead.length - 2].x,
            y: xyHead[xyHead.length - 2].y,
          });
        }
      }
      break;
    case 'D':
      for (let d = 0; d < count; d++) {
        xyHead.push({
          x: xyHead[xyHead.length - 1].x,
          y: xyHead[xyHead.length - 1].y - 1,
        });
        if (isEmpty(xyTail[xyTail.length - 1], xyHead[xyHead.length - 1])) {
          xyTail.push({
            x: xyHead[xyHead.length - 2].x,
            y: xyHead[xyHead.length - 2].y,
          });
        }
      }
      break;
  }
}

const uniqueTail = [...new Set(xyTail.map(JSON.stringify))].map(JSON.parse);

console.log(uniqueTail.length);
