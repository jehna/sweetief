Game.objects.Player = function(position) {
    
    Game.player = this;
    
    
    Game.Awake(function() {
        var data = {
            images: ["Layout/ukko.png"],
            frames: {width:40, height:40, regX: 20, regY:20},
            animations: {run: { frames: [1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6] }, idle:[0]}
        };
        var spriteSheet = new createjs.SpriteSheet(data);
        var animation = new createjs.BitmapAnimation(spriteSheet);
        animation.gotoAndPlay("run");
        Game.player = Game.stage.addChild(animation);
        
        
        
        
        var radius = 18;
        //Game.player = Game.stage.addChild(new createjs.Shape());
        //Game.player.graphics.beginFill("blue").drawCircle(0,0,radius);
        Game.player.x = position.x || 0;
        Game.player.y = position.y || 0;
        Game.player.speed = 50;
        Game.player.hasStolenEverything = false;
        
        var bodyDef = new Box2D.Dynamics.b2BodyDef;
        bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        Game.physics.materials.player.shape = new Box2D.Collision.Shapes.b2CircleShape(radius);
        
        bodyDef.position.x = position.x || 0;
        bodyDef.position.y = position.y || 0;
        Game.player.body = Game.physicalWorld.CreateBody(bodyDef);
        Game.player.body.CreateFixture(Game.physics.materials.player);
        Game.player.body.SetUserData(Game.player);
    });
    
    Game.Update(function() {
        //console.log(KeyCode);
        var vel = Game.player.body.GetLinearVelocity();
        //console.log(vel);
        vel.x = Game.Input.GetKeyDown(KeyCode.LEFT) ? -Game.player.speed : 0;
        vel.x = Game.Input.GetKeyDown(KeyCode.RIGHT) ? Game.player.speed : vel.x;
        vel.y = Game.Input.GetKeyDown(KeyCode.UP) ? -Game.player.speed : 0;
        vel.y = Game.Input.GetKeyDown(KeyCode.DOWN) ? Game.player.speed : vel.y;
        
        applyNewRotation = 0;
        if(Game.Input.GetKeyDown(KeyCode.LEFT)) applyNewRotation += 1<<1;
        if(Game.Input.GetKeyDown(KeyCode.RIGHT)) applyNewRotation += 1<<3;
        if(Game.Input.GetKeyDown(KeyCode.UP)) applyNewRotation += 1<<2;
        if(Game.Input.GetKeyDown(KeyCode.DOWN)) applyNewRotation += 1<<0;
        
        if(applyNewRotation > 0) {
            var rot = 0;
            if(applyNewRotation == 3<<0) rot = 45;
            else if(applyNewRotation == 3<<1) rot = 135;
            else if(applyNewRotation == 3<<2) rot = 225;
            else if(applyNewRotation == (1<<3) + 1) rot = 315;
            else if(applyNewRotation == 1<<0) rot = 0;
            else if(applyNewRotation == 1<<1) rot = 90;
            else if(applyNewRotation == 1<<2) rot = 180;
            else if(applyNewRotation == 1<<3) rot = 270;
            
            Game.player.rotation = rot;
            Game.player.paused = false;
        } else {
            Game.player.paused = true;
        }
        
        if(vel.x || vel.y) Game.player.body.SetAwake(true);
            
        Game.player.body.SetLinearVelocity(vel);
        
        var pos = Game.player.body.GetPosition();
        Game.player.x = pos.x;
        Game.player.y = pos.y;
        //Game.player.y = Game.player.body.position.y;
        //if(Game.player.hitTest())
    });
}