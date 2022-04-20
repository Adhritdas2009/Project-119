namex='';
function preload(){
classifier=ml5.imageClassifier('DoodleNet')
}

function setup(){
    canvas = createCanvas(400, 400);
    canvas.center()
    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
}

function draw(){
    image(canvas, 0,0,400,400)
    strokeWeight(7);
    stroke('black');
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult)
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }

    else{
        console.log(results)
        document.getElementById("name").innerHTML=results[0].label;
        confi=results[0].confidence*100;
        document.getElementById("confidence").innerHTML=Math.round(confi) + " % ";
        namex="The sketch drawn is "+results[0].label;
        utter=new SpeechSynthesisUtterance(namex);
        synth.speak(utter)
    }
}

function clearc(){
    background('white');
}

