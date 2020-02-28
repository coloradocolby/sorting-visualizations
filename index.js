const arr = [
  19,
  20,
  22,
  30,
  1,
  28,
  8,
  23,
  5,
  24,
  13,
  17,
  11,
  6,
  12,
  2,
  25,
  4,
  26,
  16,
  29,
  21,
  14,
  9,
  27,
  15,
  10,
  3,
  18,
  7
];

(() => {
  //   const update = (n1, n2, doSwap, delay = 65) => {
  //     return new Promise(resolve => {
  //       setTimeout(() => {
  //         // color(n1, 'red');
  //         // color(n2, 'red');
  //         setTimeout(() => {
  //           if (doSwap) swapNodes(n1, n2);
  //           //   color(n1, 'white');
  //           //   color(n2, 'white');
  //           resolve();
  //         }, delay);
  //       }, delay);
  //     });
  //   };
  const swapNodes = (n1, n2) => {
    const temp = n1.style.height;
    n1.style.height = n2.style.height;
    n2.style.height = temp;
  };

  const color = (n, c) => {
    n.style.background = c;
  };

  const swap = (arr, i, j) => {
    const temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
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
            color(nodes[j], 'red');
            color(nodes[j + 1], 'red');
            setTimeout(resolve, 65);
          });
          swapNodes(nodes[j], nodes[j + 1]);
          await new Promise(resolve => {
            color(nodes[j], 'white');
            color(nodes[j + 1], 'white');
            setTimeout(resolve, 65);
          });
        }
      }
      color(nodes[i], 'green');
    }
  };

  const insertionSort = async arr => {
    const nodes = document.getElementById('insertionsort').childNodes;

    for (let i = 1; i < arr.length; i++) {
      let j = i;
      while (j > 0 && arr[j] < arr[j - 1]) {
        swap(arr, j, j - 1);

        await new Promise(resolve => {
          color(nodes[j], 'red');
          color(nodes[j - 1], 'red');
          setTimeout(resolve, 65);
        });
        swapNodes(nodes[j], nodes[j - 1]);

        color(nodes[j], 'green');
        color(nodes[j - 1], 'green');
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
          color(nodes[j], 'red');
          color(nodes[minIdx], 'red');
          setTimeout(resolve, 65);
        });
        await new Promise(resolve => {
          color(nodes[j], 'white');
          color(nodes[minIdx], 'white');
          setTimeout(resolve, 65);
        });

        if (arr[j] < arr[minIdx]) {
          oldMinIdx = minIdx;
          minIdx = j;
        }
      }
      swap(arr, i, minIdx);
      swapNodes(nodes[i], nodes[minIdx]);
      color(nodes[i], 'green');
    }
    color(nodes[arr.length - 1], 'green');
  };

  //   const mergeSort = arr => {
  //     if (arr.length === 1) return arr;
  //     let mid = Math.floor(arr.length / 2);
  //     let left = arr.slice(0, mid);
  //     let right = arr.slice(mid);
  //     return mergeSortHelper(mergeSort(left), mergeSort(right));
  //   };

  //   const mergeSortHelper = (a1, a2, aux = []) => {
  //     while (a1.length && a2.length) {
  //       aux.push(a1[0] < a2[0] ? a1.shift() : a2.shift());
  //     }

  //     return [...aux, ...a1, ...a2];
  //   };

  arr.forEach(i => {
    const node = document.createElement('div');
    node.style.width = '15px';
    node.style.height = `${i * 4}px`;
    node.style.background = `white`;
    document.getElementById('bubblesort').appendChild(node.cloneNode(true));
    document.getElementById('insertionsort').appendChild(node.cloneNode(true));
    document.getElementById('selectionsort').appendChild(node.cloneNode(true));
  });

  bubbleSort([...arr]);
  insertionSort([...arr]);
  selectionSort([...arr]);
})();
