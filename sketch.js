var bg1, bg2, bg3;
var girl, girlImg, girlImgleft, girlStillRImg, girlStillLImg;
var coin, coinImg;
var mushroom, mushroomImg;
var ig1, ig2, ig3, ig4, ig5, ig6, ig7, ig8, ig9;
var coin1, coin2, coin3, coin4, coin5, coin6, coin7, coin8, coin9, coin10, coin11, coin12, coin13, coin14, coin15;
var diamond, diamondImg, diamond2Img;
var coinsGroup, coinsGroup2;
var score=0;
var gameState=0;
var positions = [{x:400,y:430},{x:450,y:330},{x:530,y:330}, {x:610,y:330}, {x:150,y:300}, {x:280,y:300},{x:450,y:190},{x:350,y:190},{x:400,y:430},{x:50,y:100},{x:100,y:100},{x:150,y:100},{x:520,y:120},{x:590,y:120},{x:750,y:480} ];
var fishImg, sharkImg;
var fish;
var bird, birdImg, airplaneImg;

function preload(){
  bg1 = loadImage("images/forestbg.jpg");
  girlImg = loadAnimation("images/g1.png", "images/g2.png",  "images/g3.png");
  coinImg = loadImage("images/coin.png");
  mushroomImg = loadImage("images/obstacle1.png");
  diamondImg = loadAnimation("images/d1.png","images/d6.png","images/d12.png" );
  diamond2Img= loadImage("images/d1.png")

  girlImgleft = loadAnimation("images/g1left.png", "images/g2left.png", "images/g3left.png");
  girlStillRImg = loadAnimation ("images/g2.png");
  girlStillLImg = loadAnimation ("images/g2left.png");


  fishImg = loadAnimation("images/f1.png", "images/f2.png", "images/f3.png");
  bg2Img = loadImage("images/seabg.jpg");
  sharkImg = loadImage("images/obstacle2.png");

  birdImg = loadAnimation("images/p1.png", "images/p2.png", "images/p4.png");
  bg3Img = loadImage("images/skybg.jpg");
  airplaneImg = loadImage("images/obstacle3.png");

}

function setup() {
  createCanvas(900,600);

  girl = createSprite(150, 440, 50, 50);
  girl.addAnimation("running", girlImg);
  girl.addAnimation("left", girlImgleft);
  girl.addAnimation("stillL", girlStillLImg);
  girl.addAnimation("stillR", girlStillRImg);
  //girl.addAnimation("fish", fishImg);
  girl.changeAnimation("running");
  

  diamondImg.frameDelay = 7;
  diamond = createSprite(780,100,10,10);
  diamond.addAnimation("moving", diamondImg);
  diamond.scale = 0.8;

  ig1 = createSprite(100, 510, 250, 0.1);
  ig2 = createSprite(530, 465, 240, 10);
  ig3 = createSprite(540, 400, 120, 80);
  ig4 = createSprite(400, 220, 50, 10);
  ig5 = createSprite(560, 160, 50, 10);
  ig6 = createSprite(120, 175, 140, 80);
  ig7 = createSprite(220, 330, 120, 10);
  ig8 = createSprite(750, 514, 100, 10);
  ig9 = createSprite(820, 190, 150, 120);

  ig1.visible = false;
  ig2.visible = false;
  ig3.visible = false;
  ig4.visible = false;
  ig5.visible = false;
  ig6.visible = false;
  ig7.visible = false;
  ig8.visible = false;
  ig9.visible = false;

  coinsGroup = new Group();
  coinsGroup2= new Group();
  sharkGroup= new Group();
  diamond2Group= new Group();
  airplaneGroup = new Group();


  spawnCoins(positions);


 edges = createEdgeSprites();

 fish=createSprite(200,300,100,100)
fish.addAnimation("fishimg", fishImg);
fish.scale=0.5;

bird = createSprite(200,300,100,100);
birdImg.frameDelay = 6;
bird.addAnimation("flyingimg", birdImg);
bird.scale = 0.5;



}

