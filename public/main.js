
let socket = io.connect('http://localhost:3000');
let shapes = [];
let shape;

let receivedShapes =[];
let receivedShape;

let winodwSize = 100;
let undoButton;

function setup() {
   let canvas = createCanvas(winodwSize, winodwSize);
    background(100);
    // pixelDensity(1);
    undoButton = createButton('undo');
    undoButton.position(winodwSize, winodwSize+100);
    undoButton.mousePressed(goBack);
    canvas.mousePressed(canvasMousePressed);
    canvas.mouseReleased(canvasMouseReleased);
    // canvas.mousePressed(\canvasMousePressed);
}

function draw() {
    background(100);
    drawShapes(receivedShapes,255);
    drawShapes(shapes,0);
}

function drawShapes(shapesArray,strokeColor){
    noFill();
    stroke(strokeColor);
    for (let s of shapesArray) {
        beginShape();
        for (let pt of s) {
            vertex(pt.x, pt.y);
        }
        endShape();
    }
}

function goBack (){
    shapes.pop();
    console.log('go back',(shapes.length));
    undoEvent();
}

function canvasMouseReleased() {
    // console.log('mouse release',JSON.stringify(shapes))
    addVertex(mouseX,mouseY);
}

function canvasMousePressed() {
    createShape();
    // console.log('mouse pressed',JSON.stringify(shapes));
    addVertex(mouseX,mouseY);

}

function mouseDragged(){
    // console.log('mouse dragged',JSON.stringify(shape))
    addVertex(mouseX,mouseY);
}

function addVertex(X,Y){
    shape.push({
        x: X,
        y: Y
    });
    newPointEvent(X,Y);
}
function createShape(){
    shape = [];
    shapes.push(shape);
    newShapeEvent();
}

function newShapeEvent(){
    socket.emit('newShape','new shape is created');
}
function newPointEvent(X,Y){
    socket.emit('newPoint',{x:X,y:Y});
}

function undoEvent(){
    socket.emit('undo','remove the last shape')
}
socket.on('newShape',(data)=>{
    receivedShape =[];
    receivedShapes.push(receivedShape);
    
})

socket.on('newPoint',(data)=>{
    receivedShape.push(data);
})

socket.on('undo',()=>{
    receivedShapes.pop();
    console.log(' removing received shapes',receivedShapes.length);
})
