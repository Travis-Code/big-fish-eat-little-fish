//basic template by TRAVIS H (BOOM)
//"dreams don't come true without a lot of failure... and Hope."

var game;

window.onload = function(){
	game = new Phaser.Game(960, 640, Phaser.AUTO, "");
	game.state.add("Boot",boot);
	game.state.add("Preload", preload);
	game.state.add("TitleScreen", titleScreen);
	game.state.add("PlayGame", playGame);
	// game.state.add("GameOverScreen", gameOverScreen);
	// game.state.add("Win", winStateScreen);
	game.state.start("Boot");
}

var boot = function(game){};
boot.prototype = {
	preload: function(){
		this.game.load.image("loading","assets/loading.png");
		this.game.load.image("fish","assets/fish.png");
		this.game.load.image("blueFish","assets/blueFish.png");
		this.game.load.image("ground","assets/ground.png");
	},

	create: function(){
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		console.log("game started");
		game.state.start("Preload");
	}
}

var preload = function(game){};
preload.prototype = {
	preload: function(){
		var loadingBar = this.add.sprite(game.width/2, game.height/2,"loading");
		loadingBar.anchor.setTo(0.5);
		game.load.setPreloadSprite(loadingBar); 
	},

	create: function(){
		game.state.start("TitleScreen");
	}
}

var titleScreen = function(game){};
titleScreen.prototype = {
	create:function(){
		console.log("hello TitleScreen")
		game.state.start("PlayGame");
	}
}

var playGame = function(game){};
playGame.prototype = {
	create:function(){
		this.eatValue =0;
		this.loadEnemyLeft();

		// this.eaten = 0;
		// this.scaleFishy = 110;
		// this.randomFish = Math.random()*5;
		// this.randomBlueFishSize = Math.random()*2;
		// this.randomSpawnWidth = Math.floor((Math.random() * game.world.width) - 10);
		 // this.randomSpawnHeight = Math.floor((Math.random() * game.world.height) - 10);

//for loop test--------------------------------------
		// var testing =[1,2,3,4,5];
		// var total = 0;

		// for (var i = 0; i < testing.length; i++) {
		// 	console.log(testing.length);
		// 	// console.log(testing[i]); 
		// 	total = total + testing[i];
		// }
		// console.log("the sum of the array is " + total);
		// var avg = total / testing.length;
		// console.log("array's average is "+ avg + " because " + total + " / " + testing.length);

//The score------------------------------------------------
		// var style = { font: "65px Helvetica", fill: "#ff0044", align: "center" };
	 //    var text = game.add.text(game.world.width/3, game.world.height/4, "eaten:"+ this.eaten , style);
	 //    text.anchor.set(0.5);

//ground-----------------------------------------------------
		this.ground = this.add.sprite(game.width/2, game.height-100,"ground");
  		game.physics.arcade.enable(this.ground);
  		this.ground.body.allowGravity = false;
    	this.ground.body.immovable = true;

//PLAYER FISH------------------------------------------------
		this.fish = this.add.sprite(game.width/2, game.height/3,"fish");
	    this.fish.anchor.set(0.5);
	    game.physics.arcade.enable(this.fish);
	   	this.fish.body.collideWorldBounds=true;
	},


update:function() {

//COLLISIONS-----------------------------------------------------
		// this.game.physics.arcade.overlap(this.fish, this.enemyFish);
		this.game.physics.arcade.overlap(this.fish, this.enemyFish, null, function(fish, enemy) {
            

            console.log("hit");
            enemy.kill();
            fish.scale.x += .5;
            fish.scale.y += .5;
            this.eatValue +=1;

            if(this.eatValue >= 5){
            	console.log("ate 5 fish!");
            }

            if(this.fish.width >= 96){
            	this.fish.scale.x = -10;
            	this.fish.scale.y = -10;
            }

        }, this);

		console.log(this.fish.width);

//CONTROLS-------------------------------------------------------------------------------------
	    //  If the sprite is > 8px away from the pointer then let's move to it
	    if (game.physics.arcade.distanceToPointer(this.fish, game.input.activePointer) > 8){
	        //  Make the object seek to the active pointer (mouse or touch).
	        game.physics.arcade.moveToPointer(this.fish, 300);
	    }else{
	        //  Otherwise turn off velocity because we're close enough to the pointer
	        this.fish.body.velocity.set(0);
	    }

    	this.enemyFish.forEach(function(element) {
	        if (element.x >= this.game.width) {
	            element.kill();
	        }
        }, this);
	},
	
//FUNCTIONS-------------------------------------------------------
	loadEnemyLeft:function(){
		this.enemyFish = this.add.group();
        this.enemyFish.enableBody = true;
        this.createEnemyFishLeft();
        this.superFishCreator = this.game.time.events.loop(Phaser.Timer.SECOND * 3, this.createEnemyFishLeft, this);
	},
 	
	createEnemyFishLeft: function() {
        //get the first dead sprite.
        var singleEnemyFish = this.enemyFish.getFirstExists(true);
        var randomSpawnHeight = Math.floor((Math.random() * game.world.height));

        if (!singleEnemyFish) {
            singleEnemyFish = this.enemyFish.create(0, 0, "blueFish");
    	}

        // singleEnemyFish.animations.add("fire", [0, 1, 2, 3], 12, true);
        // singleEnemyFish.scale.x = -1;
        // singleEnemyFish.play("fire");
        // singleEnemyFish.body.collideWorldBounds = true;
        singleEnemyFish.body.bounce.set(1, 0);

        //{"x": 5804, "y": 200}
        //singleEnemyFish.reset(this.levelData.soccerBallspawn.x, this.levelData.soccerBallspawn.y);
        singleEnemyFish.reset(-68 , randomSpawnHeight);
        singleEnemyFish.body.velocity.x = 555;
    },

//FISH SCALE not working--------------------------------------------------
	tooBigFish:function(){
		if (this.fish.scale.x >= 8){
			// this.fish.scale.x = 10;
			// this.fish.scale.y = 10;
			console.log("too big");
		}
	},
}

// var gameOverScreen = function(game){};
// titleScreen.prototype = {
// 	create:function(){

// 		console.log("hello win");
// 		game.state.start("Win");

// 	}
// }

// var winScreen = function(game){};
// titleScreen.prototype = {
// 	create:function(){

// 		console.log("hello PlayGame");
// 	}
// }


