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
titleScreen.prototype = {
	create:function(){

		this.randomFish = Math.random()*5;

	 	// The baddies!
	    this.badFishes = game.add.group();
	    this.badFishes.enableBody = true;
	    this.badFishes.physicsBodyType = Phaser.Physics.ARCADE;
	    this.createBadFish();

	    //this.badFishes = this.game.time.events.loop(Phaser.Timer.SECOND * 5, this.createBarrel, this)


		game.physics.startSystem(Phaser.Physics.ARCADE);
		var ground = this.add.sprite(game.width/2, game.height-100,"ground");
		this.fish = this.add.sprite(game.width/2, game.height/2,"fish");
	    this.fish.anchor.set(0.5);
	    game.physics.arcade.enable(this.fish);
		console.log("hello PlayGame");
		console.log(this.randomFish);

	},

	update:function() {
	    //  If the sprite is > 8px away from the pointer then let's move to it
	    if (game.physics.arcade.distanceToPointer(this.fish, game.input.activePointer) > 8){
	        //  Make the object seek to the active pointer (mouse or touch).
	        game.physics.arcade.moveToPointer(this.fish, 300);
	    }else{
	        //  Otherwise turn off velocity because we're close enough to the pointer
	        this.fish.body.velocity.set(0);

	    }
	},

	descend:function() {
	    this.badFishes.y += 110;
	},

	createBadFish:function() {
	    for (var y = 0; y < 4; y++){
	        for (var x = 0; x < 10; x++)
	        {
	            this.alien = this.badFishes.create(x * 68, y * 68, 'fish');
	            this.alien.anchor.setTo(0.5, 0.5);
	            //this.alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
	            //this.alien.play('fly');
	            this.alien.body.moves = false;
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


