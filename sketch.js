var canvas, backgroundImage;
var gameState = 0;
var aircraft,aircraft_image;
var enemyaircraft,enemy_aircraft_image;
var rocketenemy,rocket_enemy_image;
var obstaclesGroup;
var bulletIMG;
//var bullet

function preload(){
backgroundImage = loadImage("images/background2.jpg");
aircraft_image = loadImage("images/aircraftimage.png");
enemy_aircraft_image = loadImage("images/enemyplane.jpg");
rocket_enemy_image = loadImage("images/ro.png");
bulletIMG = loadImage("images/bulletweapon.jpg")
}


function setup(){
  canvas = createCanvas(windowWidth,windowHeight);
  background = createSprite(windowWidth-1000,windowHeight-200,1,1);
  background.addImage(backgroundImage);
  background.scale = 2;
  aircraft = createSprite(windowWidth/2,windowHeight-150);
  aircraft.addImage(aircraft_image);
  aircraft.scale = 0.5;

  score = 0;
  
  obstaclesGroup = new Group();
  bulletGroup = new Group();
  bulletGroup.debug = true;
  
  //background.velocityY = 5;
}


function draw(){
//background(backgroundImage);
//console.log(background.width);
//console.log(background.height);
//console.log(windowWidth);
//console.log(windowHeight);
//console.log(background.y)
aircraft.x = World.mouseX
//
//a = random(1,2);
if(background.y < 400){
background.y = 900;  
}
spawnObstacles();

 if(keyWentDown("space")){
 createbullet();
 
 if(bulletGroup.isTouching(obstaclesGroup)){
 bulletGroup.destroyEach();
 obstaclesGroup.destroyEach();
 obstaclesGroup.setVelocityYEach(0);
 bulletGroup.setVelocityYEach(0);
 score = score+1;  
 }

 if(aircraft.isTouching(obstaclesGroup)){
 score = 0;  
 }
 }

 

drawSprites();

text("Score: "+score, 1200,100);
}

function spawnObstacles(){
  if(frameCount % 100 === 0 ){
    var obstacle = createSprite(random(10,1500),0,10,10)
    obstacle.velocityY = 2; 
    obstacle.scale = 0.1;
    obstacle.setCollider("rectangle",0,0,80,80);
    obstacle.debug = true;
    console.log(obstacle.width);
    console.log(obstacle.height);
    var a = Math.round(random(1,2));
    switch(a){
    case 1: obstacle.addImage(enemy_aircraft_image);
    break; 
    case 2: obstacle.addImage(rocket_enemy_image);
    obstacle.rotation = 180;
    break;   
    default: break
    } 
    obstaclesGroup.add(obstacle);
  }
}

function createbullet(){
  var bullet = createSprite(100,100,10,10);
  bullet.addImage(bulletIMG);
  bullet.x = aircraft.x;
  bullet.y = aircraft.y-80;
  bullet.velocityX = 0;
  bullet.velocityY = -3;
  bullet.scale = 0.1;
  bulletGroup.add(bullet);
  bullet.setCollider("rectangle",0,0,bullet.width,bullet.height);
  bullet.debug = true;
}