var opponentGroup,bulletGroup; 
var live;
var playerLive=4;
var gameState="play";
var score=0;
var nextlevel;
function preload()
{
bg=loadImage("bg.jpg")
playerimg=loadImage("player.png")
opponentimg=loadImage("opponent.png")
destroyimg=loadImage("destroy.png")
playerBulletImg=loadImage("playerbullet.png")
oppbulletimg=loadImage("opponentbullet.png")
liveimg=loadImage("lives.png")
nextlevelimg=loadImage("nextLevel.png")
}

function setup() {
	createCanvas(1200,700);

	player=createSprite(1100,350,50,50)
	player.addImage(playerimg)
	player.scale=0.4;

	live1=createSprite(960,650,30,30)
	live1.addImage(liveimg)
	live1.scale=0.3;

	live2=createSprite(1030,650,30,30)
	live2.addImage(liveimg)
	live2.scale=0.3;

	live3=createSprite(1100,650,30,30)
	live3.addImage(liveimg)
	live3.scale=0.3;

	live4=createSprite(1170,650,30,30)
	live4.addImage(liveimg)
	live4.scale=0.3;

	nextlevel=createSprite(600,400,30,30)
	nextlevel.addImage(nextlevelimg);
	nextlevel.visible=false;

	opponentGroup=new Group();
	bulletGroup=new Group();
	opponentBulletGroup=new Group();
}


function draw() {
 background(bg)

 if(keyDown(UP_ARROW)){
	 player.y=player.y-10;
 }
 if(keyDown(DOWN_ARROW)){
	player.y=player.y+10;
}
if(keyWentDown("space")){
	releaseBullets();
}

for(var i=0;i<opponentGroup.length;i++){
	if(opponentGroup.get(i).isTouching(bulletGroup)){
		opponentGroup.get(i).addImage(destroyimg);
		opponentGroup.get(i).velocityX=0;
	}
}

for(var i=0;i<opponentBulletGroup.length;i++){
	if(opponentBulletGroup.get(i).isTouching(player)){
	playerLive--;
	switch(playerLive){
		case 0 : live1.destroy()
		live2.destroy();
		live3.destroy();
		live4.destroy();
		break;
		case 1 : live2.destroy()
		live3.destroy();
		live4.destroy();
		break;
		case 2: live3.destroy();
		live4.destroy();
		break;
		case 3:live4.destroy();
		break;
		default:break
	}
	opponentBulletGroup.get(i).destroy();
	}
}

if(opponentBulletGroup.isTouching(bulletGroup)){
	bulletGroup.destroyEach();
	opponentBulletGroup.destroyEach();

	}


if(playerLive===0){
	gameState="end";
}

if(gameState==="end"){
background(0);
player.destroy();
opponentGroup.setVelocityXEach(0);
opponentBulletGroup.setVelocityXEach(0);
nextlevel.visible=true;
opponentGroup.destroyEach();
}

if(gameState==="play"){
	spawnTank();
	releaseOpponentBullets();
	score=score+Math.round(getFrameRate()/60)
	}

textSize(30)
strokeWeight(3)
text("Your Score is: "+score,850,70)

 drawSprites();

}


function spawnTank(){
	if(frameCount%260===0){
	var opponent=createSprite(50,random(50,650),20,20)
	opponent.addImage(opponentimg)
	opponent.velocityX=2;
	opponent.scale=0.5;
	opponent.lifetime=350;
	opponentGroup.add(opponent);
	
	}
}

function releaseBullets(){
	if(gameState==="play"){
	var bullet=createSprite(player.x,player.y,20,5)
	bullet.addImage(playerBulletImg)
	bullet.velocityX=-6;
	bullet.scale=0.3;
	bullet.setCollider("rectangle",0,0,20,10)
	bullet.lifetime=200;

	bulletGroup.add(bullet);
	}
}

function releaseOpponentBullets(){

		for(var i=0;i<opponentGroup.length;i++){
			if(frameCount%310===0){
				var oppbullet=createSprite(opponentGroup.get(i).x,opponentGroup.get(i).y,20,10)
				oppbullet.addImage(oppbulletimg);
				oppbullet.velocityX=5;
				oppbullet.scale=0.2;
				oppbullet.setCollider("rectangle",0,0,20,10)
				
				opponentBulletGroup.add(oppbullet)
			}
		}
}