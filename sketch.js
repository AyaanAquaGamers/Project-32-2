const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var score=0

var gameState = "onSling";

function preload() {
 getBackgroundImg()


}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    score=0

  //  bg=createSprite(600,200,1200,400)
    //bg.addImage(bgImage)



    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);


    bird = new Bird(10,50);   

    slingshot = new SlingShot(bird.body,{x:110, y:130});

    

    //log6 = new Log(230,180,80, PI/2);
    
}

function draw(){
    if(backgroundImg)
    background(backgroundImg);
    noStroke()
    textSize(35)
    fill("white")
    text("score "+score,width-300,50)
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score()
    log1.display();
    box3.display();
    box4.display();
    pig3.display();
    pig3.score()
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    slingshot.display();   
    bird.display();
    platform.display();
    //log6.display();
    
 
    
}

function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    //}
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32&&bird.body.speed<1){
        bird.trajectory=[]
      slingshot.attach(bird.body);
      Matter.Body.setPosition(bird.body,{x:200,y:50})

    }
}

async function getBackgroundImg(){
    var response=await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata ")
    var responseJSON=await response.json()
    var dateTime=responseJSON.datetime
    var hour=dateTime.slice(11,13)
    if (hour>6&&hour<=8){
        bg="sunrise1.png"
    } 
    if(hour>8&&hour<=10){
       bg="sunrise2.png"
    }
    if (hour>10&&hour<=12){
        bg="sunrise3.png"
    } 
    if(hour>12&&hour<=14){
       bg="sunrise4.png"
    }
    if (hour>14&&hour<=16){
        bg="sunrise5.png"
    } 
    if(hour>16&&hour<=18){
       bg="sunrise6.png"
    }
    if (hour>18&&hour<=20){
        bg="sunset7.png"
    } 
    if(hour>20&&hour<=22){
       bg="sunset8.png"
    }
    if (hour>22&&hour<=24){
        bg="sunset9.png"
    } 
    if(hour>24&&hour<=2){
       bg="sunset10.png"
    }
    if(hour>2&&hour<=4){
        bg="sunset11.png"
     }
     if(hour>4&&hour<=6){
        bg="sunset12.png"
     }
    backgroundImg=loadImage(bg)
}