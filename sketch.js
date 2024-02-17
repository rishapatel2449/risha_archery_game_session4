var splashScreen
var playbutton
var gameState="wait"
var bg
var bgl2
var player
var player_img
var board
var boardl2
var board_img
var arrow, arrow_img, arrowGroup;
var numberOfArrows=10;
var score=0;

function preload(){
splashScreen=loadImage("assets/splash.gif")
bg=loadImage("assets/archery_bg.jpeg")
player_img=loadImage("assets/archer.png")
board_img=loadImage("assets/board_2_img.png")
arrow_img = loadImage("assets/arrow.png")
bgl2=loadImage("assets/background.jpeg")
//boardl2_img=loadImage("assets/board_2_img.png")
}

function setup(){
createCanvas(windowWidth,windowHeight)

playbutton = createImg("assets/play_button.png");
    playbutton.position(650, 300);
    playbutton.size(350, 350);
    playbutton.hide();

   aboutbutton = createImg("assets/About_button.png");
   aboutbutton.position(450, 300);
   aboutbutton.size(350, 350);
   aboutbutton.hide();

   player = createSprite(400, 500);
   player.addImage("main", player_img);
   player.scale=0.7;
   player.visible = false;

   board = createSprite(1300, 600);
   board.addImage("board", board_img);
   board.scale=0.7;
   board.visible = false;
   //board.debug = true;
   board.setCollider("rectangle", 0, 0, 30, 300);

   boardl2 = createSprite(1000, 600);
   boardl2.addImage("boardl2", board_img);
   boardl2.scale=0.7;
   boardl2.visible = false;
   //board.debug = true;
   boardl2.setCollider("rectangle", 0, 0, 30, 300);
   

   arrowGroup = new Group();
}

function draw(){
    if (gameState=="wait"){
        background(splashScreen);
        playbutton.show();
        aboutbutton.show();

        aboutbutton.mousePressed(() => {
            playbutton.hide();
            aboutbutton.hide();
            gameState = "about";
    
        })
    }

        if (gameState == "about") {
            aboutgame();
        }
        playbutton.mousePressed(() => {
            aboutbutton.hide();
            playbutton.hide();
            gameState = "play";
    
        })

        if (gameState=="play"){
            background(bg);
            player.visible = true;
            board.visible = true;

            for (var i = 0; i < arrowGroup.length; i++) {
                if (board.isTouching(arrowGroup.get(i))) {
                    score += 5
                    arrowGroup.get(i).remove()
                }
            }

            if (board.y == 600) {
                board.velocityY = -7;
                board.y -= 7;


            }

            if (board.y == 110) {
                board.y = board.y + 7;
                board.velocityY = 7;
            }

            if (score >= 5 && numberOfArrows > 0) {
                gameState = "nextlevelinfo";
                arrowGroup.destroyEach();
                player.visible = false;
                board.visible=false;
    
            }

            if (gameState == "nextlevelinfo") {
                nextlevelpopup();
    
            }


            if(numberOfArrows==0){
                lost();
                arrowGroup.destroyEach();
                player.visible=false;
                board.visible=false;
            }
        }

        if (gameState=="level2"){
            background(bgl2);
            player.y=400
            player.visible = true;
            //board.visible = true;
            boardl2.visible = true;


            for (var i = 0; i < arrowGroup.length; i++) {
                if (boardl2.isTouching(arrowGroup.get(i))) {
                    score += 5
                    arrowGroup.get(i).remove()
                }
            }

            if (boardl2.y == 600) {
                boardl2.velocityY = -7;
                boardl2.y -= 7;


            }

            if (boardl2.y == 110) {
                boardl2.y = board.y + 7;
                boardl2.velocityY = 7;
            }

            if (score >= 50 && numberOfArrows > 0) {
                gameState = "win";
                arrowGroup.destroyEach();
                player.visible = false;
                boardl2.visible=false;
    
            }

            if (gameState == "win") {
                nextlevelpopup();
    
            }


            if(numberOfArrows==0){
                lost();
                arrowGroup.destroyEach();
                player.visible=false;
                board.visible=false;
            }

        }
    

drawSprites();

if (gameState == "play") {
    fill("black");
    textSize(40);
    text("SCORE: " + score, 50, 50);

    fill("black");
    textAlign("center");
    textSize(40);
    text("Remaining Arrows : " + numberOfArrows, 1300, 50);



}
}

function aboutgame() {

    swal({
        title: "About Game === How to Play!!",
        text: "Play an archery game. Click spacebar to release the arrow!!!",
        textAlign: "center",
        imageUrl: "assets/splash.gif",
        imageSize: "200x200",
        confirmButtonText: "Lets Play",
        confirmButtonColor: "brown",
    },
        function () {
            gameState = "wait"
        }

    )


}

function spawnArrows() {

    arrow = createSprite(player.x + 10,440, 20, 20);
    arrow.addImage(arrow_img);
    arrow.scale = 0.2;

    //arrow.debug = true;
    arrow.setCollider("rectangle", 0, 0,arrow.width-10, arrow.height);
    arrow.velocityX = 10;

    arrow.depth = player.depth;
    player.depth = player.depth + 1;

    arrowGroup.add(arrow);


}

function keyReleased() {
    if (keyCode === 32) {
        if (numberOfArrows > 0) {
            spawnArrows();
            numberOfArrows -= 1;
        }
    }
}

function lost() {

    swal({
        title: "You LOST!",
        imageUrl: "assets/game_over.jpeg",
        imageSize: "200x200",
        confirmButtonText: "Try Again",
        confirmButtonColor: "brown",
    },
        function () {
            window.location.reload();
        }

    )


}

function nextlevelpopup() {

    swal({
        title: "HURRAYY!! You have reached Level 2",
        text: "Time for the next level.\n Make a score of 50 to win the game!",
        imageUrl: "assets/levelUp.png",
        imageSize: "200x200",
        confirmButtonText: "Let's Win!",
        confirmButtonColor: "brown",
    },
        function () {

            gameState = "level2"
        }

    )

}

function win() {

    swal({
        title: "You Won!",
        text: "Congratulations you won the game! \n ",
        imageUrl: "assets/win.png",
        imageSize: "200x200",
        confirmButtonText: "Restart",
        confirmButtonColor: "brown",
    },
        function () {
            window.location.reload();
        }
    )
}
