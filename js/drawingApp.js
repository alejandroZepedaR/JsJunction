// get canvas element and context
let canvas = document.getElementById('DrawingCanvas');
let colorPicker = document.getElementById('ColorPicker');
let widthPicker = document.getElementById('lineWidth');
let pencilPicker = document.querySelector('input[name="tool"][value="pencil"]');
let eraserPicker = document.querySelector('input[name="tool"][value="eraser"]');
let bgColorPicker = document.getElementById('bg-color-picker');
let downloadButton = document.getElementById('downloadButton');
let bgImagePicker = document.getElementById('imageImport');
let openModalButton = document.getElementById('open-modal-button');
let closeModalButton = document.getElementById('close-modal-button');
let canvasSizeModal = document.getElementById('canvas-size-modal');
let canvasWidthInput = document.getElementById('canvas-width');
let canvasHeightInput = document.getElementById('canvas-height');
let canvasSizeButton = document.getElementById('canvas-size-button');
let squarePicker = document.querySelector('input[name="tool"][value="square"]');

let ctx = canvas.getContext('2d');
ctx.strokeStyle = colorPicker.value;
ctx.fillStyle = bgColorPicker.value;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// VARIABLES
let currentTool = 'pencil';
let canvasData;
let drawing = false;
let x = 0;
let y = 0;

// EVENTS 
colorPicker.addEventListener('input', updateColor);
widthPicker.addEventListener('input', updateLineWidth);
pencilPicker.addEventListener('change', updateTool);
eraserPicker.addEventListener('change', updateTool);
bgColorPicker.addEventListener('input', updateBgColor);
downloadButton.addEventListener('click', downloadImage);
bgImagePicker.addEventListener('change', updateBgImage);
openModalButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);
canvasSizeButton.addEventListener('click', updateCanvasSize);
squarePicker.addEventListener('change', updateTool);

canvas.addEventListener('mousedown', e => {
  x = e.offsetX;
  y = e.offsetY;
  drawing = true;

  // Store the current state of the canvas
  if (currentTool === 'square') {
    canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  }
});

canvas.addEventListener('mouseup', e => {
  if (!drawing) { return; }
  drawing = false;

  // Store the new state of the canvas
  if (currentTool === 'square') {
    canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  ctx.beginPath();
});


canvas.addEventListener('mousemove', e => {
  if (!drawing) { return; }

  if (currentTool === 'square') {
    // Put the saved image data back onto the canvas
    ctx.putImageData(canvasData, 0, 0);

    // Draw the rectangle
    drawSquare(e.offsetX, e.offsetY);
  } else {
    draw(e.offsetX, e.offsetY);
  }
});

//FUNCTIONS

function downloadImage() {
  // Convert the canvas into a JPEG image data URL
  let imageDataUrl = canvas.toDataURL('image/jpeg');

  let link = document.createElement('a');

  link.href = imageDataUrl;

  link.download = 'my_drawing.jpg';

  link.click();
}

//clear the canvas function
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = bgColorPicker.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function updateTool(e) {
  if (e.target.value === 'pencil') {
    ctx.strokeStyle = colorPicker.value;
  } else if (e.target.value === 'eraser') {
    ctx.strokeStyle = '#fff';
  } else if (e.target.value === 'square') {
    ctx.strokeStyle = colorPicker.value;
  }
  currentTool = e.target.value;
}

function updateBgColor(e) {
  canvas.style.backgroundColor = e.target.value;
  ctx.fillStyle = e.target.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = colorPicker.value;
}

function updateColor(e) {
    ctx.strokeStyle = e.target.value;
}

function updateLineWidth(e) {
    ctx.lineWidth = e.target.value;
}

function updateBgImage(e) {
  let reader = new FileReader();
  
  reader.onload = function(event) {
    let img = new Image();
    
    img.onload = function() {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    
    img.src = event.target.result;
  };
  
  reader.readAsDataURL(e.target.files[0]);
  closeModal();
}

function openModal() {
  canvasSizeModal.style.display = "block";
}

function closeModal() {
  canvasSizeModal.style.display = "none";
}

function updateCanvasSize() {
  canvas.width = canvasWidthInput.value;
  canvas.height = canvasHeightInput.value;

  // Redraw the background after resizing the canvas
  ctx.fillStyle = bgColorPicker.value; 
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Close the modal after updating the size
  closeModal();
}

function drawSquare(x1, y1) {
  const width = x1 - x;
  const height = y1 - y;
  const rectX = width < 0 ? x1 : x;
  const rectY = height < 0 ? y1 : y;

  ctx.strokeRect(rectX, rectY, Math.abs(width), Math.abs(height));
}

// draw a line function
function draw(x1, y1) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x1, y1);
  ctx.stroke();
  x = x1;
  y = y1;
}
