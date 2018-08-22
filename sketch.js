const classifier = ml5.imageClassifier('MobileNet', modelLoaded);
let status;
let img;

function modelLoaded() {
  status.html('Model Loaded!');
}

function clearCanvas() {
  let fontSize = height / 8;
  background(255);
  fill(0);
  noStroke();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(fontSize);
  text('Drop Any Image Here!', width / 2, height / 2, width, height);
  textSize(fontSize / 2);
  text(
      '(Or click on choose file)', width / 2, (height / 2) + fontSize, width,
      height);
}

function getResult(err, results) {
  if (err)
    console.error(err);
  else
    status.html(
        'Got a result! I am ' + round(results[0].probability * 100) +
        '% sure this is a ' + results[0].className);
}

function handleImage() {
  let r = img.width / img.height;
  resizeCanvas(height * r, height);
  image(img, 0, 0, width, height);
  classifier.predict(img, getResult);
}

function handleFile(file) {
  if (file.type === 'image') {
    img = createImg(file.data, handleImage);
    img.hide();
  } else {
    status.html('File not supported');
    clearCanvas();
  }
}

function setup() {
  status = select('#status');
  let h = windowHeight * 3 / 5;
  let cnvs = createCanvas(h * 16 / 9, h);
  cnvs.parent('#canvas');
  clearCanvas();
  cnvs.drop(handleFile);
  let button = createFileInput(handleFile);
  button.parent('#button');
}