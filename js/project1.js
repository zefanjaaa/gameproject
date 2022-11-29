class Sea {
  constructor() {
    this.ctx = undefined;
    this.bg = undefined;
    this.player = undefined;

    this.frame = 0;
    this.rockObstacle = [];
  }

  startGame() {
    const canvas = document.getElementById("game");

    this.ctx = canvas.getContext("2d");

    const fish = new Fish(80, 80, 250, 400);

    this.player = fish;

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
    this.rockObstacle.forEach((rock) => {
      this.ctx.drawImage(
        rock.rock,
        rock.posX,
        (rock.posY += 2),
        rock.width,
        rock.height
      );
      if (rock.posY > 501) {
        this.rockObstacle.shift();
        // console.log(this.rockObstacle);
      }
    });
    // this.ctx.drawImage(
    //   this.obstacle.rock,
    //   this.obstacle.posX - this.player.width / 2,
    //   (this.obstacle.posY += 3),
    //   this.obstacle.width,
    //   this.obstacle.height
    // );

    // console.log("rocky");
  }

  updateCanvas() {
    this.interval = setInterval(() => {
      this.ctx.clearRect(0, 0, 500, 500);
      this.ctx.drawImage(this.bg, 0, 0, 500, 500);
      this.drawPlayer();
      this.drawObstacle();
      this.frame += 5;
      if (this.frame % 150 === 0) {
        let rockX = Math.random() * 410;
        const newRock = new Rock(90, 90, rockX, 20);
        this.rockObstacle.push(newRock);
      }

      let xBorder = Math.min(Math.max(this.player.posX, 0), 500);
      // let yBorder = Math.min(Math.max(this.player.posY, 0), 500);
    }, 25);
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

  // moveUp() {
  //   this.posY -= 10;
  // }
  // moveDown() {
  //   this.posY += 10;
  // }
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
    this.width = 65;
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
  document.getElementById("restart").onclick = () => {
    location.reload();
    console.log("click click");
  };
};
