var Game = (function() {
    Game = {
        env : {},
        events : [],
        objects : {},
        levels : [],
        asassinateList: [],
        currentLevel : 1
    };
    Game.init = function() {
        // Setup enviroment
        if(localStorage.getItem('muted') == 1 || (!(localStorage.getItem('muted') > 0) && !confirm("Enable sound?"))) {
            Game.env.mute = true;
            localStorage.setItem('muted', 1);
            //createjs.Sound.setMute(true);
        } else {
            localStorage.setItem('muted', 2);
            //createjs.Sound.setMute(false);
            Game.env.mute = false;
        }
        
        Game.stage = new createjs.Stage("c");
        createjs.Ticker.setFPS(40);
        createjs.Ticker.addEventListener("tick", function(tick) {
            if(Game.env.playing == false) return;
            
            Game.stage.update(tick);
            while(Game.asassinateList.length) { Game.physicalWorld.DestroyBody(Game.asassinateList.pop()); }
            FireEvent("update");
        });
        
        // Update physics
        window.setInterval(function() {
            if(!Game.physicalWorld ||�Game.env.playing == false) return;
            Game.physicalWorld.Step(
                  1 / 60   //frame-rate
               ,  10       //velocity iterations
               ,  10       //position iterations
            );
            //Game.physicalWorld.DrawDebugData();
            Game.physicalWorld.ClearForces();
        }, 1000 / 60);
        
        //createjs.Sound.registerSound("music.m4a", "bgmusic");
        //createjs.Sound.registerSound("click1.ogg", "click1");
        //createjs.Sound.registerSound("click2.ogg", "click2");
        //createjs.Sound.registerSound("click3.ogg", "click3");
        //createjs.Sound.registerSound("wahwahwah.ogg", "wahwahwah");
        //createjs.Sound.registerSound("winning.ogg", "winning");
        //createjs.Sound.registerSound("gotcandy.ogg", "gotcandy");
        
    }
    
    function AddListener(listenerName, callback) {
        if(typeof Game.events[listenerName] == "undefined") Game.events[listenerName] = [];
        Game.events[listenerName].push(callback);
    }
    function FireEvent(listenerName) {
        if(typeof Game.events[listenerName] == "undefined") return;
        for(var i = 0; i < Game.events[listenerName].length; i++) { Game.events[listenerName][i](); }
    }
    
    Game.Awake = function(callback) {
        if(Game.env.started == true) callback();
        else AddListener("awake", callback);
    }
    Game.Start = function(callback) {
        if(Game.env.started == true) callback();
        else AddListener("start", callback);
    }
    Game.Update = function(callback) {
        AddListener("update", callback);
    }
    
    Game.LoadLevel = function(levelName) {
        Game.stage.removeAllChildren();
        Game.env.stated = false;
        Game.env.playing = false;
        Game.events = [];
        Game.physicalWorld = new Box2D.Dynamics.b2World(
               new Box2D.Common.Math.b2Vec2(0, 0),     //gravity
               true                                     //allow sleep
        );
        
        Game.levels[levelName].Load();
        // Start game (call all listeners)
        Game.env.stated = true;
        Game.env.playing = true;
        // First is awake for initialization, then comes Start
        FireEvent("awake");
        FireEvent("start");
        
        Write("Let's go!", false);
        
        
        // This is fired for each sound that is registered.
        //createjs.Sound.play("bgmusic").setVolume(0.5);
    }
    
    // Complete and fail
    Game.Over = function() {
        if(!Game.env.playing) return;
        Game.env.playing = false;
        console.log("Game Over");
        //createjs.Sound.stop();
        //createjs.Sound.play("wahwahwah").setVolume(0.5);
        
        GameOverTexts();
    }
    Game.Completed = function() {
        if(!Game.env.playing) return;
        Game.env.playing = false;
        console.log("You Won!");
        //createjs.Sound.stop();
        //createjs.Sound.play("winning").setVolume(0.5);
        WinningTexts();
        
        Game.currentLevel++;
    }
    return Game;
})();
