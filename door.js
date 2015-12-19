Game.objects.Door = function(options) {
    this.options = options || {};
}

Game.objects.Door.prototype.Init = function() {
    var _t = this;
    
    Game.Awake(function() {
        var width = _t.options.width || 50;
        var height = _t.options.height || 10;
        
        _t.sprite = Game.stage.addChild(new createjs.Shape());
        _t.sprite.graphics.beginLinearGradientFill(["rgba(236,254,0,0.4)","rgba(236,254,0,0.0)"], [0, 1], 0, 0, 0, _t.options.height).drawRect(0,0,width, height);
        _t.sprite.x = _t.options.x || 0;
        _t.sprite.y = _t.options.y || 0;
    });
    
    Game.Update(function() {
        var pos = _t.sprite.globalToLocal(Game.player.x, Game.player.y);
        if (Game.player.hasStolenEverything == true && _t.sprite.hitTest(pos.x, pos.y)) {
            Game.Completed();
        }
    });
}