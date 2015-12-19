Game.objects.Wall = function(options) {
    this.options = options;
}
Game.objects.Wall.prototype.Init = function() {
    
    var _t = this;
    
    Game.Awake(function() {
        //create ground
        var bodyDef = new Box2D.Dynamics.b2BodyDef;
        bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
        bodyDef.position.x = _t.options.x || 0;
        bodyDef.position.y = _t.options.y || 0;
        Game.physics.materials.wall.shape = new Box2D.Collision.Shapes.b2PolygonShape;
        Game.physics.materials.wall.shape.SetAsBox(
            _t.options.width || 10,
            _t.options.height || 10
        );
        Game.physicalWorld.CreateBody(bodyDef).CreateFixture(Game.physics.materials.wall);
        
    });
}