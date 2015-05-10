//create the game

define(['phaser'], function(phaser) {

    var score = 0;
    var scoreText;
    var platforms;

    //create main game state
    var game_state = function (game) {
    };
    game_state.prototype =
    {
        create: function () {
            //first lets center our canvas
            this.stage.scale.pageAlignHorizontally = true;

            //start the physics engine
            this.physics.startSystem(Phaser.Physics.ARCADE);

            //add a background
            this.add.sprite(0, 0, 'sky');

            //add a group for ground and platforms
            platforms = this.add.group();
            platforms.enableBody = true;


            //create the ground
            var ground = platforms.create(0, this.world.height - 64, 'ground');
            ground.scale.setTo(2, 2);
            ground.body.immovable = true;

            //create 2 ledges
            var ledge = platforms.create(400, 400, 'ground');
            ledge.body.immovable = true;

            ledge = platforms.create(-150, 250, 'ground');
            ledge.body.immovable = true;

            //create a player and its settings
            player = this.add.sprite(32, this.world.height - 150, 'dude');
            this.physics.arcade.enable(player);

            //add physics properties
            player.body.bounce.y = 0.2;
            player.body.gravity.y = 300;
            player.body.collideWorldBounds = true;

            //animations
            player.animations.add('left', [0, 1, 2, 3], 10, true);
            player.animations.add('right', [5, 6, 7, 8], 10, true);

            //create the keyboard inputs
            cursors = this.input.keyboard.createCursorKeys();

            //create some stars
            stars = this.add.group();
            stars.enableBody = true;

            for (var i = 0; i < 12; i++) {
                var star = stars.create(i * 70, 0, 'star');

                star.body.gravity.y = 6;
                star.body.bounce.y = 0.7 * Math.random() * 0.2;
            }

            //add score and score text
            scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32', fill: '#000'});

        },

        update: function () {
            //collide the player with the ground and ledges
            this.physics.arcade.collide(player, platforms);
            this.physics.arcade.collide(platforms, stars);
            this.physics.arcade.overlap(player, stars, this.collectStar, null, null);

            //reset player movement
            player.body.velocity.x = 0;

            //check for keyboard input

            if (cursors.left.isDown) {
                player.body.velocity.x = -150;

                player.animations.play('left');
            }
            else if (cursors.right.isDown) {
                player.body.velocity.x = 150;

                player.animations.play('right');
            }
            else {
                player.animations.stop();

                player.frame = 4;
            }

            //they can jump if they are on the ground
            if (cursors.up.isDown && player.body.touching.down) {
                player.body.velocity.y = -350;
            }

        },

        collectStar: function(player, star) {
            star.kill();

            //change score
            score += 1;
            scoreText.text = 'score: ' + score;
        }

    };
    return game_state;

});


