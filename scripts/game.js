/*
zIndexes:
TitleScreen: 1000
HelpScreen 999
EndScreen: 998
MenuScreen: 997
LevelSelectScreen: 996

UI: 100

Items. 5
Player: 4
Enemies: 3
Bullets: 2
GameMap: 1
*/

class Game{
    constructor(){
        var that = this;
        //Controll Variables
        this.pressedKeys = {};
        this.pointerdown = false;
        this.pointerPos;
        //Shoot/Reload mechanics variables
        this.isReloading = false;
        this.reloadingTime;
        this.amonition = 50;
        //Screens
        this.titleScreen = new PIXI.Container();
        this.menuScreen = new PIXI.Container();
        this.endScreen = new PIXI.Container();
        this.helpScreen = new PIXI.Container();
        this.levelSelectScreen = new PIXI.Container();
        //UI 
        this.UI = new PIXI.Container();
        this.FPSDisplay = new PIXI.Container();
        //Game Objects
        this.app;
        this.level;
        this.score;
        this.gameMap = new PIXI.Container();
        this.enemies = [];
        this.bullets = [];
        this.items = [];
        this.player;
        //texture Sheets
        this.progressBarFrames = [];
        this.itemTexures = [];
        this.enemyTextureSheets = [];
        this.playerTextureSheet = {};

        this.cnt = 0;
        
        this.tickerFun = ()=>{this.gameLoop()};
        

        this.templELKeyDown = function(e){that.keysDown(e)};
        this.templELKeyUp = function(e){that.keysUp(e)};
        window.addEventListener("keydown", that.templELKeyDown);
        window.addEventListener("keyup", that.templELKeyUp);
    }

    keysDown(e){
        this.pressedKeys[e.keyCode] = true;
    }       
    
    keysUp(e){
        this.pressedKeys[e.keyCode] = false;
    }

    async fetchLevel(){
        let data = await fetch("scripts/levels.json")
        if (data.ok){
            return await data.json()
        }
        else{
            throw new Error(data.status)
        }
    }

    loadGraphics(){
        var that = this;
        this.app = new PIXI.Application(
            {
                width: 900,
                height: 650,
                transparent: true,
            }
        );
        document.querySelector("#gameDiv").appendChild(this.app.view);
        this.app.stage.interactive = true;
        this.app.stage.sortableChildren = true;
        this.app.stage.on("pointerdown", function(e){that.pointerdown = true;
                                                     that.pointerPos = e.data.global;});
        this.app.stage.on("pointerup", function(){that.pointerdown = false;});

        PIXI.settings.SCALE_MODE.NEAREST;

        this.app.loader.baseUrl = "graphics";
        this.app.loader.add("player","player.png")
                       .add("bullet","bullet.png")
                       .add("background","field.png")
                       .add("wall","wall.png")
                       .add("enemy0","robot.png")
                       .add("enemy1","robot-l2.png")
                       .add("playBtn","buttons/play-button.png")
                       .add("extBtn","buttons/exit-button.png")
                       .add("levelBtns","buttons/level-select-buttons.png")
                       .add("helpBtn", "buttons/help-button.png")
                       .add("backBtn", "buttons/back-button.png")
                       .add("contrWASD","buttons/WASD-Controls.png")
                       .add("contrR","buttons/R-Controls.png")
                       .add("contrMouseMove","buttons/mouseMove-Controls.png")
                       .add("contrMouseLClick","buttons/mouseLeftClick-Controls.png")
                       .add("contrEsc","buttons/Esc-Controls.png")
                       .add("progrBarNextWave","nextWaveBar.png")
                       .add("weapon","weapon.png")
                       .add("select","select/select.png")
                       .add("flare","flare.png")
                       .add("l-1","levels/level-1.png")
                       .add("l-2","levels/level-2.png")
                       .add("l-3","levels/level-3.png")
                       .add("l-4","levels/level-4.png")
                       .add("l-5","levels/level-5.png")
                       .add("l-6","levels/level-6.png")
                       .add("l-7","levels/level-7.png")
                       .add("l-8","levels/level-8.png")
                       .add("l-9","levels/level-9.png")
                       .add("item-bolt","items/bolt.png")
                       .add("item-green","items/green.png")
                       .add("item-flame","items/flame.png")
                       .add("tiles","mapTiles.png");
        this.app.loader.onComplete.add(function(){that.creatingCombinedGraphics()})
        this.app.loader.load();
    }

