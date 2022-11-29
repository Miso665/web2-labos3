let BROJ_POGODJENIH = 0;
let BROJ_GENERIRANIH = 0;
var rectsHit = 0;

class Rectangle {
    constructor(x, y, width, height, color, ctx) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speedX = Math.floor(Math.random() * 4) + 1;
        this.speedY = Math.floor(Math.random() * 4) + 1;
        this.ctx = ctx;
        this.show = true;
    }
    setX = (x) => {
        this.x = x
    }
    setY = (y) => {
        this.y = y
    }
    getX = () => {
        return this.x
    }
    getY = () => {
        return this.y
    }
    setSpeed = (speed) => {
        this.speed = speed
    }
    getSpeed = () => {
        return this.speed
    }
    update = function () {
        //var canvas = document.getElementById("myCanvas");
        //var ctx = canvas.getContext("2d");
        if (this.show) {
            //this.ctx.save();
            //this.ctx.translate(this.x, this.y);
            //this.ctx.fillStyle = color;
            this.ctx.fillRect(this.x, this.y, this.width, this.height);;
            this.ctx.restore();
        }

    }
    newPos = function () {
        if (this.x < 0)
            this.speedX = Math.floor(Math.random() * 4) + 1;
        else if ((this.x + this.width) >= this.ctx.canvas.width)
            this.speedX = -(Math.floor(Math.random() * 4) + 1);
        if (this.y < 0)
            this.speedY = -(Math.floor(Math.random() * 4) + 1);
        else if ((this.y + this.height) >= this.ctx.canvas.height)
            this.speedY = Math.floor(Math.random() * 4) + 1;
        this.x += this.speedX;
        this.y -= this.speedY;
    }
    isHit = function (mouseX, mouseY) {
        if (mouseX >= this.x && mouseX <= (this.x + this.width) && mouseY >= this.y && mouseY <= (this.y + this.height))
            return true
        else {
            console.log("Rect x, y:" + this.x + this.y)
            return false
        }
    }
}

function updateGame(ctx, rects, numberOfRects) {
    ctx.clearRect(0, 0, 800, 500)
    let countRects = 0
    for (let rect of rects) {
        rect.newPos()
        rect.update()
        if (rect.show) countRects++;
    }
    ctx.fillStyle = '#000000';
    ctx.fillText("Generated rects: " + numberOfRects, 700, 25);
    ctx.fillText("Rects hit: " + (numberOfRects - countRects), 700, 50)
    if (countRects === 0) {
        ctx.font = "25px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText("CONGRATS, YOU WON!", 400, 250)
    }
    ctx.textAlign = "start"
    ctx.font = "10px sans-serif"
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top
    console.log('X: ' + mouseX + " Y: " + mouseY)
    return { mouseX, mouseY };
}

window.onload = () => {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    //var rect = new Rectangle(20, 20, 40, 40, '#000000', 5)
    var numberOfRects = Math.floor(Math.random() * 5) + 3
    var rects = []
    for (let i = 0; i < numberOfRects; ++i) {
        let randomX = Math.floor(Math.random() * 700) + 1
        let randomY = Math.floor(Math.random() * 400) + 1
        rects.push(new Rectangle(randomX, randomY, 40, 40, '#000000', ctx))
    }
    for (let rect of rects) {
        if (rect.show) {
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height)
        }
    }

    canvas.addEventListener('click', function (e) {
        let { mouseX, mouseY } = getCursorPosition(canvas, e)
        console.log(mouseX)
        for (let rect of rects) {
            if (rect.isHit(mouseX, mouseY)) {
                console.log("HIT")
                rect.show = false
                rectsHit++;
            }
        }
    })

    ctx.fillStyle = '#000000';
    ctx.fillText("Generated rects: " + numberOfRects, 700, 25);
    ctx.fillText("Rects hit: " + rectsHit, 700, 50)
    setInterval(updateGame, 20, ctx, rects, numberOfRects)
}
