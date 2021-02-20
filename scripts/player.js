class Player extends PIXI.AnimatedSprite{
    constructor(posX,posY,textureSheet,collisionFkt){
        super(textureSheet.standDown)
        this.textureSheet = textureSheet;
        this.animationSpeed = 0.5;
        this.loop = false;
        this.anchor.set(0.5)
        this.x = posX;
        this.y = posY;
        this.zIndex = 4;
        this.speed = 5
        this.colFkt = collisionFkt;
        this.hitBox = "rectangular";
        this.play();
    }

    move(pressedKeys,map){
        var i = 0;
        //Moving Up
        if(pressedKeys["87"]){
            this.y -= this.speed;
            this.playWalkAnimation("up");
            for(i = 0; i < map.children.length; i++){
                if(map.children[i].isSolid){
                    if(this.colFkt(map.children[i],this)){
                        this.y = map.children[i].y + 28;
                    }
                }
            }
        }
        //Moving Down
        if(pressedKeys["83"]){
            this.y += this.speed;
            this.playWalkAnimation("down");
            for(i = 0; i < map.children.length; i++){
                if(map.children[i].isSolid){
                    if(this.colFkt(map.children[i],this)){
                        this.y = map.children[i].y - 28;
                    }
                }
            }
        }
        //Moving Right
        if(pressedKeys["68"]){
            this.x += this.speed;
            this.playWalkAnimation("right");
            for(i = 0; i < map.children.length; i++){
                if(map.children[i].isSolid){
                    if(this.colFkt(map.children[i],this)){
                        this.x = map.children[i].x - 28;
                    }
                }
            }
        }
        //Moving Left
        if(pressedKeys["65"]){
            this.x -= this.speed;
            this.playWalkAnimation("left");
            for(i = 0; i < map.children.length; i++){
                if(map.children[i].isSolid){
                    if(this.colFkt(map.children[i],this)){
                        this.x = map.children[i].x + 28;
                    }
                }
            }
        }
    }

    playWalkAnimation(direction){
        if(!this.playing){
            if(direction == "up"){
                this.textures = this.textureSheet.walkUp;
                this.loop = false;
                this.play();
            }
            else if(direction == "down"){
                this.textures = this.textureSheet.walkDown;
                this.loop = false;
                this.play();
            }
            else if(direction == "right"){
                this.textures = this.textureSheet.walkRight;
                this.loop = false;
                this.play();
            }
            else if(direction == "left"){
                this.textures = this.textureSheet.walkLeft;
                this.loop = false;
                this.play();
            }
        }
    }

}