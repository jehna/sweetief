Game.objects.StealThis = function(options) {
    this.options = options || {};
}

Game.objects.StealThis.prototype.Init = function() {
    var _t = this;
    
    Game.Awake(function() {
        var radius = 30;
        
        _t.sprite = Game.stage.addChild(new createjs.Shape());
        _t.sprite.graphics.beginBitmapFill(document.getElementById("prize"), "no-repeat", new createjs.Matrix2D().translate(-30,-30)).drawCircle(0,0,radius);
        _t.sprite.x = _t.options.x || 0;
        _t.sprite.y = _t.options.y || 0;
        
        var bodyDef = new Box2D.Dynamics.b2BodyDef;
        bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
        Game.physics.materials.wall.shape = new Box2D.Collision.Shapes.b2CircleShape(radius);
        
        bodyDef.position.x = _t.options.x || 0;
        bodyDef.position.y = _t.options.y || 0;
        _t.body = Game.physicalWorld.CreateBody(bodyDef);
        _t.body.CreateFixture(Game.physics.materials.wall);
        _t.body.SetUserData(_t);
        
        var contactListener = new Box2D.Dynamics.b2ContactListener
        contactListener.BeginContact = function(contact) {
            if(contact.GetFixtureB().GetBody().GetUserData() != _t) return;
            if(contact.GetFixtureA().GetBody().GetUserData() != Game.player) return;
            
            createjs.Sound.play("gotcandy").setVolume(1.0);
            Write("WE GOT CANDY!!!", false);
            setTimeout(function() { Write("MOVE! MOVE! MOVE!", false); }, 3000);
            setTimeout(function() { Write("LET'S GET OUTTA HERE!", false); }, 6000);
            _t.sprite.alpha = 0; Game.player.hasStolenEverything = true;
            Game.asassinateList.push(_t.body);
        }
        Game.physicalWorld.SetContactListener(contactListener);
        
    });
    
    /*Game.Update(function() {
        var pos = _t.sprite.globalToLocal(Game.player.x, Game.player.y);
        if (_t.sprite.hitTest(pos.x, pos.y)) {
           
        }
    });*/
}