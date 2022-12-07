// Importing the fs module
fs = require('fs');

try {
  // Intitializing the readFileLines with filename
  const input = fs.readFileSync('input.txt', 'utf8').replace(/\r/g, '');
  const response = [];

  const [array, actions] = input.split('\n\n');
  const tempArray = array
    .split('\n')
    .map((x) => [...x].filter((_, index) => index % 4 === 1))
    .reverse();

  const newArray = Array.from({ length: tempArray[0].length }, (_) => []);

  for (const line of tempArray) {
    for (let i = 0; i < line.length; i++) {
      if (line[i] !== ' ') newArray[i].push(line[i]);
    }
  }

  for (const moves of actions.split('\n')) {
    const moveAction = moves.split(' ')[1];
    const fromAction = moves.split(' ')[3] - 1;
    const toAction = moves.split(' ')[5] - 1;
    const temp = [];
    for (let i = 0; i < moveAction; i++) {
      temp.push(newArray[fromAction][newArray[fromAction].length - 1]);
      newArray[fromAction].pop();
    }
    newArray[toAction] = [...newArray[toAction], ...temp.reverse()];
  }

  for (let i = 0; i < newArray.length; i++) {
    response.push(newArray[i].pop());
  }

  console.log(newArray);
  console.log(response.join(''));
} catch (e) {
  // Printing error
  console.log('Error:', e.stack);
}
