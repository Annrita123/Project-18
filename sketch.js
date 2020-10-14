var bananaimage,banana;
var obstacleimage,obstacle;
var monkey_running,monkey;
var bg,bg1;
var invisibleground;
var score;

function preload() {
  bg1=loadImage("jungle.jpg");
  monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaimage=loadImage("banana.png");
  obstacleimage=loadImage("stone.png");
}                       


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  bg=createSprite(300,260,windowWidth,windowHeight);
  bg.addImage(bg1);
  
  monkey=createSprite(80,420,40,130)
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  monkey.setCollider("rectangle",0,0,300,600);
  monkey.debug = false;
  
  invisibleground=createSprite(300,470,600,20);
  invisibleground.visible=false;
  
  bananagroup = new Group();
  obstaclegroup=new Group();
  
   score = 0;
}
function draw() {
  background(220);
  
  monkey.collide(invisibleground);
  
   
  
  bg.velocityX=-4;
  if(bg.x<200){
    bg.x=bg.width/2;
  }
  
  if(touches.length > 0 || keyDown("space")&&monkey.y>=361){
    monkey.velocityY=-18 ;
    touches = [];
  }
   monkey.velocityY = monkey.velocityY + 0.8
  
  if(bananagroup.isTouching(monkey)){
    bananagroup.destroyEach();
    score=score+2;
  }
  
  if(obstaclegroup.isTouching(monkey)){
    bg.velocityX=0;
    monkey.velocityX=0;
    obstaclegroup.setLifetimeEach(-1);
    bananagroup.setLifetimeEach(-1);
     monkey.scale=0.1;
     obstaclegroup.setVelocityXEach(0);
     bananagroup.setVelocityXEach(0);    
  }
  
  switch(score){
    case 10:
      monkey.scale=0.12;
      break;
      case 20:
      monkey.scale=0.14;
      break;
      case 30:
      monkey.scale=0.16;
      break;
      case 40:
      monkey.scale=0.18;
      break;
      default:
      break;
  }
  
  spawnbanana();
  spawnobstacles();
 

  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score :"+score,500,50);
}

function spawnbanana(){
   if (frameCount % 160 === 0) {
  banana=createSprite(600,200,50,50);
     banana.addImage(bananaimage);
   banana.scale=0.1;
     banana.velocityX=-5;
     banana.lifetime=150;
     bananagroup.add(banana);
   }
}

function spawnobstacles(){
   if (frameCount % 160 === 0) {
  obstacle=createSprite(600,430,50,50);
     obstacle.addImage(obstacleimage);
   obstacle.scale=0.2;
     obstacle.velocityX=-5;
     obstacle.lifetime=150;
    obstaclegroup.add(obstacle);
  
}
}
