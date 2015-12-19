// Level object

Game.objects.Level = function(options) {
    this.options = options;
};

Game.objects.Level.prototype.Load = function() {
    this.InitPhysics();
    
    var playerPosition =  this.options.playerPosition || { x: 0, y: 0 };
    new Game.objects.Player(playerPosition);
    
    var w = this.options.width || 100;
    var h = this.options.height || 100;
    var t = 4;
    var p = 2;
    new Game.objects.Wall({ width: w, height: t, x: 0, y: 0 }).Init();
    new Game.objects.Wall({ width: w, height: t, x: 0, y: h }).Init();
    new Game.objects.Wall({ width: t, height: h, x: 0, y: 0 }).Init();
    new Game.objects.Wall({ width: t, height: h, x: w, y: 0 }).Init();
    
    var objects = this.options.objects || [];
    
    for(var i = 0; i < objects.length; i++) {
        var objType = objects[i].type;
        var options = objects[i].options || null;
        var newObj = new Game.objects[objType](options);
        newObj.Init();
    }
    
    document.getElementById("game").style.backgroundImage = 'url("'+this.options.bg+'")';
};

Game.objects.Level.prototype.InitPhysics = function() {
    
    var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
             //setup debug draw
    var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(document.getElementById("cdebug").getContext("2d"));
    debugDraw.SetDrawScale(1.0);
    debugDraw.SetFillAlpha(0.3);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    Game.physicalWorld.SetDebugDraw(debugDraw);
    
};







// Actual levels

Game.levels.level1 = new Game.objects.Level({
    playerPosition: { x: 20, y: 20 },
    bg: 'Layout/level1.png',
    width: 340,
    height: 346,
    objects : [
        { type: "Lamp", options : { x: 20, y: 200, intensity: 250, angle: 45, rotation: -23, resolution: 120 } },
        { type: "StealThis", options : { x: 300, y: 310 } },
        { type: "Door", options : { x: 3, y: 6, width: 50, height: 30 } },
        { type: "Wall", options : { x: 200, y: 0, width: 140, height: 42 } },
        { type: "Wall", options : { x: 135, y: 107, width: 55, height: 25 } },
        { type: "Wall", options : { x: 265, y: 190, width: 30, height: 45 } }
    ]
});

Game.levels.level2 = new Game.objects.Level({
    playerPosition: { x: 20, y: 20 },
    bg: 'Layout/level1.png',
    width: 340,
    height: 346,
    objects : [
        { type: "Lamp", options : { x: 20, y: 200, intensity: 300, angle: 45, rotation: -23, resolution: 120, dynamicRotation: 30  } },
        { type: "StealThis", options : { x: 30, y: 310 } },
        { type: "Door", options : { x: 3, y: 6, width: 50, height: 30 } },
        { type: "Wall", options : { x: 200, y: 0, width: 140, height: 42 } },
        { type: "Wall", options : { x: 135, y: 107, width: 55, height: 25 } },
        { type: "Wall", options : { x: 265, y: 190, width: 30, height: 45 } }
    ]
});

Game.levels.level3 = new Game.objects.Level({
    playerPosition: { x: 20, y: 270 },
    bg: 'Layout/level2.png',
    width: 380,
    height: 296,
    objects : [
        { type: "Lamp", options : { x: 50, y: 120, intensity: 280, angle: 45, rotation: -45, resolution: 120, dynamicRotation: 30 } },
        { type: "Lamp", options : { x: 330, y: 50, intensity: 280, angle: 45, rotation: 115, resolution: 80, dynamicRotation: 20 } },
        { type: "StealThis", options : { x: 342, y: 258 } },
        { type: "Door", options : { x: 3, y: 270, width: 50, height: 30 } },
        { type: "Wall", options : { x: 190, y: 0, width: 140, height: 42 } }, // Top shelf
        { type: "Wall", options : { x: 185, y: 270, width: 125, height: 14 } }, // Bottom shelf
        { type: "Wall", options : { x: 50, y: 80, width: 50, height: 25 } }, // counter
        { type: "Wall", options : { x: 18, y: 170, width: 20, height: 44 } }, // left shelf
        { type: "Wall", options : { x: 352, y: 145, width: 20, height: 80 } }, // right shelf
        { type: "Wall", options : { x: 190, y: 140, width: 40, height: 40 } } // middle
    ]
});

