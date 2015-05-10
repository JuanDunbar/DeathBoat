/**
 * Created by David on 5/9/2015.
 */
define(['phaser'], function(phaser) {

    //create pre load state
    var preload_state = function (game) {
        this.preloadeBar = null;
        this.ready = false;
    };
    preload_state.prototype =
    {
        preload: function () {
            this.backgroud = this.add.sprite(0, 0, 'background');
            this.preloadBar = this.add.sprite(300, 400, 'preloadBar');

            this.load.setPreloadSprite(this.preloadBar);

            this.load.image('play', 'assets/PlayButton.png');
            this.load.image('sky', 'assets/sky.png');
            this.load.image('ground', 'assets/platform.png');
            this.load.image('star', 'assets/star.png');
            this.load.audio('titleMusic', 'assets/01-Perturbator-Welcome Back.mp3');
            this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        },
        create: function () {
            this.preloadBar.cropEnabled = false;
        },
        update: function () {
            if (this.cache.isSoundDecoded('titleMusic') && this.ready == false) {
                this.ready = true;
                this.state.start('menu_state');
            }
        }
    };
    return preload_state;
});