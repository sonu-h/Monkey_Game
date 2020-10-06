//created global variables 
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var ground
//initialized survival_time value
var survival_time=0


function preload(){
  
 //loaded monkey_running animation 
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
//loaded banana image 
  bananaImage = loadImage("banana.png");
//loaded obstacle image 
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
//created canvas
  createCanvas(600,600);
//created ground sprite, and gave velocityX
  ground=createSprite(0,600,600,50);
  ground.velocityX=2;
//created monkey sprite 
 monkey=createSprite(200,500);
 monkey.addAnimation("hop",monkey_running);
 monkey.scale=0.25;
//created food group 
  FoodGroup = new Group();
//created obstacle group 
  obstacleGroup = new Group();
}
function food(){
  //when frameCount is a multiple of 80, banana sprite is created 
  if(frameCount%80===0){
    banana=createSprite(200,200);
    banana.y=Math.round(random(10,200));
  //displays banana sprite
banana.addImage("fruit", bananaImage);
    banana.scale=0.2
    banana.velocityX=-5
//sets lifetime for banana 
    banana.lifetime=150;
//adds banana sprite to food group
    FoodGroup.add(banana);
  }
}
function obstacles(){
//when frameCount is a multiple of 300, obstacle sprite is created
  if(frameCount%300===0){
    obstacle=createSprite(300,300);
    obstacle.y=Math.round(random(500,550));
    //displays obstacle sprite
obstacle.addImage("rock", obstacleImage);
    obstacle.scale=0.2
    obstacle.velocityX=-5
//sets obstacle lifetime
    obstacle.lifetime=150;
//adds obstacle sprite to obstacle group
    obstacleGroup.add(obstacle);
  }
}

function draw() {
//sets background to white 
  background("white");
//displays survival_time
  text("Survival Time: "+ survival_time, 400,50);
//sets survival_time
  survival_time=survival_time+Math.round(frameCount/60);
//allows monkey to jump
  if(keyDown("space") && monkey.y>=500) {
    monkey.velocityY= -2;
  }
//stimulates gravity
 monkey.velocityY = monkey.velocityY + 0.8;
//creates infinate ground 
  if(ground.x>ground.width /2){
   ground.x = ground.width /2
  }
//if the monkey hits an obstacle, then sprite is destroyed and the velocity is reset to 0
  if(monkey.isTouching(obstacleGroup)){
    obstacleGroup.setVelocityXEach(0);
    ground.velocityX=0
  }
//if the monkey hits an banana, then sprite is destroyed and the velocity is reset to 0
  if(monkey.isTouching(FoodGroup)){
    banana.velocityX=0
    banana.visible=false
  }
//makes sure monkey doesn't pass through the ground
  monkey.collide(ground);
//calls food function
  food();
//calls obstacles function
  obstacles();
//calls everything in the draw function 
  drawSprites();
}






