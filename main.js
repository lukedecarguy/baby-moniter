var img="";
var status="";
var objects=[];
function preload(){
}
function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status:detecting baby";
}
function draw(){
    image(video, 0, 0, 380, 380);
    if (status!="")
    {
        objectDetector.detect(video,gotResult);
        r = random(255);
        g = random(255);
        b = random(255);
        for(i = 0; i < objects.length; i++){

        
        if(objects[i].label == "person")
        {
            document.getElementById("status").innerHTML = "status = object detected";
            document.getElementById("Baby_found").innerHTML = " baby found";
            fill(r, g, b); 
            text("baby" + " "  , objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        else{
            document.getElementById("status").innerHTML = "status = object detected";
            document.getElementById("Baby_found").innerHTML = " baby not found";
        }
         

    }
    
}
}
function modelLoaded(){
    console.log("model loaded!");
    status = true;
    objectDetector.detect(video,gotResult);
}
function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}