    creatingCombinedGraphics(){
        this.createScreens();
        this.createTextureSheets();
    }

    /**
     * Creates the different screens for the game
     */
    createScreens(){
        //Title Screen
        let fontsize = 10;
        {
            let background = new PIXI.Graphics();
            background.beginFill(0xA0A0A0);
            background.drawRect(0, 0, 900, 600);
            background.endFill();     
            this.titleScreen.addChild(background);
            let button = new PIXI.Sprite(this.app.loader.resources["playBtn"].texture);
            button.anchor.set(0);
            button.x = 200;
            button.y = 250;
            button.interactive = true;
            button.buttonMode = true;
            button.on("pointerup",()=>{this.titleScreen.visible = false;
                                       this.levelSelectScreen.visible = true;})
            this.titleScreen.addChild(button);
            button = new PIXI.Sprite(this.app.loader.resources["helpBtn"].texture);
            button.anchor.set(0);
            button.x = 500;
            button.y = 250;
            button.interactive = true;
            button.buttonMode = true;
            button.on("pointerup",()=>{this.titleScreen.visible = false;
                                       this.helpScreen.lastScreen = "titleScreen";
                                       this.helpScreen.visible = true;})
            this.titleScreen.addChild(button);
            this.titleScreen.zIndex = 1000;
            this.app.stage.addChild(this.titleScreen);
        }
        //Pause Screen
        {
            let background = new PIXI.Sprite(this.app.loader.resources["flare"].texture);
            this.menuScreen.addChild(background);
            let text = new PIXI.Text('Pause',{fontFamily : 'Arial', fontSize: fontsize, fill : 0x0a0a0a, align : 'center'});
            text.height = 100;
            text.width = 200;
            text.resolution = 100;
            text.anchor.set(0);
            text.x = 350;
            text.y = 25;
            this.menuScreen.addChild(text);  
            
            let button = new PIXI.Sprite(this.app.loader.resources["playBtn"].texture);
            button.anchor.set(0);
            button.x = 350;
            button.y = 225;
            button.interactive = true;
            button.buttonMode = true;
            button.on("pointerup",()=>{this.menuScreen.visible = false; 
                                       this.app.ticker.add(this.tickerFun);})
            this.menuScreen.addChild(button);

            button = new PIXI.Sprite(this.app.loader.resources["helpBtn"].texture);
            button.anchor.set(0);
            button.x = 350;
            button.y = 350;
            button.interactive = true;
            button.buttonMode = true;
            button.on("pointerup",()=>{this.helpScreen.lastScreen = "pauseScreen";
                                       this.menuScreen.visible = false;
                                       this.helpScreen.visible = true;})
            this.menuScreen.addChild(button);

            button = new PIXI.Sprite(this.app.loader.resources["extBtn"].texture);
            button.anchor.set(0);
            button.x = 350;
            button.y = 475;
            button.interactive = true;
            button.buttonMode = true;
            button.on("pointerup",()=>{this.FPSDisplay.visible = false;
                                       this.menuScreen.visible = false;
                                       this.gameMap.visible = false;
                                       this.titleScreen.visible = true;  
                                       this.cleanupGame()})
            this.menuScreen.addChild(button);
            
            this.menuScreen.zIndex = 997;
            this.menuScreen.visible = false;
            this.app.stage.addChild(this.menuScreen);
        }
        //Help Screen
        {
            let background = new PIXI.Sprite(this.app.loader.resources["flare"].texture);
            this.helpScreen.addChild(background);
            let text = new PIXI.Text('Controls:',{fontFamily : 'Arial', fontSize: fontsize, fill : 0x0a0a0a, align : 'center'});
            text.height = 100;
            text.width = 200;
            text.resolution = 100;
            text.anchor.set(0);
            text.x = 350;
            text.y = 60;
            this.helpScreen.addChild(text); 
            let image = new PIXI.Sprite(this.app.loader.resources["contrWASD"].texture);
            image.anchor.set(0);
            image.x = 210;
            image.y = 210;
            this.helpScreen.addChild(image);
            text = new PIXI.Text('Move',{fontFamily : 'Arial', fontSize: fontsize, fill : 0x0a0a0a, align : 'center'});
            text.height = 40;
            text.width = 80;
            text.resolution = 100;
            text.anchor.set(0);
            text.x = 310;
            text.y = 210;
            this.helpScreen.addChild(text);
            image = new PIXI.Sprite(this.app.loader.resources["contrR"].texture);
            image.anchor.set(0);
            image.x = 210;
            image.y = 270;
            this.helpScreen.addChild(image);
            text = new PIXI.Text('Reload',{fontFamily : 'Arial', fontSize: fontsize, fill : 0x0a0a0a, align : 'center'});
            text.height = 40;
            text.width = 80;
            text.resolution = 100;
            text.anchor.set(0);
            text.x = 310;
            text.y = 270;
            this.helpScreen.addChild(text);
            image = new PIXI.Sprite(this.app.loader.resources["contrEsc"].texture);
            image.anchor.set(0);
            image.x = 210;
            image.y = 330;
            this.helpScreen.addChild(image);
            text = new PIXI.Text('Pause',{fontFamily : 'Arial', fontSize: fontsize, fill : 0x0a0a0a, align : 'center'});
            text.height = 40;
            text.width = 80;
            text.resolution = 100;
            text.anchor.set(0);
            text.x = 310;
            text.y = 330;
            this.helpScreen.addChild(text);

            image = new PIXI.Sprite(this.app.loader.resources["contrMouseMove"].texture);
            image.anchor.set(0);
            image.x = 530;
            image.y = 210;
            this.helpScreen.addChild(image);
            text = new PIXI.Text('Aim',{fontFamily : 'Arial', fontSize: fontsize, fill : 0x0a0a0a, align : 'center'});
            text.height = 40;
            text.width = 80;
            text.resolution = 100;
            text.anchor.set(0);
            text.x = 630;
            text.y = 210;
            this.helpScreen.addChild(text);
            image = new PIXI.Sprite(this.app.loader.resources["contrMouseLClick"].texture);
            image.anchor.set(0);
            image.x = 530;
            image.y = 270;
            this.helpScreen.addChild(image);
            text = new PIXI.Text('Shoot',{fontFamily : 'Arial', fontSize: fontsize, fill : 0x0a0a0a, align : 'center'});
            text.height = 40;
            text.width = 80;
            text.resolution = 100;
            text.anchor.set(0);
            text.x = 630;
            text.y = 270;
            this.helpScreen.addChild(text);
            let button = new PIXI.Sprite(this.app.loader.resources["backBtn"].texture);
            button.anchor.set(0);
            button.x = 350;
            button.y = 440;
            button.interactive = true;
            button.buttonMode = true;
            button.on("pointerup",()=>{this.helpScreen.visible = false; 
                                       if(this.helpScreen.lastScreen == "pauseScreen"){this.menuScreen.visible = true;}
                                       else{this.titleScreen.visible = true}})
            this.helpScreen.addChild(button);
            this.helpScreen.zIndex = 999;
            this.helpScreen.visible = false;
            this.helpScreen.lastScreen = "titleScreen";
            this.app.stage.addChild(this.helpScreen)
        }
        //Game Over Screen
        {
            let background = new PIXI.Sprite(this.app.loader.resources["flare"].texture);
            this.endScreen.addChild(background);
            let text = new PIXI.Text('Game Over',{fontFamily : 'Arial', fontSize: fontsize, fill : 0x8B0000, align : 'center'});
            text.height = 100;
            text.width = 200;
            text.resolution = 100;
            text.anchor.set(0);
            text.x = 350;
            text.y = 125;
            this.endScreen.addChild(text);
            text = new PIXI.Text('Your score is: ---',{fontFamily : 'Arial', fontSize: fontsize, fill : 0x0a0a0a, align : 'center'});
            text.height = 50;
            text.width = 300;
            text.resolution = 100;
            text.anchor.set(0);
            text.x = 300;
            text.y = 275;
            this.endScreen.addChild(text);
            let button = new PIXI.Sprite(this.app.loader.resources["extBtn"].texture);
            button.anchor.set(0);
            button.x = 350;
            button.y = 375;
            button.interactive = true;
            button.buttonMode = true;
            button.on("pointerup", ()=>{this.endScreen.visible = false;
                                        this.gameMap.visible = false;
                                        this.FPSDisplay.visible = false;
                                        this.titleScreen.visible = true;
                                        this.cleanupGame()})
            this.endScreen.addChild(button);
            this.endScreen.zIndex = 998;
            this.endScreen.visible = false;
            this.app.stage.addChild(this.endScreen);
        }
        //Level Select Screen
        {
            let backgrounds = [];
            //Backgrounds
            {
                backgrounds[0] = new PIXI.Graphics();
                backgrounds[0].beginFill(0xA0A0A0);
                backgrounds[0].drawRect(0, 0, 900, 600);
                backgrounds[0].endFill();     
                this.levelSelectScreen.addChild(backgrounds[0]);

                for(var i = 1; i <= 9; i++){
                    let index = "l-" + i;
                    backgrounds[i] = new PIXI.Sprite(this.app.loader.resources[index].texture);
                    backgrounds[i].visible = false;
                    this.levelSelectScreen.addChild(backgrounds[i]);
                }
            }
            
            for(var i = 0; i < 9; i++){
                let level = i + 1; //i starts by 0 levels by 1
                let LSbutton = new PIXI.Sprite(new PIXI.Texture(this.app.loader.resources["levelBtns"].texture, new PIXI.Rectangle((i%3)*100,Math.floor(i/3)*100,100,100)));
                LSbutton.anchor.set(0.5);
                LSbutton.x = 275 + (i % 3) * 175;
                LSbutton.y = 230 + Math.floor(i / 3) * 140;
                LSbutton.interactive = true;
                LSbutton.buttonMode = true;
                LSbutton.on("pointerover", () => {for(let i = 0; i < backgrounds.length;i++){this.levelSelectScreen.children[i].visible = false;} 
                                                  this.levelSelectScreen.children[level].visible = true;})

                LSbutton.on("pointerout", () => {for(let i = 0; i < backgrounds.length;i++){this.levelSelectScreen.children[i].visible = false;}
                                                this.levelSelectScreen.children[0].visible = true;})

                LSbutton.on("pointerup", () => {this.levelSelectScreen.visible = false; 
                                                this.inizialiseGane(level)})
                this.levelSelectScreen.addChild(LSbutton);
            }
            let text = new PIXI.Text('Select Level',{fontFamily : 'Arial', fontSize: fontsize, fill : 0x0a0a0a, align : 'center'});
            text.height = 100;
            text.width = 450;
            text.resolution = 100;
            text.anchor.set(0);
            text.x = 225;
            text.y = 40;
            this.levelSelectScreen.addChild(text);
            this.levelSelectScreen.zIndex = 996;
            this.levelSelectScreen.visible = false;
            this.app.stage.addChild(this.levelSelectScreen)
        } 
        //UI
        {
            let background = new PIXI.Graphics();
            background.beginFill(0x3b3b3b);
            background.drawRect(0, 0, 900, 50);
            background.endFill();
            this.UI.addChild(background)
            let bullet = new PIXI.Sprite(this.app.loader.resources["weapon"].texture);
            bullet.anchor.set(0);
            bullet.x = 0;
            bullet.y = 0;
            this.UI.addChild(bullet);
            let text = new PIXI.Text('50/50',{fontFamily : 'Arial', fontSize: fontsize, fill : 0x0a0a0a, align : 'center'});
            text.height = 50;
            text.width = 150;
            text.resolution = 100;
            text.anchor.set(0);
            text.x = 50;
            text.y = 0;
            this.UI.addChild(text);
            text = new PIXI.Text('Next Wave:',{fontFamily : 'Arial', fontSize: fontsize, fill : 0x0a0a0a, align : 'center'});
            text.height = 50;
            text.width = 150;
            text.resolution = 100;
            text.anchor.set(0);
            text.x = 250;
            text.y = 0;
            this.UI.addChild(text); 
            let progressBar = new PIXI.Sprite(this.progressBarFrames[3]);
            progressBar.anchor.set(0);
            progressBar.x = 400;
            progressBar.y = 0;
            this.UI.addChild(progressBar);

            text = new PIXI.Text('Score:',{fontFamily : 'Arial', fontSize: fontsize, fill : 0x0a0a0a, align : 'center'});
            text.height = 50;
            text.width = 150;
            text.resolution = 100;
            text.anchor.set(0);
            text.x = 650;
            text.y = 0;
            this.UI.addChild(text); 

            this.UI.x = 0;
            this.UI.y = 600;
            this.UI.width = 900;
            this.UI.height = 50;
            this.UI.zIndex = 100;
            this.UI.visible = false;
            this.app.stage.addChild(this.UI);
        }
        //FPS Display
        {
            let background = new PIXI.Graphics();
            background.beginFill(0x000000);
            background.drawRect(0, 0, 40, 20);
            background.endFill();
            this.FPSDisplay.addChild(background)
            let text = new PIXI.Text('FPS: --',{fontFamily : 'Arial', fontSize: fontsize, fill : 0xffffff, align : 'center'});
            text.height = 20;
            text.width = 40;
            text.resolution = 100;
            text.anchor.set(0);
            text.x = 0;
            text.y = 0;
            this.FPSDisplay.addChild(text);

            this.FPSDisplay.x = 560;
            this.FPSDisplay.y = 0;
            this.FPSDisplay.width = 40;
            this.FPSDisplay.height = 20;
            this.FPSDisplay.zIndex = 120;
            this.FPSDisplay.visible = false;
            this.app.stage.addChild(this.FPSDisplay);
        }
    }

