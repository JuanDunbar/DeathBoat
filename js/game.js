//create the game
var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

var score = 0;
var scoreText;
var platforms;

//create boot state
var boot_state = function(game){};
boot_state.prototype =
{
	preload:function(){
		
	},
	create:function(){
		
	},
	update:function(){
		
	}
}

//create main game state
var game_state = function(game){};
game_state.prototype = 
{
	preload:function(){
		game.load.image('sky', 'assets/sky.png');
	    game.load.image('ground', 'assets/platform.png');
	    game.load.image('star', 'assets/star.png');
	    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	},
	
	create:function(){
		//first lets center our canvas
	    game.stage.scale.pageAlignHorizontally = true;
	
	    //start the physics engine
	    game.physics.startSystem(Phaser.Physics.ARCADE);
	
	    //add a background
	    game.add.sprite(0, 0, 'sky');
	
	    //add a group for ground and platforms
	    platforms = game.add.group();
	    platforms.enableBody = true;
	
	
	    //create the ground
	    var ground = platforms.create(0, game.world.height - 64, 'ground');
	    ground.scale.setTo(2, 2);
	    ground.body.immovable = true;
	
	    //create 2 ledges
	    var ledge = platforms.create(400, 400, 'ground');
	    ledge.body.immovable = true;
	
	    ledge = platforms.create(-150, 250, 'ground');
	    ledge.body.immovable = true;
	
	    //create a player and its settings
	    player = game.add.sprite(32, game.world.height - 150, 'dude');
	    game.physics.arcade.enable(player);
	
	    //add physics properties
	    player.body.bounce.y = 0.2;
	    player.body.gravity.y = 300;
	    player.body.collideWorldBounds = true;
	
	    //animations
	    player.animations.add('left', [0, 1, 2, 3], 10, true);
	    player.animations.add('right', [5, 6, 7, 8], 10, true);
	
	    //create the keyboard inputs
	    cursors = game.input.keyboard.createCursorKeys();
	
	    //create some stars
	    stars = game.add.group();
	    stars.enableBody = true;
	
	    for ( var i = 0; i < 12; i++) {
	        var star = stars.create(i * 70, 0, 'star');
	
	        star.body.gravity.y = 6;
	        star.body.bounce.y = 0.7 * Math.random() * 0.2;
	    }
	
	    //add score and score text
	    scoreText = game.add.text(16, 16, 'score: 0', {fontSize: '32', fill: '#000'});

	},
	
	update:function(){
		//collide the player with the ground and ledges
	    game.physics.arcade.collide(player, platforms);
	    game.physics.arcade.collide(platforms, stars);
	    game.physics.arcade.overlap(player, stars, collectStar, null, null);
	
	    //reset player movement
	    player.body.velocity.x = 0;
	
	    //check for keyboard input
	    if(cursors.left.isDown) {
	        player.body.velocity.x = -150;
	
	        player.animations.play('left');
	    }
	    else if(cursors.right.isDown) {
	        player.body.velocity.x = 150;
	
	        player.animations.play('right');
	    }
	    else {
	        player.animations.stop();
	
	        player.frame = 4;
	    }
	
	    //they can jump if they are on the ground
	    if(cursors.up.isDown && player.body.touching.down) {
	        player.body.velocity.y = -350;
	    }
	}
}

function collectStar(player, star) {
    star.kill();

    //change score
    score += 1;
    scoreText.text = 'score: ' + score;
}

game.state.add('boot_state', boot_state);
game.state.add('game_state', game_state);

game.state.start('game_state');
