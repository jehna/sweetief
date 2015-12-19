var KeyCode = {
    ENTER : 13,
	SPACE : 32,
	UP : 38,
	DOWN : 40,
	LEFT : 37,
	RIGHT : 39,
	W : 87,	
	A : 65,
	D : 68
};

(function() {
    Game.Input = {
        keyDown : {}
    };
    
    //allow for WASD and arrow control scheme
	function handleKeyDown(e) {
		//cross browser issues exist
		if(!e){ e = window.event; }
		switch(e.keyCode) {
			case KeyCode.SPACE:
			case KeyCode.LEFT:
			case KeyCode.RIGHT:
			case KeyCode.UP:
			case KeyCode.DOWN:
			case KeyCode.A:
			case KeyCode.D:
			case KeyCode.W:
                Game.Input.keyDown[e.keyCode] = true;
                break;
            default:
                console.log(e.keyCode);
		}
        return false;
	}

	function handleKeyUp(e) {
		//cross browser issues exist
		if(!e){ e = window.event; }
		switch(e.keyCode) {
			case KeyCode.SPACE:
			case KeyCode.LEFT:
			case KeyCode.RIGHT:
			case KeyCode.UP:
			case KeyCode.DOWN:
			case KeyCode.A:
			case KeyCode.D:
			case KeyCode.W:
                Game.Input.keyDown[e.keyCode] = false;
                break;
		}
	}
    
    Game.Input.GetKeyDown = function(keyCode) {
        return (Game.Input.keyDown[keyCode] === true);
    };
    
    
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;
})();