    /**
     * Creates the Texture sheets for the animations
     */
    createTextureSheets(){
        //Item textures
        this.itemTexures.push(this.app.loader.resources["item-bolt"].texture);
        this.itemTexures.push(this.app.loader.resources["item-green"].texture);
        this.itemTexures.push(this.app.loader.resources["item-flame"].texture)
        //Enemy Texture Sheets
        {
            let maxLevel = 1;
            for(let level = 0; level <= maxLevel; level++){
                let resourceID = "enemy" + level;
                let tmpSheet = new PIXI.BaseTexture.from(this.app.loader.resources[resourceID].url);
                let width = 25;
                let height = 25;
                this.enemyTextureSheets[level] = {};
                this.enemyTextureSheets[level].standDown = [
                    new PIXI.Texture(tmpSheet, new PIXI.Rectangle(2 * width, 1 * height, width, height))
                ];
                this.enemyTextureSheets[level].standUp = [
                    new PIXI.Texture(tmpSheet, new PIXI.Rectangle(1 * width, 1 * height, width, height))
                ];
                this.enemyTextureSheets[level].standRight = [
                    new PIXI.Texture(tmpSheet, new PIXI.Rectangle(3 * width, 1 * height, width, height))
                ];
                this.enemyTextureSheets[level].standLeft = [
                    new PIXI.Texture(tmpSheet, new PIXI.Rectangle(0 * width, 1 * height, width, height))
                ];
    
                this.enemyTextureSheets[level].walkDown = [
                    new PIXI.Texture(tmpSheet, new PIXI.Rectangle(2 * width, 0 * height, width, height)),
                    new PIXI.Texture(tmpSheet, new PIXI.Rectangle(2 * width, 1 * height, width, height)),
                    new PIXI.Texture(tmpSheet, new PIXI.Rectangle(2 * width, 2 * height, width, height))
                ];
                this.enemyTextureSheets[level].walkUp = [
                    new PIXI.Texture(tmpSheet, new PIXI.Rectangle(1 * width, 0 * height, width, height)),
                    new PIXI.Texture(tmpSheet, new PIXI.Rectangle(1 * width, 1 * height, width, height)),
                    new PIXI.Texture(tmpSheet, new PIXI.Rectangle(1 * width, 2 * height, width, height))
                ];
                this.enemyTextureSheets[level].walkRight = [
                    new PIXI.Texture(tmpSheet, new PIXI.Rectangle(3 * width, 0 * height, width, height)),
                    new PIXI.Texture(tmpSheet, new PIXI.Rectangle(3 * width, 1 * height, width, height)),
                    new PIXI.Texture(tmpSheet, new PIXI.Rectangle(3 * width, 2 * height, width, height))
                ];
                this.enemyTextureSheets[level].walkLeft = [
                    new PIXI.Texture(tmpSheet, new PIXI.Rectangle(0 * width, 0 * height, width, height)),
                    new PIXI.Texture(tmpSheet, new PIXI.Rectangle(0 * width, 1 * height, width, height)),
                    new PIXI.Texture(tmpSheet, new PIXI.Rectangle(0 * width, 2 * height, width, height))
                ];
            }
        }
        //Player Texture Sheet
        {
            let tmpSheet = new PIXI.BaseTexture.from(this.app.loader.resources["player"].url);
            let width = 25;
            let height = 25;
            this.playerTextureSheet.standDown = [
                new PIXI.Texture(tmpSheet, new PIXI.Rectangle(1 * width, 1 * height, width, height))
            ];
            this.playerTextureSheet.standUp = [
                new PIXI.Texture(tmpSheet, new PIXI.Rectangle(2 * width, 1 * height, width, height))
            ];
            this.playerTextureSheet.standRight = [
                new PIXI.Texture(tmpSheet, new PIXI.Rectangle(3 * width, 1 * height, width, height))
            ];
            this.playerTextureSheet.standLeft = [
                new PIXI.Texture(tmpSheet, new PIXI.Rectangle(0 * width, 1 * height, width, height))
            ];

            this.playerTextureSheet.walkDown = [
                new PIXI.Texture(tmpSheet, new PIXI.Rectangle(1 * width, 0 * height, width, height)),
                new PIXI.Texture(tmpSheet, new PIXI.Rectangle(1 * width, 1 * height, width, height)),
                new PIXI.Texture(tmpSheet, new PIXI.Rectangle(1 * width, 2 * height, width, height))
            ];
            this.playerTextureSheet.walkUp = [
                new PIXI.Texture(tmpSheet, new PIXI.Rectangle(2 * width, 0 * height, width, height)),
                new PIXI.Texture(tmpSheet, new PIXI.Rectangle(2 * width, 1 * height, width, height)),
                new PIXI.Texture(tmpSheet, new PIXI.Rectangle(2 * width, 2 * height, width, height))
            ];
            this.playerTextureSheet.walkRight = [
                new PIXI.Texture(tmpSheet, new PIXI.Rectangle(3 * width, 0 * height, width, height)),
                new PIXI.Texture(tmpSheet, new PIXI.Rectangle(3 * width, 1 * height, width, height)),
                new PIXI.Texture(tmpSheet, new PIXI.Rectangle(3 * width, 2 * height, width, height))
            ];
            this.playerTextureSheet.walkLeft = [
                new PIXI.Texture(tmpSheet, new PIXI.Rectangle(0 * width, 0 * height, width, height)),
                new PIXI.Texture(tmpSheet, new PIXI.Rectangle(0 * width, 1 * height, width, height)),
                new PIXI.Texture(tmpSheet, new PIXI.Rectangle(0 * width, 2 * height, width, height))
            ];
        }
        //Next Wave Progress Bar Frames
        {
            let tmpSheet = new PIXI.BaseTexture.from(this.app.loader.resources["progrBarNextWave"].url);
            let width = 200;
            let height = 50;
            this.progressBarFrames = [
                new PIXI.Texture(tmpSheet, new PIXI.Rectangle(0*width,0*height,width,height)),
                new PIXI.Texture(tmpSheet, new PIXI.Rectangle(0*width,1*height,width,height)),
                new PIXI.Texture(tmpSheet, new PIXI.Rectangle(0*width,2*height,width,height)),
                new PIXI.Texture(tmpSheet, new PIXI.Rectangle(0*width,3*height,width,height))
            ]
        }
    }

