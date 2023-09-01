import Player from "./Player.js";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    Player.preload(this);
    this.load.image("tiles", "assets/images/RPG Nature Tileset.png")
    this.load.tilemapTiledJSON("map", "assets/images/map.json")
    this.load.atlas('resources', 'assets/images/resources.png', 'assets/images/resources_atlas.json')
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    this.map = map;
    const tileset = map.addTilesetImage("RPG Nature Tileset", "tiles", 32, 32, 0, 0);
    const layer1 = map.createLayer("Tile Layer 1", tileset, 0, 0);
    const layer2 = map.createLayer("Tile Layer 2", tileset, 0, 0);
    layer1.setCollisionByProperty({ collides: true }); // Set colider bounds base on this layer
    this.matter.world.convertTilemapLayer(layer1)

    // Init resources
    let tree = new Phaser.Physics.Matter.Sprite(this.matter.world, 50, 50, 'resources', 'tree');
    let rock = new Phaser.Physics.Matter.Sprite(this.matter.world, 150, 150, 'resources', 'rock');
    tree.setStatic(true); // Stop physics effect on this object
    rock.setStatic(true);

    this.add.existing(tree);
    this.add.existing(rock);

    this.player = new Player({scene: this, x: 100, y: 100, texture: "female", frame: "townsfolk_f_idle_1"});
    Player.controlMoving(this, this.player)
    // this.player.inputKeys = this.input.keyboard.addKeys({
    //   up: Phaser.Input.Keyboard.KeyCodes.W,
    //   down: Phaser.Input.Keyboard.KeyCodes.S,
    //   left: Phaser.Input.Keyboard.KeyCodes.A,
    //   right: Phaser.Input.Keyboard.KeyCodes.D
    // })
  }

  update() {
    this.player.update();
  }
}
