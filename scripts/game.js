window.onload = function(){
    game = new Game();
    let test = game.loadGame();
}

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

class Game{
    constructor(){
        var that = this;
        this.pressedKeys = {};
        this.playerSpeed = 5;
        this.enemies = [];
        this.app;
        this.player;
        this.background;
        this.bullets = [];
        this.gameMap = new PIXI.Container();
        this.enemyTextureSheet = {};
        this.isReloading = false;
        this.reloadingTime;
        this.amonition = 100;
        this.pointerdown = false;
        this.cnt = 0;
        this.pointerPos;


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

    loadGame(){
        var that = this;
        this.app = new PIXI.Application(
            {
                width: map.width * map.tileSize,
                height: map.width * map.tileSize,
                backgroundColor: "0xAAAAAA",
            }
        );
        document.querySelector("#gameDiv").appendChild(this.app.view);
        this.app.stage.interactive = true;
        this.app.stage.on("pointerdown", function(e){that.pointerdown = true;
                                                     that.pointerPos = e.data.global;});
        this.app.stage.on("pointerup", function(){that.pointerdown = false;});

        this.app.loader.baseUrl = "graphics";
        this.app.loader.add("player","player.png")
                       .add("bullet","bullet.png")
                       .add("background","field.png")
                       .add("wall","wall.png")
                       .add("enemy","enemy_new.png")
                       .add("tiles","mapTiles.png");
        this.app.loader.onComplete.add(function(){that.createTextureSheets()});
        this.app.loader.load();
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

        this.inizialiseGane();
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
        this.app.stage.addChild(this.gameMap);


        for(var i = 0; i < 3; i++){
            this.enemies.push(new Enemie(500,100 + 200 * i,this.enemyTextureSheet,"level1",(object1,object2) => {return this.isColiding(object1,object2);}));
            this.app.stage.addChild(this.enemies[i]);
        }
        


        this.player = new Player(300,300,this.app.loader.resources["player"].texture,(object1,object2) => {return this.isColiding(object1,object2);});
        this.app.stage.addChild(this.player);

        this.app.ticker.add(function(){that.gameLoop()});
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

    gameLoop(){
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
            if(this.enemies[i].update(this.player,this.gameMap)){
                console.log("YOU DIED")
            }
        }
        
        document.getElementById("nextWave").innerHTML = "Enemies in " + Math.round(((300 - (this.cnt % 300)) / 100));
        if(this.cnt % 300 == 0){
            for(var i = 0; i < 3; i++){
                this.enemies.push(new Enemie(500,100 + 200 * i,this.enemyTextureSheet,"level1",(object1,object2) => {return this.isColiding(object1,object2);}));
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