    /**
     * Fetches the level, creates the map spawns the player and the first wave of enemies and starts the ticker
     * @param {Number} level Which level should be loaded
     */
    async inizialiseGane(level){
        let tmp = await this.fetchLevel();
        this.level = tmp[level-1];

        var i = 0;
        var backgroundTextures = [];
        for(i = 0; i < 16; i++){
            let x = i % 8;
            let y = Math.floor (i / 8);
            backgroundTextures[i] = new PIXI.Texture(
                                    this.app.loader.resources["tiles"].texture,
                                    new PIXI.Rectangle(x*this.level.map.tileSize,y*this.level.map.tileSize,this.level.map.tileSize,this.level.map.tileSize));
        }
        for(let y = 0; y < this.level.map.height; y++){
            for(let x = 0; x < this.level.map.width; x++){
                let tile =  this.level.map.tiles[y][x];
                let tileSprite = new MapObject(x * this.level.map.tileSize + 15,y * this.level.map.tileSize + 15, backgroundTextures[tile], (tile > 5 ? true : false));
                this.gameMap.addChild(tileSprite);
            }
        }

        this.score = 0;
        this.UI.visible = true;
        this.gameMap.visible = true;
        this.gameMap.zIndex = 1;
        this.gameMap.cacheAsBitmap = true;
        this.app.stage.addChild(this.gameMap);

        for(var i = 0; i < this.level.enemyCount; i++){
            this.enemies.push(new Enemie(this.level.enemySpawnLocation[i].x,this.level.enemySpawnLocation[i].y,this.enemyTextureSheets[0],{hp:15,speed:3},this.gameMap, (object1,object2) => {return this.isColiding(object1,object2);}));
            this.app.stage.addChild(this.enemies[i]);
        }

        this.player = new Player(this.level.playerSpawnLocation.x,this.level.playerSpawnLocation.y, this.playerTextureSheet,(object1,object2) => {return this.isColiding(object1,object2);});
        this.app.stage.addChild(this.player);

        this.app.ticker.add(this.tickerFun);
    }
    
