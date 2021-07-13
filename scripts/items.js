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
            case 0: this.statChanges = {speed:2};this.colorCode = 0xFFFF00;break;
            case 1: this.statChanges = {shootingSpeed:-5};this.colorCode = 0x00FF00;break;
            default: this.statChanges = {speed:0,shootingSpeed:0,damage:0};this.status = "forDeletion"; break;
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

    useItem(numberOfUsedItems,items){
        for(let i = 0; i < items.length;i++){
            if(items[i].status == "inUse" && items[i].x == 900-20-20*numberOfUsedItems){
                this.x = 900-20-20*(numberOfUsedItems-1);
                break;
            }
            else{
                this.x = 900-20-20*numberOfUsedItems;
            }
        }
        this.status = "inUse";
        this.children[0].destroy();
        this.y = 20;
        let circle = new PIXI.Graphics();
        circle.beginFill(this.colorCode);
        circle.drawCircle(0,0,10);
        circle.endFill();
        this.addChild(circle);
    }
}