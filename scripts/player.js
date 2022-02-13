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
        this.stats = {speed: 5, shootingSpeed: 10, damage:5};
        this.numOfUsedItems = 0;
        this.colFkt = collisionFkt;
        this.hitBox = "rectangular";
        this.play();
    }

    /**
     * Moves the player an checks if it hits a wall
     * @param {Object} pressedKeys The keys which are pressed
     * @param {PIXI.Container} map The map
     */
    move(pressedKeys,map,items){
        var i = 0;
        let tile = this.getTile(this.x,this.y);
        let upLeftTile = tile - 30 - 1;
        let downLeftTile = tile + 30 - 1;
        let leftTile = tile - 1;

        //Moving Up
        if(pressedKeys["87"]){
            this.y -= this.stats.speed;
            this.playWalkAnimation("up");
            for(i = 0; i < 3; i++){
                if(map.children[upLeftTile+i].isSolid){
                    if(this.colFkt(map.children[upLeftTile+i],this)){
                        this.y = map.children[upLeftTile+i].y + 28;
                    }
                }
            }
            for(i = 0; i < 3; i++){
                if(map.children[downLeftTile+i].isSolid){
                    if(this.colFkt(map.children[downLeftTile+i],this)){
                        this.y = map.children[downLeftTile+i].y + 28;
                    }
                }
            }
            for(i = 0; i < 3; i++){
                if(map.children[leftTile+i].isSolid){
                    if(this.colFkt(map.children[leftTile+i],this)){
                        this.y = map.children[leftTile+i].y + 28;
                    }
                }
            }
        }
        //Moving Down
        if(pressedKeys["83"]){
            this.y += this.stats.speed;
            this.playWalkAnimation("down");
            for(i = 0; i < 3; i++){
                if(map.children[upLeftTile+i].isSolid){
                    if(this.colFkt(map.children[upLeftTile+i],this)){
                        this.y = map.children[upLeftTile+i].y - 28;
                    }
                }
            }
            for(i = 0; i < 3; i++){
                if(map.children[downLeftTile+i].isSolid){
                    if(this.colFkt(map.children[downLeftTile+i],this)){
                        this.y = map.children[downLeftTile+i].y - 28;
                    }
                }
            }
            for(i = 0; i < 3; i++){
                if(map.children[leftTile+i].isSolid){
                    if(this.colFkt(map.children[leftTile+i],this)){
                        this.y = map.children[leftTile+i].y - 28;
                    }
                }
            }
        }
        //Moving Right
        if(pressedKeys["68"]){
            this.x += this.stats.speed;
            this.playWalkAnimation("right");
            for(i = 0; i < 3; i++){
                if(map.children[upLeftTile+i].isSolid){
                    if(this.colFkt(map.children[upLeftTile+i],this)){
                        this.x = map.children[upLeftTile+i].x - 28;
                    }
                }
            }
            for(i = 0; i < 3; i++){
                if(map.children[downLeftTile+i].isSolid){
                    if(this.colFkt(map.children[downLeftTile+i],this)){
                        this.x = map.children[downLeftTile+i].x - 28;
                    }
                }
            }
            for(i = 0; i < 3; i++){
                if(map.children[leftTile+i].isSolid){
                    if(this.colFkt(map.children[leftTile+i],this)){
                        this.x = map.children[leftTile+i].x - 28;
                    }
                }
            }
        }
        //Moving Left
        if(pressedKeys["65"]){
            this.x -= this.stats.speed;
            this.playWalkAnimation("left");
            for(i = 0; i < 3; i++){
                if(map.children[upLeftTile+i].isSolid){
                    if(this.colFkt(map.children[upLeftTile+i],this)){
                        this.x = map.children[upLeftTile+i].x + 28;
                    }
                }
            }
            for(i = 0; i < 3; i++){
                if(map.children[downLeftTile+i].isSolid){
                    if(this.colFkt(map.children[downLeftTile+i],this)){
                        this.x = map.children[downLeftTile+i].x + 28;
                    }
                }  
            }
            for(i = 0; i < 3; i++){
                if(map.children[leftTile+i].isSolid){
                    if(this.colFkt(map.children[leftTile+i],this)){
                        this.x = map.children[leftTile+i].x + 28;
                    }
                }
            }
        }

        for(i = 0; i < items.length; i++){
            if(items[i].status == "usedUp"){
                for(const statChange in items[i].statChanges){
                    this.stats[statChange] -= items[i].statChanges[statChange];
                }
                items[i].status = "forDeletion";
                this.numOfUsedItems--;
            }
            else if(items[i].status == "forUse"){
                if(this.colFkt(this,items[i])){
                    console.log("Hit item");
                    let alreadyUsed = false;
                    for(var j = 0; j < items.length; j++){
                        if(items[j].status == "inUse" && items[i].id == items[j].id){
                            items[i].status = "forDeletion";
                            items[j].counter = 1000;
                            alreadyUsed = true;
                            break;
                        }
                    }
                    if(!alreadyUsed){
                        items[i].useItem(this.numOfUsedItems,items);
                        for(const statChange in items[i].statChanges){
                            this.stats[statChange] += items[i].statChanges[statChange];
                        }
                        this.numOfUsedItems++;
                    }
                }
            }  
        }
        return items;
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
    /**
     * Takes in a direction and plays the according animation
     * @param {String} direction Which direction the player is moving
     */
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
