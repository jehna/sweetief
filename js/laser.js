Game.objects.Laser = function(options) {
    this.options = options || {};
}
Game.objects.Laser.prototype.Init = function() {
    var _t = this;
    _t.options.rotation = _t.options.rotation || -90;
    _t.options.intensity = _t.options.intensity || 500;
    _t.options.delay = _t.options.delay || 0;
    _t.options.liveTime = _t.options.liveTime || 3;
    
    Game.Awake(function() {
        _t.mesh = Game.stage.addChild(new createjs.Shape());
        _t.mesh.x = _t.options.x || 0;
        _t.mesh.y = _t.options.y || 0;
        
        
        var basePoint = {
            x: _t.options.x || 0,
            y: _t.options.y || 0
        }
        var targetPoint = {x: basePoint.x, y: basePoint.y};
        var deg = _t.options.rotation;
        targetPoint.y += _t.options.intensity * Math.sin(Math.PI/180*deg);
        targetPoint.x += _t.options.intensity * Math.cos(Math.PI/180*deg);
        _t.ray = {
            from: new Box2D.Common.Math.b2Vec2(basePoint.x, basePoint.y),
            to: new Box2D.Common.Math.b2Vec2(targetPoint.x, targetPoint.y)
        }
    });
    Game.Update(function() {
        if(_t.gameOverOnNext == true) Game.Over();
        
        
        if(_t.options.liveTime > 0 && ((new Date().getTime() / 1000) + _t.options.delay) % (_t.options.liveTime * 2) < _t.options.liveTime) {
            _t.mesh.graphics.clear();
            return;
        }
        
        _t.closest = {val: 1, wouldHitPlyer: false};
        function CB(fixture, point, normal, fraction) {
            //if(fixture && fixture.GetBody().GetUserData() == Game.player) { Game.Over(); }
            if(fraction > 0 && fraction < _t.closest.val) {
                
                _t.closest.val = fraction;
                
                // Does the nearest ray point hit player?
                if(fixture && fixture.GetBody().GetUserData() == Game.player) {
                    _t.closest.wouldHitPlyer = true;
                } else {
                    _t.closest.wouldHitPlyer = false;
                }
            }
            return 1;
        }
        Game.physicalWorld.RayCast(CB, _t.ray.from, _t.ray.to)
        
        
        _t.mesh.graphics.clear().beginStroke("red").setStrokeStyle(3).moveTo(0,0);
            
        
        var diff = {
            x: _t.ray.from.x - _t.ray.to.x, 
            y: _t.ray.from.y - _t.ray.to.y
        }
        
        
        var pos = {x: -_t.closest.val * diff.x + _t.ray.from.x, y: -_t.closest.val * diff.y + _t.ray.from.y};
        var closest = _t.mesh.globalToLocal(_t.ray.from.x, _t.ray.from.y);
        var pos2 = _t.mesh.globalToLocal(pos.x, pos.y);

        _t.mesh.graphics.lineTo(pos2.x,pos2.y);
        
        
        if(_t.closest.wouldHitPlyer) _t.gameOverOnNext = true;
    });
    
};