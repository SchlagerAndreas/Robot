class Bullet extends PIXI.Sprite{
    constructor(posX,posY,angle,texture,collisionFkt){
        super(texture);
        this.anchor.set(0.5,0.5);
        this.pivot.set(5,5);
        this.x = posX;
        this.y = posY;
        this.zIndex = 2;
        this.speed = 12;
        this.colFkt = collisionFkt;
        this.rotation = Math.PI + angle;
        this.movAngle = angle;
        this.hitBox = "rectangular";
    }

    /**
     * Moves the bullet and check if somthing, either a wall or an enemie is hit
     * @param {Array} enemies Array of all enemies  
     * @param {Pixi.Container} objects Game Map
     */
    updateBullet(enemies,map){
        let tile = this.getTile(this.x,this.y);
        let upLeftTile = tile - 30 - 1;
        let downLeftTile = tile + 30 - 1;
        let leftTile = tile - 1;
        this.y -= this.speed * Math.sin(this.movAngle);
        this.x -= this.speed * Math.cos(this.movAngle);
        for(i = 0; i < 3; i++){
            if(map.children[upLeftTile+i].isSolid){
                if(this.colFkt(map.children[upLeftTile+i],this)){
                    return ("fo");
                }
            }
        }
        for(i = 0; i < 3; i++){
            if(map.children[downLeftTile+i].isSolid){
                if(this.colFkt(map.children[downLeftTile+i],this)){
                    return ("fo");
                }
            }
        }
        for(i = 0; i < 3; i++){
            if(map.children[leftTile+i].isSolid){
                if(this.colFkt(map.children[leftTile+i],this)){
                    return ("fo");
                }
            }
        }
        for(var i = 0; i < enemies.length; i++){
            if(this.colFkt(enemies[i],this)){
                return ("fe" + i);
            }
        }
        return "t";
    }
    /**
     * Gets the x and y coordinate of a sprite and calculates the index of the maptile its in
     * @param {Number} x x-coordinate of the sprite
     * @param {Number} y y-coordinate of the sprite
     */
    getTile(x,y){
        let tileX = Math.floor(x / 30);
        let tileY = Math.floor(y / 30);
        tileY = tileY == 30 ? 29 : tileY;
        tileX = tileX == 30 ? 29 : tileX;
        let tileIndex = tileY * 30 + tileX;
        return tileIndex;
    }
}