function draw() {
  background(255,255,255); 

  if(gameState===0){

   image (bg1, 0, 0, width, height)

   girl.scale= 0.28;

   if(keyDown(RIGHT_ARROW)){
     girl.x= girl.x + 5;
     girl.changeAnimation("running")
 }


 if(keyDown(LEFT_ARROW)){
  girl.x= girl.x - 5;
  girl.changeAnimation("left");
}



if(keyDown(UP_ARROW)){
  girl.velocityY = - 7;
}

girl.velocityY = girl.velocityY + 0.5;

girl.collide(ig1);
girl.collide(ig2);
girl.collide(ig3);
girl.collide(ig4);
girl.collide(ig5);
girl.collide(ig6);
girl.collide(ig7);
girl.collide(ig8);
girl.collide(ig9);
girl.collide(edges[1]);
girl.collide(edges[2]);
girl.collide(edges[3]);
girl.collide(edges[0]);

girl.isTouching(coinsGroup, function(collector, collected){ 
  collected.remove();
  score = score + 5;
})

if(girl.isTouching(diamond)){ 
  score = score + 25;
  diamond.remove();
}

if(score===100){
  gameState=1;
  console.log("gameState1")
}

fish.visible= false;
bird.visible= false;

}

else if(gameState===1){
 image(bg2Img, 0,0,900,600);

girl.destroy();

fish.visible=true;
bird.visible= false;

// girl.changeAnimation("fish");
 //girl.x= 200;
 //girl.y=300;
 //girl.scale=0.5;

if(keyDown("w")){
  fish.y=fish.y-5;
}

if(keyDown("s")){
  fish.y=fish.y+5;
}

 //spawnObstacles();
 spawnThings(sharkImg, 0.5, 300, sharkGroup);
 spawnThings(coinImg, 0.09, 200, coinsGroup2);
 spawnThings(diamond2Img, 0.8, 700, diamond2Group);

 fish.isTouching(coinsGroup2, function(collector, collected){
   collected.remove();
   score= score+ 5;
 })

 fish.isTouching(sharkGroup, function(collector, collected){
   collected.remove();
   score= score - 20;
 })

 fish.isTouching(diamond2Group, function(collector, collected){
  collected.remove();
  score= score + 20;
})

if(score>=200){
  gameState=2;
  console.log("gameState2");
  sharkGroup.destroyEach();
}
}

if(gameState===2){
  fish.destroy();
  image(bg3Img, 0, 0, 900, 600);

  bird.visible= true;
  
  if(keyDown("w")){
    bird.y=bird.y-6;
  }
  
  if(keyDown("s")){
    bird.y=bird.y+6;
  }

  spawnThings(airplaneImg, 0.5, 300, airplaneGroup);
  spawnThings(coinImg, 0.1, 200, coinsGroup2);
  spawnThings(diamond2Img, 0.8, 700, diamond2Group);

  bird.isTouching(diamond2Group, function(collector, collected){
    collected.remove();
    score= score + 20;
  })

  bird.isTouching(coinsGroup2, function(collector, collected){
    collected.remove();
    score= score+ 5;
  })

  bird.isTouching(airplaneGroup, function(collector, collected){
    collected.remove();
    score= score - 30;
  })

}

 drawSprites();

 textSize(20);
 fill ("black")
 text("Score:" + score, 800,50);
}

function spawnCoins(positions =[]){
  for(var i=0; i<15; i++){
  var x,y
  x= positions[i].x;
  y= positions[i].y;

  coin1 = createSprite(x, y, 10, 10);
  coin1.addImage(coinImg);
  coin1.scale=0.05;

  coinsGroup.add(coin1);
  }
 

}

function spawnObstacles(){
  if(frameCount%300===0){
    shark= createSprite(1000, random(20, 550), 100,50);
    shark.addImage(sharkImg);
    shark.scale = 0.5
    shark.velocityX=-5;
  }
}

function spawnThings(img, scale, fc, spGroup){
  if(frameCount%fc===0){
sp= createSprite(1000,random(20,550), 100,50);
sp.addImage(img);
sp.scale=scale;
sp.velocityX= -(5 + score/100);
spGroup.add(sp);
  }
}