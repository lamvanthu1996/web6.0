"use stric";
class ShipController {
    static get SHIP_SPEED() {
        return 400;
    }

    constructor(x, y, spriteName, configs) {
        this.sprite = Nakama.playerGroup.create(x, y, 'assets', spriteName);
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.body.collideWorldBounds = true;
        this.configs = configs;
        this.timeSinceLastFire = 0;

    }

    update() {
        if (Nakama.keyboard.isDown(this.configs.up)) {
            this.sprite.body.velocity.y = -ShipController.SHIP_SPEED;
        } else if (Nakama.keyboard.isDown(this.configs.down)) {
            this.sprite.body.velocity.y = ShipController.SHIP_SPEED;
        } else {
            this.sprite.body.velocity.y = 0;
        }

        if (Nakama.keyboard.isDown(this.configs.left)) {
            this.sprite.body.velocity.x = -ShipController.SHIP_SPEED;
        } else if (Nakama.keyboard.isDown(this.configs.right)) {
            this.sprite.body.velocity.x = ShipController.SHIP_SPEED;
        } else {
            this.sprite.body.velocity.x = 0;
        }
        this.timeSinceLastFire += Nakama.game.time.physicsElapsed;
        if (Nakama.keyboard.isDown(this.configs.fire)) {
            this.tryFire();
        }
        if(this.fired){
          ShipController.homingBullet.forEach(function(homingBullet){
            homingBullet.update();
          });
        }
    }
    tryFire() {
        if (this.fire(this.timeSinceLastFire >= this.configs.cooldown)) {
            this.fire();
            this.timeSinceLastFire = 0;
        }
    }
    fire() {
        ShipController.homingBullet.push(
          new HomingBulletController(
            this.sprite.position.x,
            this.sprite.position.y,
            "BulletType2.png"
          )
        );
        this.fired = true;
    }
    createBullet(direction){
      new BulletController(
          this.sprite.position,
          direction,
          "BulletType1.png"
      );
    }
}
ShipController.SHIP_SPEED = 500;
ShipController.homingBullet = [];
