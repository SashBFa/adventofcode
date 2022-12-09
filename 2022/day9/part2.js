import { readFile } from 'node:fs/promises';

const input = await readFile('input.txt', 'utf8');

const snake = {
  0: [{ x: 0, y: 0 }],
  1: [{ x: 0, y: 0 }],
  2: [{ x: 0, y: 0 }],
  3: [{ x: 0, y: 0 }],
  4: [{ x: 0, y: 0 }],
  5: [{ x: 0, y: 0 }],
  6: [{ x: 0, y: 0 }],
  7: [{ x: 0, y: 0 }],
  8: [{ x: 0, y: 0 }],
  9: [{ x: 0, y: 0 }],
};

const isEmpty = (tail, head) => {
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
    if (pos.x + tail.x === head.x && pos.y + tail.y === head.y) {
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
      for (let i = 0; i < count; i++) {
        snake[0].push({
          x: snake[0][snake[0].length - 1].x + 1,
          y: snake[0][snake[0].length - 1].y,
        });
        for (let j = 1; j < Object.entries(snake).length; j++) {
          if (
            snake[0][snake[0].length - 1 - j] &&
            isEmpty(snake[j], snake[j - 1])
          ) {
            snake[j].push({
              x: snake[0][snake[0].length - 1 - j].x,
              y: snake[0][snake[0].length - 1 - j].y,
            });
          }
        }
      }
      break;
    case 'U':
      for (let i = 0; i < count; i++) {
        snake[0].push({
          x: snake[0][snake[0].length - 1].x,
          y: snake[0][snake[0].length - 1].y + 1,
        });
        for (let j = 1; j < Object.entries(snake).length; j++) {
          if (
            snake[0][snake[0].length - 1 - j] &&
            isEmpty(snake[j], snake[j - 1])
          ) {
            snake[j].push({
              x: snake[0][snake[0].length - 1 - j].x,
              y: snake[0][snake[0].length - 1 - j].y,
            });
          }
        }
      }
      break;
    case 'L':
      for (let i = 0; i < count; i++) {
        snake[0].push({
          x: snake[0][snake[0].length - 1].x - 1,
          y: snake[0][snake[0].length - 1].y,
        });
        for (let j = 1; j < Object.entries(snake).length; j++) {
          if (
            snake[0][snake[0].length - 1 - j] &&
            isEmpty(snake[j], snake[j - 1])
          ) {
            snake[j].push({
              x: snake[0][snake[0].length - 1 - j].x,
              y: snake[0][snake[0].length - 1 - j].y,
            });
          }
        }
      }
      break;
    case 'D':
      for (let i = 0; i < count; i++) {
        snake[0].push({
          x: snake[0][snake[0].length - 1].x,
          y: snake[0][snake[0].length - 1].y - 1,
        });
        for (let j = 1; j < Object.entries(snake).length; j++) {
          if (
            snake[0][snake[0].length - 1 - j] &&
            isEmpty(snake[j], snake[j - 1])
          ) {
            snake[j].push({
              x: snake[0][snake[0].length - 1 - j].x,
              y: snake[0][snake[0].length - 1 - j].y,
            });
          }
        }
      }
      break;
  }
}

const uniqueTail = [...new Set(snake[9].map(JSON.stringify))].map(JSON.parse);

console.log({ uniqueTail }, uniqueTail.length);
