var marioImg,bgImage,brickImg,checkPointsound;                                            
var collided,dieSound,gameOverImg,groundImg;                                      
var ground , mario , jump,obstacleGroup,brickGroup;                                                        
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;


function preload(){
  bgImg       = loadImage("bg.png");
  brickImg    = loadImage("brick.png");
  groundImg   = loadImage("ground2.png");
  marioImg    = loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
  obstacleImg = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png");
  jump        = loadSound("jump.mp3");
}

function setup(){
 canvas = createCanvas(1200,600);
 ground = createSprite(600,550,600,20);
 ground.addImage("ground",groundImg);
 ground.velocityX = -3; 
 mario = createSprite(100,200,20,20);
 mario.addAnimation("mario",marioImg);
 mario.scale = 3;
 mario.setCollider("circle",0,0,8);
 mario.debug = true;
 obstacleGroup = new Group();
 brickGroup = new Group();
 
}    
function draw(){
   background(bgImg);
   drawSprites();  
   if(gameState === PLAY){
   if(ground.x<0){
       ground.x=ground.width/2;                                        
   }                                                                  
   if(keyDown("Space")&&mario.y>400){
       mario.velocityY = -15; 
       jump.play();
       
   }
   mario.velocityY = mario.velocityY + 1
   for(var i = 0; i<brickGroup.length;i++){
   if(brickGroup.get(i).isTouching(mario)){
     brickGroup.get(i).remove();
     score =  score + 1 ;
     
   }

   }
   spawnObstacles();
   spawnBricks();
   if(obstacleGroup.isTouching(mario)){
    gameState = END

  }
} 
  else if(gameState === END){
    obstacleGroup.velocityX = 0;
    brickGroups.velocityX = 0;
    ground.velocityX = 0;
  }
  mario.collide(ground);
       
          
}
function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(400,475,10,40);
    obstacle.velocityX = -6;
    obstacle.addAnimation("obstacle",obstacleImg);
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 1.5;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
 
  }
}
function spawnBricks() {
  if(World.frameCount % 70 === 0) {
    var brick = createSprite(random(370,430),random(275,305),10,40);
    brick.velocityX = -6;
    brick.addImage("collectigthign",brickImg);
    //assign scale and lifetime to the obstacle           
    brick.scale = 1.5;
    brick.lifetime = 70;
    //add each obstacle to the group
    brickGroup.add(brick);
 
  }
}


