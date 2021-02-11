

let map = {
    width : 30,
    height : 30,
    tileSize: 20,
    tiles : [
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,
        0,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,
        0,2,2,2,2,2,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,
        0,2,2,2,2,2,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,
        0,2,2,2,2,2,0,0,0,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,0,
        0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,0,
        0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,
        0,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,
        0,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,0,
        0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,0,
        0,2,2,2,2,2,2,1,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,
        0,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,
        0,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,0,0,0,2,2,2,2,2,2,0,
        0,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,0,0,0,2,2,2,2,2,2,0,
        0,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,0,0,0,2,2,2,2,2,2,0,
        0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,
        0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,
        0,2,2,2,2,2,2,2,1,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,0,
        0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,
        0,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,
        0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,
        0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,
        0,2,2,2,2,2,2,0,0,0,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,0,
        0,2,2,2,2,2,2,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,
        0,2,2,2,2,2,2,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,
        0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,
        0,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,
        0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    ]
}

/*
zIndexes:
TitleScreen: 1000
EndScreen: 999
MenuScreen: 998


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
        this.amonition = 100;
        //Screens
        this.titleScreen = new PIXI.Container();
        this.menuScreen = new PIXI.Container();
        this.endScreen = new PIXI.Container();
        //Game Objects
        this.app;
        this.level;
        this.gameMap = new PIXI.Container();
        this.enemies = [];
        this.enemyTextureSheet = {};
        this.bullets = [];
        this.player;
       
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

    loadLevel(levelnumber){
        this.fetchLevel().then(data => this.level = data[levelnumber]);

    }

    error(){

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
                width: 600,
                height: 600,
                backgroundColor: "0xAAAAAA",
            }
        );
        document.querySelector("#gameDiv").appendChild(this.app.view);
        this.app.stage.interactive = true;
        this.app.stage.sortableChildren = true;
        this.app.stage.on("pointerdown", function(e){that.pointerdown = true;
                                                     that.pointerPos = e.data.global;});
        this.app.stage.on("pointerup", function(){that.pointerdown = false;});

        this.app.loader.baseUrl = "graphics";
        this.app.loader.add("player","new_player.png")
                       .add("bullet","bullet.png")
                       .add("background","field.png")
                       .add("wall","wall.png")
                       .add("enemy","enemy_new.png")
                       .add("titlescreen", "titlescreen.png")
                       .add("playBtn","play-button.png")
                       .add("extBtn","exit-button.png")
                       .add("tiles","mapTiles.png");
        this.app.loader.onComplete.add(function(){that.creatingCombinedGraphics()})
        this.app.loader.load();
    }

    creatingCombinedGraphics(){
        this.createScreens();
        this.createTextureSheets();
    }

    createScreens(){
        var background = new PIXI.Sprite(this.app.loader.resources["titlescreen"].texture);
        background.anchor.set(0.5);
        background.x = 300;
        background.y = 300;
        this.titleScreen.addChild(background);
        var TSbutton = new PIXI.Sprite(this.app.loader.resources["playBtn"].texture);
        TSbutton.anchor.set(0.5);
        TSbutton.x = 300;
        TSbutton.y = 300;
        TSbutton.interactive = true;
        TSbutton.buttonMode = true;
        TSbutton.on("pointerup",()=>{this.titleScreen.visible = false; 
                                     this.inizialiseGane()})
        this.titleScreen.addChild(TSbutton);
        this.titleScreen.zIndex = 1000;
        this.app.stage.addChild(this.titleScreen);

        var MSbuttonExt = new PIXI.Sprite(this.app.loader.resources["extBtn"].texture);
        MSbuttonExt.anchor.set(0.5);
        MSbuttonExt.x = 150;
        MSbuttonExt.y = 300;
        MSbuttonExt.interactive = true;
        MSbuttonExt.buttonMode = true;
        MSbuttonExt.on("pointerup",()=>{
                                        this.menuScreen.visible = false;
                                        this.gameMap.visible = false;
                                        this.titleScreen.visible = true;  
                                        this.cleanupGame()})

        var MSbuttonPlay = new PIXI.Sprite(this.app.loader.resources["playBtn"].texture);
        MSbuttonPlay.anchor.set(0.5);
        MSbuttonPlay.x = 450;
        MSbuttonPlay.y = 300;
        MSbuttonPlay.interactive = true;
        MSbuttonPlay.buttonMode = true;
        MSbuttonPlay.on("pointerup",()=>{this.menuScreen.visible = false; 
                                         this.app.ticker.start()})
        this.menuScreen.addChild(MSbuttonExt);
        this.menuScreen.addChild(MSbuttonPlay);
        this.menuScreen.zIndex = 998;
        this.menuScreen.visible = false;
        this.app.stage.addChild(this.menuScreen);

        var ESbutton = new PIXI.Sprite(this.app.loader.resources["extBtn"].texture);
        ESbutton.anchor.set(0.5);
        ESbutton.x = 300;
        ESbutton.y = 300;
        ESbutton.interactive = true;
        ESbutton.buttonMode = true;
        ESbutton.on("pointerup", ()=>{this.endScreen.visible = false;
                                      this.gameMap.visible = false;
                                      this.titleScreen.visible = true;
                                      this.cleanupGame()})
        this.endScreen.addChild(ESbutton);
        this.endScreen.zIndex = 999;
        this.endScreen.visible = false;
        this.app.stage.addChild(this.endScreen); 
    }

    createTextureSheets(){
        let tmpSheet = new PIXI.BaseTexture.from(this.app.loader.resources["enemy"].url);
        let width = 20;
        let height = 20;
        this.enemyTextureSheet.standDown = [
            new PIXI.Texture(tmpSheet, new PIXI.Rectangle(2 * width, 0 * height, width, height))
        ];
        this.enemyTextureSheet.standUp = [
            new PIXI.Texture(tmpSheet, new PIXI.Rectangle(1 * width, 0 * height, width, height))
        ];
        this.enemyTextureSheet.standRight = [
            new PIXI.Texture(tmpSheet, new PIXI.Rectangle(3 * width, 0 * height, width, height))
        ];
        this.enemyTextureSheet.standLeft = [
            new PIXI.Texture(tmpSheet, new PIXI.Rectangle(0 * width, 0 * height, width, height))
        ];

        this.enemyTextureSheet.walkDown = [
            new PIXI.Texture(tmpSheet, new PIXI.Rectangle(2 * width, 0 * height, width, height)),
            new PIXI.Texture(tmpSheet, new PIXI.Rectangle(2 * width, 1 * height, width, height))
        ];
        this.enemyTextureSheet.walkUp = [
            new PIXI.Texture(tmpSheet, new PIXI.Rectangle(1 * width, 0 * height, width, height)),
            new PIXI.Texture(tmpSheet, new PIXI.Rectangle(1 * width, 1 * height, width, height))
        ];
        this.enemyTextureSheet.walkRight = [
            new PIXI.Texture(tmpSheet, new PIXI.Rectangle(3 * width, 0 * height, width, height)),
            new PIXI.Texture(tmpSheet, new PIXI.Rectangle(3 * width, 1 * height, width, height))
        ];
        this.enemyTextureSheet.walkLeft = [
            new PIXI.Texture(tmpSheet, new PIXI.Rectangle(0 * width, 0 * height, width, height)),
            new PIXI.Texture(tmpSheet, new PIXI.Rectangle(0 * width, 1 * height, width, height))
        ];
    }

    inizialiseGane(){
        var that = this;
        var i = 0;
        var backgroundTextures = [];
        for(i = 0; i < 10; i++){
            let x = i % 5;
            let y = Math.floor (i / 5);
            backgroundTextures[i] = new PIXI.Texture(
                                    this.app.loader.resources["tiles"].texture,
                                    new PIXI.Rectangle(x*map.tileSize,y*map.tileSize,map.tileSize,map.tileSize));
        }
        for(let y = 0; y < map.width; y++){
            for(let x = 0; x < map.width; x++){
                let tile =  map.tiles[y * map.width + x];
                let tileSprite = new MapObject(x * map.tileSize + 10,y * map.tileSize + 10, backgroundTextures[tile], (tile == 0 ? true : false));
                this.gameMap.addChild(tileSprite);
            }
        }
        this.gameMap.visible = true;
        this.gameMap.zIndex = 1;
        this.app.stage.addChild(this.gameMap);




        for(var i = 0; i < 1; i++){
            this.enemies.push(new Enemie(500,100 + 200 * i,this.enemyTextureSheet,"level1",this.gameMap, (object1,object2) => {return this.isColiding(object1,object2);}));
            this.app.stage.addChild(this.enemies[i]);
        }
        


        this.player = new Player(300,300,new PIXI.Texture(this.app.loader.resources["player"].texture, new PIXI.Rectangle(40,20,20,20)),(object1,object2) => {return this.isColiding(object1,object2);});
        this.app.stage.addChild(this.player);


        

        this.app.ticker.add(this.tickerFun);
    }
    
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
            return false;
        }
    }

    cleanupGame(){
        var i = 0;
        for(i = 0; i < this.enemies.length; i++){
            this.enemies[i].destroy();
        }
        for(i = 0; i < this.bullets.length; i++){
            this.bullets[i].destroy();
        }
        for(i = 0; i < this.gameMap.children.length; i++){
            this.gameMap.children[i].destroy();
        }
        this.enemies = [];
        this.bullets = [];
        this.gameMap = new PIXI.Container();
        this.player.destroy();
        this.app.ticker.remove(this.tickerFun);
        this.app.ticker.start()
    }

    pauseGame(condition){
        this.app.ticker.stop();
        if(condition == "pause"){
            this.menuScreen.visible = true;
        }
        else if(condition == "gameover"){
            this.endScreen.visible = true;
        }
    }

    gameLoop(){
        if(this.pressedKeys["27"]){
            this.pauseGame("pause");
        }

        this.player.move(this.pressedKeys,this.gameMap);
       
        if(this.pointerdown && this.amonition > 0 && this.cnt % 3 == 0 && !this.isReloading){
            this.shoot();
        }

        if(this.pressedKeys["82"] && !this.isReloading || this.cnt - this.reloadingTime > 100 && this.isReloading){
            this.reload();
        }

        for(var i = 0; i < this.bullets.length; i++){
            let tmp = this.bullets[i].updateBullet(this.enemies,this.gameMap);
            if(tmp[0] == "f"){
                if(tmp[1] == "o"){
                    this.app.stage.removeChild(this.bullets[i]);
                    this.bullets.splice(i,1);
                }
                else if(tmp[1] == "e"){
                    this.app.stage.removeChild(this.bullets[i]);
                    this.bullets.splice(i,1);
                    this.app.stage.removeChild(this.enemies[tmp[2]]);
                    this.enemies.splice(tmp[2],1);
                }
            }
        }
        
        for(var i = 0; i < this.enemies.length; i++){
            if(this.enemies[i].updateEnemy(this.player)){
                console.log("YOU DIED")
                this.pauseGame("gameover");
            }
        }
        
        document.getElementById("nextWave").innerHTML = "Enemies in " + Math.round(((300 - (this.cnt % 300)) / 100));
        if(this.cnt % 300 == 0){
            for(var i = 0; i < 3; i++){
                this.enemies.push(new Enemie(500,100 + 200 * i,this.enemyTextureSheet,"level1",this.gameMap,(object1,object2) => {return this.isColiding(object1,object2);}));
                this.app.stage.addChild(this.enemies[this.enemies.length - 1]);
            }
        }
        
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
        document.getElementById("ammo").innerHTML = "Ammo: " + this.amonition + "/100";
    }

    reload(){
        if(this.isReloading){
            this.isReloading = false;
            this.amonition = 100;
            document.getElementById("ammo").innerHTML = "Ammo: " + this.amonition + "/100";
        }
        else{
            this.isReloading = true;
            this.reloadingTime = this.cnt;
            document.getElementById("ammo").innerHTML = "Ammo: Reloading...";
        }
    }
}

