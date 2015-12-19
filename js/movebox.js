Game.objects.MoveBox = function(options) {
    this.options = options || {};
};

Game.objects.MoveBox.prototype.Init = function() {
    var _t = this;
    
    Game.Awake(function() {
        var radius = 30;
        
        _t.sprite = Game.stage.addChild(new createjs.Shape());
        _t.sprite.graphics.beginBitmapFill(document.getElementById("box"), "no-repeat", new createjs.Matrix2D().translate(-16,-16)).rect(-16,-16,32,32);
        _t.sprite.x = _t.options.x || 0;
        _t.sprite.y = _t.options.y || 0;
        
        var bodyDef = new Box2D.Dynamics.b2BodyDef();
        bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        Game.physics.materials.box.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        Game.physics.materials.box.shape.SetAsBox(16, 16);
        
        bodyDef.position.x = _t.options.x || 0;
        bodyDef.position.y = _t.options.y || 0;
        _t.body = Game.physicalWorld.CreateBody(bodyDef);
        _t.body.SetFixedRotation(true);
        _t.body.CreateFixture(Game.physics.materials.box);
        
    });
    
    Game.Update(function() {
        
        var vel = _t.body.GetLinearVelocity();
        vel.x = vel.x * 0.05;
        vel.y = vel.y * 0.05;
        if(vel) _t.body.SetLinearVelocity(vel);
        
        var pos = _t.body.GetPosition();
        _t.sprite.x = pos.x;
        _t.sprite.y = pos.y;
        //_t.sprite.rotation = _t.body.GetRotation();
        
    });
};
