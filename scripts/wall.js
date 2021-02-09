
class MapObject extends PIXI.Sprite{
    constructor(posX,posY,texture,isSolid){
        super(texture)
        this.anchor.set(0.5)
        this.x = posX;
        this.y = posY;
        this.isSolid = isSolid;
        this.hitBox = "rectangular";
    }
}