Game.levelslevel4 = new Game.objects.Level({
    playerPosition: { x: 30, y: 150 },
    bg: 'Layout/level4.png',
    width: 480,
    height: 296,
    objects : [
        { type: "StealThis", options : { x: 430, y: 150 } },
        { type: "Door", options : { x: 3, y: 150, width: 30, height: 50 } },
        { type: "Wall", options : { x: 190, y: 0, width: 50, height: 42 } }, // Top shelf
        { type: "Wall", options : { x: 190, y: 270, width: 50, height: 14 } }, // Bottom shelf
        { type: "Wall", options : { x: 305, y: 0, width: 50, height: 42 } }, // Top shelf
        { type: "Wall", options : { x: 305, y: 270, width: 50, height: 14 } }, // Bottom shelf
        { type: "Wall", options : { x: 420, y: 0, width: 50, height: 42 } }, // Top shelf
        { type: "Wall", options : { x: 420, y: 270, width: 50, height: 14 } }, // Bottom shelf 
        { type: "Laser", options : { x: 130, y: 285, intensity: 300, rotation: -90, delay: 2 } },
        { type: "Laser", options : { x: 245, y: 285, intensity: 300, rotation: -90 } },
        { type: "Laser", options : { x: 360, y: 285, intensity: 300, rotation: -90, delay: 1 } }
    ]
});

Game.levelslevel5 = new Game.objects.Level({
    playerPosition: { x: 20, y: 270 },
    bg: 'Layout/level2.png',
    width: 380,
    height: 296,
    objects : [
        //{ type: "Lamp", options : { x: 50, y: 120, intensity: 280, angle: 45, rotation: -45, resolution: 120, dynamicRotation: 30 } },
        { type: "Lamp", options : { x: 185, y: 260, intensity: 100, angle: 40, rotation: -110, resolution: 80 } },
        { type: "StealThis", options : { x: 342, y: 258 } },
        { type: "Door", options : { x: 3, y: 270, width: 50, height: 30 } },
        { type: "Wall", options : { x: 190, y: 0, width: 140, height: 42 } }, // Top shelf
        { type: "Wall", options : { x: 185, y: 270, width: 125, height: 14 } }, // Bottom shelf
        { type: "Wall", options : { x: 50, y: 80, width: 50, height: 25 } }, // counter
        { type: "Wall", options : { x: 18, y: 170, width: 20, height: 44 } }, // left shelf
        { type: "Wall", options : { x: 352, y: 145, width: 20, height: 80 } }, // right shelf
        { type: "Wall", options : { x: 190, y: 140, width: 40, height: 40 } }, // middle
        { type: "Laser", options : { x: 120, y: 255, intensity: 300, rotation: -90, delay: 1 } },
        { type: "Laser", options : { x: 270, y: 255, intensity: 300, rotation: -90, delay: 3 } },
        { type: "Laser", options : { x: 40, y: 140, intensity: 300, rotation: 45 } },
        { type: "Laser", options : { x: 335, y: 140, intensity: 300, rotation: 180, delay: 2  } },
        { type: "Laser", options : { x: 335, y: 160, intensity: 300, rotation: 135, delay: 4 } },
    ]
});

Game.levelslevel6 = new Game.objects.Level({
    playerPosition: { x: 30, y: 150 },
    bg: 'Layout/level4.png',
    width: 480,
    height: 296,
    objects : [
        { type: "StealThis", options : { x: 430, y: 150 } },
        { type: "Door", options : { x: 3, y: 150, width: 30, height: 50 } },
        { type: "Wall", options : { x: 190, y: 0, width: 50, height: 42 } }, // Top shelf
        { type: "Wall", options : { x: 190, y: 270, width: 50, height: 14 } }, // Bottom shelf
        { type: "Wall", options : { x: 305, y: 0, width: 50, height: 42 } }, // Top shelf
        { type: "Wall", options : { x: 305, y: 270, width: 50, height: 14 } }, // Bottom shelf
        { type: "Wall", options : { x: 420, y: 0, width: 50, height: 42 } }, // Top shelf
        { type: "Wall", options : { x: 420, y: 270, width: 50, height: 14 } }, // Bottom shelf 
        { type: "Laser", options : { x: 130, y: 285, intensity: 300, rotation: -90, liveTime: -1 } },
        { type: "Laser", options : { x: 245, y: 285, intensity: 300, rotation: -90, liveTime: -1 } },
        { type: "Laser", options : { x: 360, y: 285, intensity: 300, rotation: -90, liveTime: -1 } },
        { type: "MoveBox", options : { x: 100, y: 190 } },
        { type: "MoveBox", options : { x: 100, y: 150 } },
        { type: "MoveBox", options : { x: 100, y: 230 } }
    ]
});
