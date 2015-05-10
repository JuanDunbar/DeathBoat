/**
 * Created by David on 5/9/2015.
 */

define(['phaser'], function(phaser) {
    //create main menu state
    var menu_state = function (game) {
        this.music = null;
        this.play = null;
    };
    menu_state.prototype =
    {
        create: function () {
            this.music = this.add.audio('titleMusic');
            this.music.play();

            this.add.sprite(0, 0, 'sky');
            this.play = this.add.button(200, 100, 'play', this.startGame, this);

        },
        update: function () {

        },
        startGame: function (pointer) {
            this.music.stop();
            this.state.start('game_state');
        }
    };
    return menu_state;
});