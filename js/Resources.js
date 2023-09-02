export default class Resource extends Phaser.Physics.Matter.Sprite {
  static preload(scene) {
    scene.load.atlas('resources', 'assets/images/resources.png', 'assets/images/resources_atlas.json')
  }

  constructor(data) {
    let { scene, resource } = data;
    super(scene.matter.world, resource.x, resource.y, 'resources', resource.type);
    scene.add.existing(this);

    // Center resource to fix in tile and relocate base on height with yOrigin
    let yOrigin = resource.properties.find(p => p.name == 'yOrigin').value;
    this.x += this.width/2;
    this.y -= this.height/2;
    this.y = this.y + this.height * (yOrigin - 0.5);


    const { _Body, Bodies } = Phaser.Physics.Matter.Matter;
    var circleCollider = Bodies.circle(this.x, this.y, 12, { isSensor: false, label: 'collider' });
    this.setExistingBody(circleCollider);

    this.setStatic(true);
    this.setOrigin(0.5, yOrigin);
  }
}