    /**
     * Gets two sprite objects and returns true or false if they are coliding
     * @param {PIXI.Sprite} object1 
     * @param {PIXI.Sprite} object2 
     */
    isColiding(object1,object2){
        if(object1 != undefined && object2 != undefined){
            var rec1 = object1.getBounds();
            var rec2 = object2.getBounds();
            return rec1.contains(rec2.x,rec2.y) ||
                   rec1.contains(rec2.x + rec2.width,rec2.y) ||
                   rec1.contains(rec2.x,rec2.y+rec2.height) ||
                   rec1.contains(rec2.x + rec2.width, rec2.y + rec2.height);
        }
        else{
            console.log("Huston, we have a problem")
            return false;
        }
    }

    /**
     * Resets all values and destroys all no longer needed objects
     */
    cleanupGame(){
        var i = 0;
        for(i = 0; i < this.enemies.length; i++){
            this.enemies[i].destroy();
        }
        for(i = 0; i < this.items.length; i++){
            this.items[i].destroy();
        }
        for(i = 0; i < this.bullets.length; i++){
            this.bullets[i].destroy();
        }
        for(i = 0; i < this.gameMap.children.length; i++){
            this.gameMap.children[i].destroy();
        }
        this.amonition = 50;
        this.cnt = 0;
        this.UI.children[4].texture = this.progressBarFrames[3];
        this.UI.visible = false;
        this.enemies = [];
        this.bullets = [];
        this.items = [];
        this.isReloading = false;
        this.UI.children[2].text = this.amonition + "/50";
        this.gameMap = new PIXI.Container();
        this.player.destroy();
        this.app.ticker.remove(this.tickerFun);
        this.app.ticker.start()
    }

