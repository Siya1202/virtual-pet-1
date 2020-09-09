//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock;



function preload() {
  //load images here
  dog=loadImage("images/dogimg.png");
  
  happyDog=loadImage("images/dogImg1.png");
  
}

function setup() {
  database=firebase.database();

	createCanvas(500,500);
  dog=createSprite(150,200,20,20);
  dog.scale=0.1;
  happyDog.scale=0.3;
  
  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
}


function draw() {
  background(46,139,87); 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }


  drawSprites();
  //add styles here
  textSize(15);
  fill("white");
  text("Note : press UP_ARROW to feed Drago MILK",50,150);

}

function readStock(data) {
  foodS=data.val();
}

function writeStock(x) {
  if(x<=0){
    x=0;
  } else {
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}