class Player extends PIXI.Sprite{
    constructor(posX,posY,texture,collisionFkt){
        super(texture)
        this.anchor.set(0.5)
        this.x = posX;
        this.y = posY;
        this.zIndex = 4;
        this.speed = 5
        this.colFkt = collisionFkt;
        this.hitBox = "rectangular";
    }

    move(pressedKeys,map){
        var i = 0;
        //Moving Up
        if(pressedKeys["87"]){
            this.y -= this.speed;
            for(i = 0; i < map.children.length; i++){
                if(map.children[i].isSolid){
                    if(this.colFkt(this,map.children[i])){
                        this.y = map.children[i].y + 21;
                    }
                }
            }
        }
        //Moving Down
        if(pressedKeys["83"]){
            this.y += this.speed;
            for(i = 0; i < map.children.length; i++){
                if(map.children[i].isSolid){
                    if(this.colFkt(this,map.children[i])){
                        this.y = map.children[i].y - 21;
                    }
                }
            }
        }
        //Moving Right
        if(pressedKeys["68"]){
            this.x += this.speed;
            for(i = 0; i < map.children.length; i++){
                if(map.children[i].isSolid){
                    if(this.colFkt(this,map.children[i])){
                        this.x = map.children[i].x - 21;
                    }
                }
            }
        }
        //Moving Left
        if(pressedKeys["65"]){
            this.x -= this.speed;
            for(i = 0; i < map.children.length; i++){
                if(map.children[i].isSolid){
                    if(this.colFkt(this,map.children[i])){
                        this.x = map.children[i].x + 21;
                    }
                }
            }
        }
    }

}