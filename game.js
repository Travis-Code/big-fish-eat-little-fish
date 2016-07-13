//basic template by TRAVIS H (BOOM)
//"dreams don't come true without a lot of failure... and Hope."

var game;

window.onload = function(){
	game = new Phaser.Game(640, 960, Phaser.AUTO, "");
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
		
		this.eaten = 0;
		this.scaleFishy = 110;
		this.randomFish = Math.random()*5;
		this.randomBlueFishSize = Math.random()*2;

//The score------------------------------------------------
		var style = { font: "65px Helvetica", fill: "#ff0044", align: "center" };
	    var text = game.add.text(game.world.width/3, game.world.height/4, "eaten:"+ this.eaten , style);
	    text.anchor.set(0.5);

//The baddies------------------------------------------------
	    this.badFishes = game.add.group();
	    this.badFishes.enableBody = true;
	    this.badFishes.physicsBodyType = Phaser.Physics.ARCADE;
	    // this.createBadFish();

	    // this.badFishes = this.game.time.events.loop(Phaser.Timer.SECOND * 5, this.createBarrel, this)

//blue fish-------------------------------------------------

		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.blueFish = this.add.sprite(game.width/2, game.height/2,"blueFish");
  		game.physics.arcade.enable(this.blueFish);
  		this.blueFish.scale.setTo(this.randomBlueFishSize, this.randomBlueFishSize);
 		
 		game.time.events.add(Phaser.Timer.SECOND * 4, this.addBlueFish, this);

		
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

		console.log(this.randomFish);

	},

	update:function() {

		this.blueFish.x += .08;
		if (this.blueFish.x >= game.width + this.blueFish.width){
			this.blueFish.destroy();
		}

		game.physics.arcade.collide(this.fish, this.ground);
    	game.physics.arcade.overlap(this.fish, this.blueFish, this.playerAndBlueCollide, null, this);






//CONTROLS-------------------------------------------------------------------------------------
	    //  If the sprite is > 8px away from the pointer then let's move to it
	    if (game.physics.arcade.distanceToPointer(this.fish, game.input.activePointer) > 8){
	        //  Make the object seek to the active pointer (mouse or touch).
	        game.physics.arcade.moveToPointer(this.fish, 300);
	    }else{
	        //  Otherwise turn off velocity because we're close enough to the pointer
	        this.fish.body.velocity.set(0);
	    }
	},

	playerAndBlueCollide: function() {
	    //console.log(this.randomFish);
	    if(this.fish.width <= this.blueFish.width){
	    	this.fish.scale.setTo(this.fish.scale.x+ 1, this.fish.scale.y+ 1);
	    	this.blueFish.destroy();

	    } else{
	    	console.log(this.eaten);
			this.fish.scale.setTo(this.fish.scale.x+ 1, this.fish.scale.y+ 1);
	    	this.blueFish.destroy();
	    }
	 },

	descend:function() {
	    this.badFishes.body.y += 110;
	},

	addBlueFish:function(){
		// var randomValue = game.rnd.integerInRange(0, 25);
		this.newBlueFish = this.add.sprite(game.width/2, game.height/2,"blueFish");
  		game.physics.arcade.enable(this.newBlueFish);
  		this.newBlueFish.scale.setTo(this.randomBlueFishSize, this.randomBlueFishSize);

	},


	createBadFish:function() {
	    for (var y = 0; y < 4; y++){
	        for (var x = 0; x < 10; x++)
	        {
	            this.badFishCreate = this.badFishes.create(x * 75, y * 75, 'fish');
	            this.badFishCreate.anchor.setTo(0.5, 0.5);
	            //this.badFishCreate.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
	            //this.badFishCreate.play('fly');
	            this.badFishCreate.body.moves = false;
	        }
	    }
	    this.badFishes.x = 100;
	    this.badFishes.y = 50;
	    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
	    var tween = game.add.tween(this.badFishes).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
	    //  When the tween loops it calls descend
	    tween.onLoop.add(this.descend, this);
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


