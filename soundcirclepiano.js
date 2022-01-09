let angle = 0;
function preload() {
  sound = loadSound('nier.mp3');
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  fft = new p5.FFT(0.75);
  cnv.mouseClicked(toggle);
  sound.amp(0.3);
}

function draw() {
  background(0,50);
  translate(width/2, height/2);
  noStroke();
  fill('purple');
  let spectrum = fft.analyze();
  let bands = fft.getOctaveBands(3);
    let spectrum2 = fft.logAverages(bands);
  for (let i =0; i<6;i++){
    spectrum2.pop();
  }

  const l = spectrum2.length;
  let spectrum4 = [];
  for (let i = 0; i<l; i++){
    spectrum4[i] = spectrum2[l-i];
  }
  let spectrum3 = concat(spectrum4,spectrum2);
  const ac = PI/(l);
  let mult = 0.4;
	//0.0006
  let r = 90;
	//windowWidth*0.12
  let colors = [ [128, 0, 128], [176, 38, 255], [199, 36, 177]];
  let loops = [1, 0.8, 0.6];
  for (let j = 0; j<3; j++){
    fill(colors[j][0], colors[j][1], colors[j][2]);
    beginShape();
    for (let i = 0; i < l*2; i++) {
      let x = (r+spectrum3[i]*mult)*loops[j]*cos(i*ac+angle);
      let y = (r+spectrum3[i]*mult)*loops[j]*sin(i*ac+angle);
      vertex(x,y);
    }      
    endShape();
  }
  console.log(spectrum2,reverse(spectrum2));
  angle+=0.001;
}
function toggle() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}