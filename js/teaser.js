$(function() {
    var animationGoing = false;
    var currentAnimation = 0;
    var forceNextAnimation = false;
    
    window.Write = function(msg, clicktocontinue) {
        clicktocontinue = (clicktocontinue != false);
        var currentString = "";
        var pieces = msg.split("");
        
        function Animate() {
            animationGoing = true;
            if(pieces.length == 0 || forceNextAnimation) {
                var addText = clicktocontinue ? "<br><br>(Click to continue)" : "";
                $("#message").html(currentString + pieces.join("") + addText);
                animationGoing = false;
                forceNextAnimation = false;
                return;
            }
            //createjs.Sound.play("click" + Math.ceil(Math.random() * 3)).setVolume(0.4);
            currentString += pieces.shift();
            $("#message").html(currentString);
            
            setTimeout(Animate, 70);
        }
        
        Animate();
    }
    
    var startmessages = [
        "I managed to break in to Candy Store!",
        "There are some damn <i>cameras</i> on the way.",
        "We don't want to get seen, ok?"
    ];
    
    function SetNextMessages(msgs) {
        for(var i = 0; i < msgs.length; i++) {
            messages.push(msgs[i]);
        }
    }
    
    var messages = [];
    SetNextMessages(startmessages);
    
    Write("Psst...");
    $(window).click(function() {
        if(Game.env.playing) return;
        
        if(animationGoing) {
            forceNextAnimation = true;
            return;
        }
        if(messages.length) {
            Write(messages.shift());
        } else {
            Game.LoadLevel("level" + Game.currentLevel);
            $("#game").slideDown({easing: "easeOutBounce", duration: 2000});
        }
    });
    
    var gameovermessages = [
        "Awwwwwwwwww damn!",
        "We got caught!",
        "We should avoid getting caught!",
        "Meh",
        "Wanna try again?"
    ];
    
    var winningstexts = [
        null,
        [ // Level 1
            "YAAAAAEEEE!!!",
            "We've got candy!",
            "*Omnomnomnomnomnom*",
            "*burb*",
            "Let's get some more, shall we?",
            "Oh noes!",
            "They've got a better camera",
            "Hmm..",
            "I think we'll manage ;)"
        ],
        [
            "WOOP WOOP!",
            "That was nice!",
            "I want mooore!!!!"
        ],
        [
            "*BADA-TSHH!*",
            "Your're a badass!",
            "I bet you can manage something more serious",
            "These guys have lasers to watch out!"
        ],
        [
            "AWESOMENESS!",
            "We did it!",
            "Let's keep up the sweat",
            "The next store is INSANE!"
        ],
        [
            "HALLELUJAH FOR CAN-DIES!!",
            "Onnntothe next one!",
            "They've got everything covered",
            "But I bet we could move something so we don't reveal ourselves ;)"
        ],
        [
            "GEAT!",
            "But I'm afraid that's all we've got :(",
            "Ro maybe you could ask Jesse to do a couple of more levels ;)"
        ],
    ];
    
    window.GameOverTexts = function() {
        $("#game").slideUp({easing: "easeOutBounce", duration: 2000});
        SetNextMessages(gameovermessages);
        Write(messages.shift());
    }
    window.WinningTexts = function() {
        $("#game").slideUp({easing: "easeOutBounce", duration: 2000});
        SetNextMessages(winningstexts[Game.currentLevel]);
        Write(messages.shift());
    }
});
