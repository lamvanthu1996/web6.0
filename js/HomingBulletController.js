class HomingBulletController {
    constructor(x, y, spriteName) {
        this.sprite = Nakama.bulletGroup.create(x, y, 'assets', spriteName);
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.body.checkWorldBounds = true;
        this.sprite.body.outOfBoundsKill = true;
    }
    update() {
        var enemyAlive = Nakama.enemyGroup.getFirstAlive();

        if (enemyAlive != null && !enemyAlive.alive) {
            enemyAlive = Nakama.enemyGroup.getFirstAlive();
        }
        if (enemyAlive != null) {
            var direction = new Phaser.Point(enemyAlive.x - this.sprite.position.x, enemyAlive.y - this.sprite.position.y);

            this.sprite.body.velocity = direction.setMagnitude(HomingBulletController.HOMING_BULLET_SPEED);
            this.sprite.angle = Math.atan(direction.x / -direction.y) * 180 / Math.PI;
        } else {
            this.sprite.body.velocity = new Phaser.Point(0, -1).setMagnitude(HomingBulletController.HOMING_BULLET_SPEED);
            this.sprite.angle = 0;
        }
    }
}
HomingBulletController.HOMING_BULLET_SPEED = 400;
