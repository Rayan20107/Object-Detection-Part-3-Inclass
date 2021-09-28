objects=[];

var dogcatimage="";

var percentage="";

var status="";

colourr=Math.floor(Math.random()*256);

colourg=Math.floor(Math.random()*256);

colourb=Math.floor(Math.random()*256);

function preload()
{
    dogcatimage=loadImage("car.jfif");
}

function draw()
{
    image(dogcatimage, 0, 0, 640, 420);
    if (status!="") 
    {
        for (let i = 0; i < objects.length; i++) 
        {
        document.getElementById("status").innerHTML="Status: Object Detected";
        fill(colourr, colourg, colourb);
        percentage=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percentage+"%", objects[i].x+15, objects[i].y+15);
        noFill();
        stroke(colourr, colourg, colourb);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function setup()
{
    canvas=createCanvas(640, 420);
    canvas.center();
    document.getElementById("status").innerHTML="Object detecting";
    objectdetector=ml5.objectDetector("cocossd", modelLoaded);
}

function modelLoaded()
{
    console.log("Model has been loaded");
    status=true;
    objectdetector.detect(dogcatimage, gotResults);
}

function gotResults(error, results)
{ 
    if (error) 
    {
        console.log(error)
    }

    else
    {
        console.log(results);
        objects=results;
    }
}