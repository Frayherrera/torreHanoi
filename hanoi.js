class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Tower {
  constructor() {
    this.top = null;
    this.length = 0;
  }

  push(value) {
    const newNode = new Node(value);
    newNode.next = this.top;
    this.top = newNode;
    this.length++;
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }

    const poppedNode = this.top;
    this.top = poppedNode.next;
    poppedNode.next = null;
    this.length--;

    return poppedNode.value;
  }

  isEmpty() {
    return this.length === 0;
  }
}

const numberOfDisks = 5;
let towers = {
  1: new Tower(),
  2: new Tower(),
  3: new Tower(),
};

// Inicializa la primera torre con discos
for (let i = numberOfDisks; i > 0; i--) {
  towers[1].push(i);
}


function render() {
  for (let i = 1; i <= 3; i++) {
    const towerElement = document.getElementById(`tower${i}`);
    towerElement.innerHTML = "";

    let currentDisk = towers[i].top;
    while (currentDisk !== null) {
      const diskElement = document.createElement("div");
      diskElement.className = "disk";
      diskElement.style.width = `${currentDisk.value * 20}px`;
      towerElement.appendChild(diskElement);

      currentDisk = currentDisk.next;
    }
  }
}

  
  function moveDisk(source, destination) {
    const sourceTower = towers[source];
    const destinationTower = towers[destination];
  
    const Node = sourceTower.pop();
    destinationTower.push(Node);
  
    render();
  }
  
  function hanoi(n, source, target, auxiliary) {
    if (n > 0) {
      // Paso 1: Mover n-1 discos de la torre de origen a la torre auxiliar
      hanoi(n - 1, source, auxiliary, target);
  
      // Paso 2: Mover el disco n de la torre de origen a la torre de destino
      moveDisk(source, target);
  
      // Paso 3: Mover los n-1 discos de la torre auxiliar a la torre de destino
      hanoi(n - 1, auxiliary, target, source);
    }
  }
  
  
  function solveHanoi() {
    // Inicia el proceso de resolución automática llamando a la función hanoi
    hanoi(numberOfDisks, 1, 3, 2);
  }
  

  function recargarPagina() {
    // Recarga la página 
    location.reload(true);
}

  
  // Función para animar los pasos
  function animateSteps() {
    const steps = [];
    function collectSteps(n, source, target, auxiliary) {
      if (n > 0) {
        collectSteps(n - 1, source, auxiliary, target);
        steps.push({ source, target });
        collectSteps(n - 1, auxiliary, target, source);
      }
    }
  
    collectSteps(numberOfDisks, 1, 3, 2);
  
    // Anima cada paso después de un intervalo
    let delay = 500;
    steps.forEach((step) => {
      setTimeout(() => {
        moveDisk(step.source, step.target);
      }, delay);
      delay += 1000;
    });
  }
  
  render();
  