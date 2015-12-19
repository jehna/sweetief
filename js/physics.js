Game.physics = {
    materials: {}
};

Game.physics.materials.wall = new Box2D.Dynamics.b2FixtureDef();
Game.physics.materials.wall.density = 1.0;
Game.physics.materials.wall.friction = 0.5;
Game.physics.materials.wall.restitution = 0.2;


Game.physics.materials.player = new Box2D.Dynamics.b2FixtureDef();
Game.physics.materials.player.density = 10;
Game.physics.materials.player.friction = 0;
Game.physics.materials.player.restitution = 0;

Game.physics.materials.box = new Box2D.Dynamics.b2FixtureDef();
Game.physics.materials.box.density = 5.0;
Game.physics.materials.box.friction = 0.0;
Game.physics.materials.box.restitution = 0;
