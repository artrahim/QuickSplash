let music = "music";
let tick = "tick";
let splash = "splash";
let cheer = "cheer";
let timer = "timer";

function loadBackgroundMusic(){
     // if initializeDefaultPlugins returns false, we cannot play sound in this browser
	if (!createjs.Sound.initializeDefaultPlugins()) { return; };
                
    createjs.Sound.registerSound("./sounds/timer.ogg", timer);
    createjs.Sound.registerSound("./sounds/cheer.wav", cheer);
    createjs.Sound.registerSound("./sounds/Splash.ogg", splash);
    createjs.Sound.registerSound("./sounds/Tick.ogg", tick);
    createjs.Sound.registerSound("./sounds/Music.ogg", music);
                
    createjs.Sound.addEventListener("fileload", handleFileLoad);
        
    function handleFileLoad(event){
        console.log("Preloaded:", event.id, event.src);
            
        if(event.src == "./sounds/Music.ogg"){
            let props = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY,loop: -1,volume: 0.5})
            //createjs.Sound.play(event.src, props);
        }
    }
}