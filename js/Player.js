export default class Player extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, texture, frame } = data;
    super(scene.matter.world, x, y, texture, frame)

    this.scene.add.existing(this);
  }

  static preload(scene) {
    scene.load.atlas("female", "assets/images/female.png", "assets/images/female_atlas.json");
    scene.load.animation("female_anim", "assets/images/female_anim.json");
  }

  static controlMoving(scene, player) {
    player.inputKeys = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    })
  }

  update() {
    console.log("update Player")

    this.anims.play('female_walk', true);
    const speed = 2.5;
    let playerVelocity = new Phaser.Math.Vector2();

    // Moving player by inputs
    if (this.inputKeys.left.isDown) {
      playerVelocity.x = -1;
    } else if (this.inputKeys.right.isDown) {
      playerVelocity.x = 1;
    }

    if (this.inputKeys.up.isDown) {
      playerVelocity.y = -1;
    } else if (this.inputKeys.down.isDown) {
      playerVelocity.y = 1;
    }

    playerVelocity.normalize(); // Make moving on diagonal lines smoothly
    playerVelocity.scale(speed);
    this.setVelocity(playerVelocity.x, playerVelocity.y)
  }
}