    /**
     * Pauses the game
     * @param {String} condition The reason why the game is paused
     */
    pauseGame(condition){
        this.app.ticker.remove(this.tickerFun);
        if(condition == "pause"){
            this.menuScreen.visible = true;
        }
        else if(condition == "gameover"){
            this.endScreen.children[2].text = "Your score is: " + this.score;
            this.endScreen.visible = true;
        }
    }

    getRandomNonWallPosition(){
        let pos = {};
        while(1){
            pos.x = Math.round(Math.random() * 29);
            pos.y = Math.round(Math.random() * 19);
            let index = pos.y * 30 + pos.x;
            if(!this.gameMap.children[index].isSolid){
                break;
            }
        }
        pos.x = pos.x*30+10;
        pos.y = pos.y*30+10;
        return pos;
    }

    /**
     * Main game loop. 
     */
    gameLoop(){
        //Check for Esc-Key
        if(this.pressedKeys["27"]){
            this.pauseGame("pause");
        }
        //Moves the player
        this.items = this.player.move(this.pressedKeys,this.gameMap,this.items);
        //UpdatesItems
        for(var i = 0; i < this.items.length; i++){
            if(this.items[i].status == "forDeletion"){
                this.items[i].destroy();
                this.app.stage.removeChild(this.items[i]);
                this.items.splice(i,1);
            }
            else{
                this.items[i].update();
            }
        }
       
        //Spawns random item
        if(this.cnt % 50 == 0 && this.items.length < 10 + this.player.numOfUsedItems){
            let pos = this.getRandomNonWallPosition();
            let id = Math.round(Math.random()*2);
            this.items.push(new Item(pos.x,pos.y,this.itemTexures,id));
            this.app.stage.addChild(this.items[this.items.length-1]);
        }

        //Check for shooting and reloading
        if(this.pointerdown && this.amonition > 0 && this.cnt % this.player.stats.shootingSpeed == 0 && !this.isReloading){
            this.shoot();
        }

        if(this.pressedKeys["82"] && !this.isReloading || this.cnt - this.reloadingTime > 100 && this.isReloading){
            this.reload();
        }

        //Updates all bullets on screen
        if(this.bullets.length > 0){
            for(var i = 0; i < this.bullets.length; i++){
                let tmp = this.bullets[i].updateBullet(this.enemies,this.gameMap);
                if(tmp[0] == "f"){
                    if(tmp[1] == "o"){
                        this.bullets[i].destroy();
                        this.app.stage.removeChild(this.bullets[i]);
                        this.bullets.splice(i,1);
                    }
                    else if(tmp[1] == "e"){
                        let dmg = this.player.stats.damage;
                        this.bullets[i].destroy();
                        this.app.stage.removeChild(this.bullets[i]);
                        this.bullets.splice(i,1);
                        if(this.enemies[tmp[2]].gotHit(dmg)){
                            this.score += 10;
                            this.enemies[tmp[2]].destroy();
                            this.app.stage.removeChild(this.enemies[tmp[2]]);
                            this.enemies.splice(tmp[2],1);
                        }
                    }
                }
            }
        }
        
        //Updates all enemies on screen
        if(this.enemies.length > 0){
           for(var i = 0; i < this.enemies.length; i++){
                if(this.enemies[i].updateEnemy(this.player)){
                    this.pauseGame("gameover");
                }
            } 
        }
        
        //Updates for UI
        //Updates the Next-Wave-Progressbar
        this.UI.children[4].texture = this.progressBarFrames[Math.round(((300 - (this.cnt % 300)) / 100))];
        if(this.cnt % 300 == 0 && this.cnt != 0 && this.enemies.length < 50){
            for(var i = 0; i < this.level.enemyCount; i++){
                let level = Math.round(Math.random());
                this.enemies.push(new Enemie(this.level.enemySpawnLocation[i].x,this.level.enemySpawnLocation[i].y,this.enemyTextureSheets[level],{hp:15 + 5 * level,speed:3 + level},this.gameMap,(object1,object2) => {return this.isColiding(object1,object2);}));
                this.app.stage.addChild(this.enemies[this.enemies.length - 1]);
            }
        }
        //Updates the score
        this.UI.children[5].text = "Score: " + this.score;
        if(this.score >= 100){
            this.UI.children[5].width = 200;
        }
        if(this.score >= 1000){
            this.UI.children[5].width = 250;
        }
        //Updates the FPS display
        document.getElementById("FPS").innerHTML = "FPS: " + Math.round(this.app.ticker.FPS);
        this.cnt++;
    }

    shoot(){
        let dy = (this.player.y-this.pointerPos.y);
        let dx = (this.player.x-this.pointerPos.x);
        let angle = Math.atan2(dy,dx);
        this.bullets.push(new Bullet(this.player.x,
                                     this.player.y,
                                     angle,
                                     this.app.loader.resources.bullet.texture,
                                     (object1,object2) => {return this.isColiding(object1,object2);}));
        this.app.stage.addChild(this.bullets[this.bullets.length - 1])
        this.amonition -= 1;
        this.UI.children[2].text = this.amonition + "/50";
    }

    reload(){
        if(this.isReloading){
            this.isReloading = false;
            this.amonition = 50;
            this.UI.children[2].text = this.amonition + "/50";
        }
        else{
            this.isReloading = true;
            this.reloadingTime = this.cnt;
            this.UI.children[2].text = "Reloading...";
        }
    }
}

