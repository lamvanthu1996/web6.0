var Nakama = {};
Nakama.configs = {
    GAME_WIDTH: 640,
    GAME_HEIGHT: 960,
    MIN_WIDTH: 320,
    MIN_HEIGHT: 480,
    MAX_WIDTH: 640,
    MAX_HEIGHT: 960,
    PLAYER1_POS: {
        x: 300,
        y: 750
    },
    PLAYER2_POS: {
        x: 250,
        y: 750
    },
    ENEMY_POS: {
        x: 150,
        y: 150,
    }
};

window.onload = function() {

    Nakama.game = new Phaser.Game(640, 960, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update,
        render: render
    }, false, false);
};

// preparations before game starts
var preload = function() { //
    Nakama.game.scale.minWidth = Nakama.configs.MIN_WIDTH;
    Nakama.game.scale.minHeight = Nakama.configs.MIN_HEIGHT;
    Nakama.game.scale.maxWidth = Nakama.configs.MAX_WIDTH;
    Nakama.game.scale.maxHeight = Nakama.configs.MAX_HEIGHT;
    Nakama.game.scale.pageAlignHorizontally = true;
    Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    Nakama.game.time.advancedTiming = true;

    Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
    Nakama.game.load.image('background', 'Assets/Map1.png');
};

// initialize the game
var create = function() {
    Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
    Nakama.keyboard = Nakama.game.input.keyboard;
    Nakama.game.add.sprite(0, 0, "background");
    Nakama.bulletGroup = Nakama.game.add.physicsGroup();
    Nakama.enemyGroup = Nakama.game.add.physicsGroup();

    Nakama.playerGroup = Nakama.game.add.physicsGroup();
    Nakama.players = [];
    Nakama.players.push(
        new ShipController(
            Nakama.configs.PLAYER1_POS.x,
            Nakama.configs.PLAYER1_POS.y,
            "Spaceship1-Player.png", {
                up: Phaser.Keyboard.UP,
                down: Phaser.Keyboard.DOWN,
                left: Phaser.Keyboard.LEFT,
                right: Phaser.Keyboard.RIGHT,
                fire: Phaser.Keyboard.SPACEBAR,
                cooldown: 0.1
            }
        ),
        new ShipController(
            Nakama.configs.PLAYER2_POS.x,
            Nakama.configs.PLAYER2_POS.y,
            "Spaceship1-Partner.png", {
                up: Phaser.Keyboard.W,
                down: Phaser.Keyboard.S,
                left: Phaser.Keyboard.A,
                right: Phaser.Keyboard.D,
                fire: Phaser.Keyboard.G,
                cooldown: 0.1
            }
        )
    );
    Nakama.enemy = [];
    Nakama.enemy.push(
        new EnemyController(
            Nakama.configs.ENEMY_POS.x,
            Nakama.configs.ENEMY_POS.y,
            "EnemyType1.png",
            {
              speed  : 500,
              health : 300

            }
        )
    );
};

// update game state each frame
var update = function() {
    Nakama.players.forEach(function(ship) {
        ship.update();
    });
    Nakama.enemy.forEach(function(enemy) {
        enemy.update();
    });
    Nakama.game.physics.arcade.overlap(
      Nakama.bulletGroup,
      Nakama.enemyGroup,
      onBulletHitEnemy
    );
};
var onBulletHitEnemy = function(bulletSprite, enemySprite){
  enemySprite.damage(1);
  bulletSprite.kill();
};



// before camera render (mostly for debug)
var render = function() {};
