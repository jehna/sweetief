Game.objects.Lamp = function(options) {
    this.options = options || {};
};
Game.objects.Lamp.prototype.Init = function() {
    var _t = this;
    _t.options.intensity = _t.options.intensity || 100;
    _t.options.resolution = _t.options.resolution || 50;
    _t.options.angle = _t.options.angle || 90;
    _t.options.rotation = _t.options.rotation || -90;
    _t.options.dynamicRotation = _t.options.dynamicRotation || 0;
    
    Game.Awake(function() {
        _t.mesh = Game.stage.addChild(new createjs.Shape());
        _t.mesh.x = _t.options.x || 0;
        _t.mesh.y = _t.options.y || 0;
        
    });
    Game.Start(function() {
        _t.SetDynamicRotation(0);
    });
    Game.Update(function() {
        
        // Update raycasts
        function raycastLoop(i) {
            _t.closest[i] = {val: 1, wouldHitPlyer: false};
            function CB(fixture, point, normal, fraction) {
                //if(fixture && fixture.GetBody().GetUserData() == Game.player) { Game.Over(); }
                if(fraction > 0 && fraction < _t.closest[i].val) {
                    
                    _t.closest[i].val = fraction;
                    
                    // Does the nearest ray point hit player?
                    if(fixture && fixture.GetBody().GetUserData() == Game.player) {
                        _t.closest[i].wouldHitPlyer = true;
                    } else {
                        _t.closest[i].wouldHitPlyer = false;
                    }
                }
                return 1;
            }
            Game.physicalWorld.RayCast(CB, _t.rays[i].from, _t.rays[i].to);
        }
        for (var i = 0; i < _t.rays.length; i++) {
            raycastLoop(i);
        }
        
        
        _t.mesh.graphics.clear().beginRadialGradientFill(["rgba(255,255,255,0.8)","rgba(255,255,255,0.2)"], [0, 1], 0, 0, 0, 0, 0, _t.options.intensity).moveTo(0,0);
        for(i = 0; i < _t.rays.length; i++) {
            
            if(_t.closest[i].wouldHitPlyer) Game.Over();
            
            var diff = {
                x: _t.rays[i].from.x - _t.rays[i].to.x, 
                y: _t.rays[i].from.y - _t.rays[i].to.y
            };
            
            
            var pos = {x: -_t.closest[i].val * diff.x + _t.rays[i].from.x, y: -_t.closest[i].val * diff.y + _t.rays[i].from.y};
            var closest = _t.mesh.globalToLocal(_t.rays[i].from.x, _t.rays[i].from.y);
            var pos2 = _t.mesh.globalToLocal(pos.x, pos.y);

            _t.mesh.graphics.lineTo(pos2.x,pos2.y);
        }
        
        
        // testing
        if(_t.options.dynamicRotation) _t.SetDynamicRotation(Math.cos((new Date().getTime() - startTime) * 0.0001 * Math.PI)*_t.options.dynamicRotation);
    });
    
    _t.rays = [];
    _t.closest = [];
    var startTime = new Date().getTime();
};

Game.objects.Lamp.prototype.SetDynamicRotation = function(rotation) {
    var _t = this;
    var applyRotation = (_t.options.rotation + rotation) % 360;
    
    var basePoint = {
        x: _t.options.x || 0,
        y: _t.options.y || 0
    };
    _t.rays = [];
    for(var i = 0; i <= _t.options.resolution; i++) {
        var targetPoint = {x: basePoint.x, y: basePoint.y};
        var deg = i * (_t.options.angle/(_t.options.resolution)) + applyRotation;
        targetPoint.y += _t.options.intensity * Math.sin(Math.PI/180*deg);
        targetPoint.x += _t.options.intensity * Math.cos(Math.PI/180*deg);
        _t.rays.push({ from: new Box2D.Common.Math.b2Vec2(basePoint.x, basePoint.y), to: new Box2D.Common.Math.b2Vec2(targetPoint.x, targetPoint.y) });
    }
};
