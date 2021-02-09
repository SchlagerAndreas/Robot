class Bullet extends PIXI.Sprite{
    constructor(posX,posY,angle,texture,collisionFkt){
        // var rot = 8+ Math.round((Math.PI + angle) / (Math.PI / 4))
        // texture.rotate = rot != 16 ? rot : 8;
        super(texture);
        this.anchor.set(0.5,0.5);
        this.pivot.set(5,5);
        this.x = posX;
        this.y = posY;
        this.speed = 15;
        this.clsFkt = collisionFkt;
        this.rotation = Math.PI + angle;
        this.movAngle = angle;
        this.hitBox = "rectangular";
    }

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