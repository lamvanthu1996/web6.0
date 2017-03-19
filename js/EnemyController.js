class EnemyController{
  constructor(x, y, spriteName, configs){
    this.sprite = Nakama.enemyGroup.create(x, y, 'assets', spriteName);
    //this.sprite=Nakama.game.add.sprite(x, y, 'assets', spriteName );
    this.configs=configs;
    //Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.health = this.configs.health;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.velocity.x = EnemyController.ENEMY_SPEED;
  }
  update(){
    if(this.sprite.position.x<=0){
      this.sprite.body.velocity.x = EnemyController.ENEMY_SPEED;
    }
    if(this.sprite.position.x>=580)
      this.sprite.body.velocity.x = -EnemyController.ENEMY_SPEED;
  }
}
EnemyController.ENEMY_SPEED = 350;
