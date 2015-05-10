/**
 * Created by David on 5/9/2015.
 */

(function () {
    'use strict';

    requirejs.config({
        baseUrl: 'src/',

        paths: {
            phaser: 'libs/phaser/phaser'
        }

        //not sure what the shim config is for
        //shim: {
        //    phaser: {
        //        exports: 'Phaser'
        //    }
        //}
    });

    require([
            'boot', 'preload', 'menu', 'game'],
            function(boot, preload, menu, game) {
                var deathBoat = new Phaser.Game(800, 600, Phaser.AUTO, '');
                //add boot states
                deathBoat.state.add('boot_state', boot);
                deathBoat.state.add('preload_state', preload);
                deathBoat.state.add('menu_state', menu);
                deathBoat.state.add('game_state', game);
                //start game
                deathBoat.state.start('boot_state');
        })
}());
