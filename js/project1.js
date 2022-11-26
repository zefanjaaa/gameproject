class Sea {
  constructor() {
    this.ctx = undefined;
    this.bg = undefined;
    this.player = undefined;
    this.obstacle = undefined;
  }

  startGame() {
    const canvas = document.getElementById("game");

    this.ctx = canvas.getContext("2d");

    const fish = new Fish(80, 80, 250, 400);
    const rock = new Rock(90, 90, 50, 20);

    this.player = fish;

    this.obstacle = rock;

    const background = new Image();
    background.src = "./images/under-water-png-3-Transparent-Images-Free.png";
    background.onload = () => {
      this.bg = background;
      this.updateCanvas();
      this.drawPlayer();
      this.drawObstacle();
    };
  }
  drawPlayer() {
    this.ctx.drawImage(
      this.player.fish,
      this.player.posX - this.player.width / 2,
      this.player.posY,
      this.player.width,
      this.player.height
    );
  }

  drawObstacle() {
    setTimeout(() => {
      this.ctx.drawImage(
        this.obstacle.rock,
        this.obstacle.posX - this.player.width / 2,
        (this.obstacle.posY += 3),
        this.obstacle.width,
        this.obstacle.height
      )
      if (this.obstacle.posY === 0) {
        this.drawObstacle();
        console.log("does it work");
      }
      console.log("rocky");;
    }, 30);
    // if (this.obstacle.posY === 1) {
    //   this.drawObstacle();
    //   console.log("does it work");
    // }
    // console.log("rocky");
  }

  updateCanvas() {
    setInterval(() => {
      this.ctx.clearRect(0, 0, 500, 500);
      this.ctx.drawImage(this.bg, 0, 0, 500, 600);
      this.drawPlayer();
      this.drawObstacle();
    }, 30);
  }
}

class Fish {
  constructor(width, height, posX, posY) {
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
    this.fish = this.createFish();
  }
  createFish() {
    const fish = new Image();

    fish.src = "./images/cartoonfish-transparent.png";
    return fish;
  }

  moveRight() {
    this.posX += 10;
  }

  moveLeft() {
    this.posX -= 10;
  }

  moveUp() {
    this.posY -= 10;
  }
  moveDown() {
    this.posY += 10;
  }
  move(movement) {
    switch (movement) {
      case "ArrowRight":
        this.moveRight();
        break;
      case "ArrowLeft":
        this.moveLeft();
        break;
      // case "ArrowUp":
      //   this.moveUp();
      //   break;
      // case "ArrowDown":
      //   this.moveDown();
      //   break;

      default:
        break;
    }
  }
}

class Rock {
  constructor(width, height, posX, posY) {
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
    this.rock = this.createRock();
  }

  createRock() {
    const rock = new Image();
    rock.src = "./images/1cartoonrock-transparent.png";
    return rock;
  }
}

window.onload = () => {
  document.getElementById("button").onclick = () => {
    console.log("click");
    const game = new Sea();
    game.startGame();
    document.addEventListener("keydown", (e) => {
      game.player.move(e.key);
    });
  };
};
