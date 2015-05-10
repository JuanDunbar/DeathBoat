/**
 * Created by David on 5/9/2015.
 */

define(['phaser'], function(phaser) {

    //create boot state
    var boot_state = function (game) {
    };
    boot_state.prototype =
    {
        init: function () {
            this.input.maxPointers = 1;

            if (this.game.device.desktop) {
                console.log('desktop');
                this.scale.pageAlignHorizontally = true;
            }
        },
        preload: function () {
            this.load.image('preloadBar', 'assets/loadbar.png');
            this.load.image('background', 'assets/loadscreen.png');
        },
        create: function () {
            this.state.start('preload_state');
        }
    };
    return boot_state;

});