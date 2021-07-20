console.log('Live')
const canvas = document.querySelector('#draw')
const ctx = canvas.getContext('2d')

const colorArr = ['blue', 'black', 'yellow', 'green', 'teal'];

ctx.strokeStyle = '#BADASS';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 1;
ctx.globalCompositeOperation = 'luminosity';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
    if (!isDrawing) {
        return //stops the function when not drawing
    }
    hue++;

    // ctx.lineWidth ++ ;
    if (ctx.lineWidth >= 20 || ctx.lineWidth <= 1) {
        direction = !direction;
    }
    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }

    ctx.strokeStyle = `hsl(${hue},100%,50%)`;
    ctx.beginPath();
    //start from this coordinate
    ctx.moveTo(lastX, lastY);
    //end at this coordinate
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    //update the starting coordinate with last coordinate
    lastX = e.offsetX;
    lastY = e.offsetY;
    //ES6 shorthand of above declaration
    // [lastY , lastY] = [e.offsetX , e.offsetY] ;
    if (hue >= 1200) {
        hue = 0;
    }
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    hue = 0;
    ctx.lineWidth = 1;
});

canvas.addEventListener('mouseout', () => {
    isDrawing = false;
    hue = 0;
    ctx.lineWidth = 1;
});

const clearBtn = document.querySelector('.btn');

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

const screen = document.querySelector('.screen')
const screenBtn = document.querySelector('.screen-btn')
const canvas_container = document.querySelector('.canvas')

screenBtn.addEventListener('click', () => {
    screen.classList.toggle('screen-collapse');
    clearBtn.classList.add('show-btn');
    canvas_container.classList.add('show-canvas');
})
