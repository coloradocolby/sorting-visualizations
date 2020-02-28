const DEFAULT_ANIMATION_SPEED = 50;
const MAX_ANIMATION_SPEED = 100;
const NUM_NODES = 50;
const COLORS = {
  GREEN: '#1b5e20',
  RED: '#b71c1c',
  OFFWHITE: '#bbbbbb'
};

let arr;
let delay = DEFAULT_ANIMATION_SPEED; //ms
let timeouts = [];

const bubbleSortContainer = document.getElementById('bubblesort');
const insertionSortContainer = document.getElementById('insertionsort');
const selectionSortContainer = document.getElementById('selectionsort');
const restartBtn = document.querySelector('#restart');
const speedRange = document.querySelector('#speed');

const swapNodes = (n1, n2) => {
  const temp = n1.style.height;
  n1.style.height = n2.style.height;
  n2.style.height = temp;
};

const color = (n, c) => {
  n.forEach(x => (x.style.background = c));
};

const swap = (a, i, j) => {
  [a[i], a[j]] = [a[j], a[i]];
};

/**
 * NOTE: This is not the most efficient bubblesort algorithm but it is the easiest to
 * translate into a visualization
 */
const bubbleSort = async arr => {
  const nodes = document.getElementById('bubblesort').childNodes;

  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);

        await new Promise(resolve => {
          color([nodes[j], nodes[j + 1]], COLORS.RED);
          timeouts.push(setTimeout(resolve, delay));
        });
        swapNodes(nodes[j], nodes[j + 1]);
        await new Promise(resolve => {
          color([nodes[j], nodes[j + 1]], COLORS.OFFWHITE);
          timeouts.push(setTimeout(resolve, delay));
        });
      }
    }
    color([nodes[i]], COLORS.GREEN);
  }
};

const insertionSort = async arr => {
  const nodes = document.getElementById('insertionsort').childNodes;

  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0 && arr[j] < arr[j - 1]) {
      swap(arr, j, j - 1);

      await new Promise(resolve => {
        color([nodes[j], nodes[j - 1]], COLORS.RED);
        timeouts.push(setTimeout(resolve, delay));
      });
      swapNodes(nodes[j], nodes[j - 1]);
      color([nodes[j], nodes[j - 1]], COLORS.GREEN);
      j--;
    }
  }
};

const selectionSort = async arr => {
  const nodes = document.getElementById('selectionsort').childNodes;
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      await new Promise(resolve => {
        color([nodes[j], nodes[minIdx]], COLORS.RED);
        timeouts.push(setTimeout(resolve, delay));
      });
      await new Promise(resolve => {
        color([nodes[j], nodes[minIdx]], COLORS.OFFWHITE);
        timeouts.push(setTimeout(resolve, delay));
      });

      if (arr[j] < arr[minIdx]) {
        oldMinIdx = minIdx;
        minIdx = j;
      }
    }
    swap(arr, i, minIdx);
    swapNodes(nodes[i], nodes[minIdx]);
    color([nodes[i]], COLORS.GREEN);
  }
  color([nodes[arr.length - 1]], COLORS.GREEN);
};

/**
 * Fisher-Yates Shuffle
 * @param {*} arr
 */
const shuffle = arr => {
  for (let i = arr.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

const main = () => {
  timeouts.forEach(t => clearTimeout(t));
  arr = [];
  for (let i = 1; i <= NUM_NODES; i++) {
    arr.push(i);
  }

  shuffle(arr);

  bubbleSortContainer.innerHTML = '';
  insertionSortContainer.innerHTML = '';
  selectionSortContainer.innerHTML = '';

  arr.forEach(i => {
    const node = document.createElement('div');
    node.style.width = `7px`;
    node.style.height = `${i * 1.5}px`;
    node.style.background = COLORS.OFFWHITE;
    bubbleSortContainer.appendChild(node.cloneNode(true));
    insertionSortContainer.appendChild(node.cloneNode(true));
    selectionSortContainer.appendChild(node.cloneNode(true));
  });

  bubbleSort([...arr]);
  insertionSort([...arr]);
  selectionSort([...arr]);
};

main();

restartBtn.addEventListener('click', main);

speedRange.addEventListener('input', e => {
  delay = MAX_ANIMATION_SPEED - e.target.value;
});
