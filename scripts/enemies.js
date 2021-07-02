class EnemyTexture extends PIXI.AnimatedSprite{
    constructor(textureSheet){
        super(textureSheet.standDown);
        this.textureSheet = textureSheet;
        this.anchor.set(0.5);
        this.animationSpeed = 0.5;
        this.loop = false;
        this.play();
    }

    /**
     * Takes in a direction and plays the according animation
     * @param {String} direction Which direction the enemy is moving
     */
    playWalkAnimation(direction){
        if(!this.playing){
            if(direction == "up"){
                this.textures = this.textureSheet.walkLeft;
                this.loop = false;
                this.play();  
            }
            else if(direction == "down"){
                this.textures = this.textureSheet.walkRight;
                this.loop = false;
                this.play();
            }
            else if(direction == "right"){
                this.textures = this.textureSheet.walkDown;
                this.loop = false;
                this.play();
            }
            else if(direction == "left"){
                this.textures = this.textureSheet.walkUp;
                this.loop = false;
                this.play();
            }
        }
    }
}

class HPBar extends PIXI.Container{
    constructor(maxHP){
        super();
        this.mHP = maxHP;

        let blackBar = new PIXI.Graphics();
        blackBar.beginFill(0x000000);
        blackBar.drawRect(-2,-2,29,9);
        blackBar.endFill();
        blackBar.visible = false;
        this.addChild(blackBar);

        let redBar = new PIXI.Graphics();
        redBar.beginFill(0xFF0000);
        redBar.drawRect(0,0,25,5);
        redBar.endFill();
        redBar.visible = false;
        this.addChild(redBar);

        let greenBar = new PIXI.Graphics();
        greenBar.beginFill(0x00FF00);
        greenBar.drawRect(0,0,25,5);
        greenBar.endFill();
        greenBar.visible = false;
        this.addChild(greenBar);
    }

    updateHpBar(currentHP){
        let hpBarWidth = Math.round((currentHP / this.mHP) * 25);
        this.children[2].destroy();
        this.children[0].visible =  this.children[1].visible = true;
        let greenBar = new PIXI.Graphics();
        greenBar.beginFill(0x00FF00);
        greenBar.drawRect(0,0,hpBarWidth,5);
        greenBar.endFill();
        this.addChild(greenBar);
    }
}

class Graph{
    constructor(){
        this.vertexes = {};
        this.edges = {};
    }
}


class Enemie extends PIXI.Container{
    constructor(posX,posY,textureSheet,enemyStats,map,collisionFkt){
        super()
        this.x = posX;
        this.y = posY;
        this.stats = enemyStats;
        this.colFkt = collisionFkt;
        this.map = map;
        this.zIndex = 3;
        this.mapGraph = new Graph;
        this.createMapGraph()
        this.currentPath = [];
        this.cnt = 0;
        this.direction = 0;
        this.duration = 0;
        this.texture;
        this.hpBar;

        this.texture = new EnemyTexture(textureSheet);
        this.addChild(this.texture);
        
        this.hpBar = new HPBar(this.stats.hp);
        this.hpBar.x = -12;
        this.hpBar.y = -20;
        this.addChild(this.hpBar);
    }

    gotHit(damage){
        this.stats.hp -= damage;
        this.hpBar.updateHpBar(this.stats.hp);
        if(this.stats.hp <= 0){
            return true;
        }
        return false;
    }

