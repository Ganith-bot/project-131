function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', ModelLoaded);
}

function ModelLoaded(){
  console.log('started identifying.')
}

function draw(){
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResult);
}

var previousResult = "";

function gotResult(error, results){
  if(error){
    console.log('Error!');
    console.error(error);
  }
 else{
  if((results[0].confidence > 0.5) && (previousResult != results[0].label)){
    console.log(results);
    previousResult = results[0].label;
    synth = window.speechSynthesis;
    speak = "Object Detected is" + results[0].label;
    utterThis = new SpeechSynthesisUtterance(speak);
    synth.speak(utterThis);
    document.getElementById("label_name").innerHTML=results[0].label;
    document.getElementById("confidence_number").innerHTML=results[0].confidence.toFixed(3);
  }
 }
}