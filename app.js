document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const scoreDisplay = document.querySelector('#score')
  const startButton = document.querySelector('#start-button')
  const width = 10

  //The Tetrominoes
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ]

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ]

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ]

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ]

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition = 4;
  let currentRotation = 0;

  //randomly select a Tetromino and its initial rotation
  let random = Math.floor(Math.random() * theTetrominoes.length);
  let current = theTetrominoes[random][currentRotation];

  //draw the Tetromino
  const draw = () => {
    if (current) {
      current.forEach(i => {
        squares[currentPosition + i].classList.add('tetromino')
      })
    }
  }

  const undraw = () => {
    if (current) {
      current.forEach(i => {
        squares[currentPosition + i].classList.remove('tetromino')
      })
    }
  }
  
  const moveDown = () => {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  //make the Tetromino move down every second
  timeId = setInterval(moveDown, 1000)

  const freeze = () => {
    if (current.some(i => squares[currentPosition + i + width].classList.contains('taken'))) {
      current.forEach(i => squares[currentPosition + i].classList.add('taken'))
      //start a new tetromino falling
      random = Math.floor(Math.random() * theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
    }
  }

  //move the tetromino left unless it is at the edge or blockage
  const moveLeft = () => {
    undraw()
    const isAtLeftEdge = current.some(i => (currentPosition + i) % width === 0)

    if (!isAtLeftEdge) currentPosition -= 1
    
    if (current.some(i => squares[currentPosition + i].classList.contains('taken'))) {
      currentPosition += 1
    }

    draw()
  }

  //move the tetromino right unless it is at the edge or blockage
  const moveRight = () => {
    undraw()
    const isAtRightEdge = current.some(i => (currentPosition + i) % width === width - 1)

    if (!isAtRightEdge) currentPosition += 1
    
    if (current.some(i => squares[currentPosition + i].classList.contains('taken'))) {
      currentPosition -= 1
    }

    draw()
  }

  //rotate the teromino
  const rotate = () => {
    undraw()
    currentRotation++

    //resets the current rotation if it gets to 4th rotation
    if (currentRotation === current.length) {
      currentRotation = 0
    }

    current = theTetrominoes[random][currentRotation]
    draw()
  }

  const control = (e) => {
    if (e.keyCode === 37) {
      moveLeft()
    } else if (e.keyCode === 38) {
      rotate()
    } else if (e.keyCode === 39) {
      moveRight()
    } else if (e.keyCode === 40) {
      moveDown()
    }
  }
  document.addEventListener('keyup', control)

})