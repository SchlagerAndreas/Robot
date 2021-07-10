class Item extends PIXI.Container{
    constructor(x,y,itemTextures,id){
        super();
        this.x = x;
        this.y = y;
        this.id = id;
        this.zIndex = 5;
        this.status = "forUse"
        this.counter = 1000;
        this.colorCode;
        
        let itemTexture = new PIXI.Sprite(itemTextures[id]);
        itemTexture.x = itemTexture.y = 0;
        itemTexture.anchor.set(0);
        this.addChild(itemTexture);

        this.statChanges;
        switch(id){
            case 0: this.statChanges = {speed:2,shootingSpeed:0,damageIncrease:0};this.colorCode = 0xFFFF00;break;
            default: this.statChanges = {speed:0,shootingSpeed:0,damageIncrease:0};break;
        }
    }

    update(){
        if(this.status == "inUse"){
            this.counter -= 1;
            this.status = this.counter <= 0 ? "usedUp" : "inUse";

            this.children[0].destroy();
            let partialCircle = new PIXI.Graphics();
            partialCircle.beginFill(this.colorCode);
            partialCircle.moveTo(5,5);
            partialCircle.arc(5,5,10,3/2 * Math.PI,(this.counter/1000)*2*Math.PI+ 3/2 * Math.PI);
            partialCircle.lineTo(5,5);
            partialCircle.endFill();
            this.addChild(partialCircle);
        }
    }

    useItem(numberOfUsedItems){
        this.status = "inUse";
        this.children[0].destroy();
        this.x = 900-20-20*numberOfUsedItems;
        this.y = 20;
        let circle = new PIXI.Graphics();
        circle.beginFill(this.colorCode);
        circle.drawCircle(0,0,10);
        circle.endFill();
        this.addChild(circle);
    }
}