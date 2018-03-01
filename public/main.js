console.log('hello hey ');

let socket = io('http://localhost:3000');
// let socket = io.connect('http://localhost:3000');


function setup() {
    createCanvas(windowWidth, windowHeight);
    background(100);
}

function draw() {

}

function mouseMoved() {

    socket.emit('mouseMoved', {
        x: mouseX,
        y: mouseY
    });
    drawEllipse(mouseX, mouseY, 15, 0);


}

socket.on('drawMouse', (data) => {
    drawEllipse(data.x, data.y, 15, 255);
})

function drawEllipse(x, y, dim, fillColor) {
    push();
    fill(fillColor);
    ellipse(x, y, dim, dim);
    pop();

}