    /**
     * Moves the enemy and checks if the enemy has hit the player
     * @param {PIXI.Sprite} player The Player
     */
    updateEnemy(player){
        if(this.duration == 0){
            if(this.isAtNodeCenter()){
                this.findDirection(player);
                this.direction = this.currentPath[this.cnt] - this.currentPath[this.cnt + 1];
                this.duration = Math.round(30 / this.stats.speed);
            }
            else{
                this.direction = 0;
            }
        }
        
        if(this.direction != 0){
            var i = 0;
            if(this.direction == 1){
                this.x -= this.stats.speed;
                this.texture.playWalkAnimation("up");
                for(i = 0; i < this.map.children.length; i++){
                    if(this.map.children[i].isSolid){
                        if(this.colFkt(this.texture,this.map.children[i])){
                            this.x = this.map.children[i].x + 28;
                        }
                    }
                }
            }
            else if(this.direction == -1){
                this.x += this.stats.speed;
                this.texture.playWalkAnimation("down");
                for(i = 0; i < this.map.children.length; i++){
                    if(this.map.children[i].isSolid){
                        if(this.colFkt(this.texture,this.map.children[i])){
                            this.x = this.map.children[i].x - 28;
                        }
                    }
                }
            }
            else if(this.direction == 30){
                this.y -= this.stats.speed;
                this.texture.playWalkAnimation("left");
                for(i = 0; i < this.map.children.length; i++){
                    if(this.map.children[i].isSolid){
                        if(this.colFkt(this.texture,this.map.children[i])){
                            this.y = this.map.children[i].y + 28;
                        }
                    }
                }
            }
            else if(this.direction == -30){
                this.y += this.stats.speed;
                this.texture.playWalkAnimation("right");
                for(i = 0; i < this.map.children.length; i++){
                    if(this.map.children[i].isSolid){
                        if(this.colFkt(this.texture,this.map.children[i])){
                            this.y = this.map.children[i].y - 28;
                        }
                    }
                }
            }
            this.duration--;
        }
        
        if(this.colFkt(this,player)){
            return true;
        }
        return false;
        
    }

    /**
     * Takes the map as an array and build a graph from it
     */
    createMapGraph(){
        this.mapGraph.vertexes = this.map.children;
        for(var i = 0; i < this.map.children.length; i++){
            let adjIndex = [];
            if(!(i-1 < 0 || i-1 > 600))adjIndex.push(i-1);
            if(!(i+1 < 0 || i+1 > 600))adjIndex.push(i+1);
            if(!(i-30 < 0 || i-30 > 600))adjIndex.push(i-30);
            if(!(i+30 < 0 || i+30  > 600))adjIndex.push(i+30);

            this.mapGraph.edges[i] = adjIndex;
        }
    }

    /**
     * Takes in the coordinates and returns the node where they are
     * @param {Number} x x-Coordinate
     * @param {Number} y y-Coordinate
     */
    getNode(x,y){
        let nodeX = Math.floor(x / 30);
        let nodeY = Math.floor(y / 30);
        nodeY = nodeY == 30 ? 29 : nodeY;
        nodeX = nodeX == 30 ? 29 : nodeX;
        let nodeIndex = nodeY * 30 + nodeX;
        return nodeIndex;
    }

    /**
     * Checks if the enemy is in the center of the node, if not it will be moved there
     */
    isAtNodeCenter(){
        let node = this.getNode(this.x,this.y);
        let nodeCenterY = 15 + Math.floor(node / 30) * 30;
        let nodeCenterX = 15 + (node % 30) * 30;
        if(nodeCenterX == this.x && nodeCenterY == this.y){
            return true;
        }
        this.x = nodeCenterX;
        this.y = nodeCenterY;
        return false;
    }

    /**
     * Finds the path to the player
     * @param {PIXI.Sprite} player Player
     */
    findDirection(player){
        let paths = [];
        let root = this.getNode(this.x,this.y);
        let playerNode = this.getNode(player.x,player.y);
        paths = this.bfs(root,playerNode);

        var tmp = Infinity;
        for(var i = 0; i < paths.length;i++){
            tmp = paths[i].length <= tmp ? i : tmp;
        }
        this.currentPath = paths[tmp]
    }

    /**
     * Takes in a start and end node an with the bfs-algorithm finds a bath from start to end
     * @param {Number} start The start node where the enemy curretnly is
     * @param {Number} end The end node where the player currently is
     */
    bfs(start,end){
        let paths = [];
        let pathCnt = 0;

        let queue = [];
        let explored = new Set();
        let parent = {};
        queue.push(start);
        while(queue.length > 0){
            let tmp = queue.shift();
            let connections = this.mapGraph.edges[tmp];
            for(var i = 0; i < connections.length;i++){
                if(connections[i] == end){
                    parent[connections[i]] = tmp;
                    paths[pathCnt] = this.backTracePath(parent,start,end);
                    pathCnt ++;
                }
                else if(!explored.has(connections[i])){
                    explored.add(connections[i]);
                    if(!this.mapGraph.vertexes[connections[i]].isSolid){
                        queue.push(connections[i]);
                        parent[connections[i]] = tmp;
                    }
                }
            }
        }
        return paths;
    }

    backTracePath(parents,start,end){
        let path = [];
        path.push(end);
        while(path[path.length -1] != start){
            path.push(parents[path[path.length -1]]);
        }
        path.reverse();
        return path;

    }
}