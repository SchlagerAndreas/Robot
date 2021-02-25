class Bullet extends PIXI.Sprite{
    constructor(posX,posY,angle,texture,collisionFkt){
        super(texture);
        this.anchor.set(0.5,0.5);
        this.pivot.set(5,5);
        this.x = posX;
        this.y = posY;
        this.zIndex = 2;
        this.speed = 12;
        this.clsFkt = collisionFkt;
        this.rotation = Math.PI + angle;
        this.movAngle = angle;
        this.hitBox = "rectangular";
    }

    /**
     * Moves the bullet and check if somthing, either a wall or an enemie is hit
     * @param {Array} enemies Array of all enemies  
     * @param {Pixi.Container} objects Game Map
     */
    updateBullet(enemies,objects){
        this.y -= this.speed * Math.sin(this.movAngle);
        this.x -= this.speed * Math.cos(this.movAngle);
        for(var i = 0; i < objects.children.length; i++){
            if(objects.children[i].isSolid){
                if(this.clsFkt(objects.children[i],this)){
                    return ("fo");
                }
            }
        }
        for(var i = 0; i < enemies.length; i++){
            if(this.clsFkt(enemies[i],this)){
                return ("fe" + i);
            }
        }
        return "t";
    }
}