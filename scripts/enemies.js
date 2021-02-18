class Graph{
    constructor(){
        this.vertexes = {};
        this.edges = {};
    }
}


class Enemie extends PIXI.AnimatedSprite{
    constructor(posX,posY,textureSheet,type,map,collisionFkt){
        super(textureSheet.standDown)
        this.textureSheet = textureSheet;
        this.anchor.set(0.5)
        this.animationSpeed = 0.5;
        this.loop = false;
        this.x = posX;
        this.y = posY;
        this.type = type;
        this.speed = this.type == "level1" ? 2 : 1;
        this.colFkt = collisionFkt;
        this.hitBox = "rectangular";
        this.map = map;
        this.zIndex = 3;
        this.mapGraph = new Graph;
        this.createMapGraph()
        this.currentPath = [];
        this.cnt = 0;
        this.direction = 0;
        this.play();
    }

    updateEnemy(player){
        if(this.cnt % 9 == 0){
            this.cnt = 0;
            this.findDirection(player);
            this.direction = this.currentPath[this.cnt] - this.currentPath[this.cnt + 1];
        }
        this.cnt++;
        var i = 0;
        if(this.direction == 1){
            this.x -= this.speed;
            this.playWalkAnimation("up");
            for(i = 0; i < this.map.children.length; i++){
                if(this.map.children[i].isSolid){
                    if(this.colFkt(this,this.map.children[i])){
                        this.x = this.map.children[i].x + 26;
                    }
                }
            }
        }
        else if(this.direction == -1){
            this.x += this.speed;
            this.playWalkAnimation("down");
            for(i = 0; i < this.map.children.length; i++){
                if(this.map.children[i].isSolid){
                    if(this.colFkt(this,this.map.children[i])){
                        this.x = this.map.children[i].x - 26;
                    }
                }
            }
        }
        else if(this.direction == 30){
            this.y -= this.speed;
            this.playWalkAnimation("left");
            for(i = 0; i < this.map.children.length; i++){
                if(this.map.children[i].isSolid){
                    if(this.colFkt(this,this.map.children[i])){
                        this.y = this.map.children[i].y + 26;
                    }
                }
            }
        }
        else if(this.direction == -30){
            this.y += this.speed;
            this.playWalkAnimation("right");
            for(i = 0; i < this.map.children.length; i++){
                if(this.map.children[i].isSolid){
                    if(this.colFkt(this,this.map.children[i])){
                        this.y = this.map.children[i].y - 26;
                    }
                }
            }
        }
        if(this.colFkt(this,player)){
            return true;
        }
        return false;
        
    }

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

    getNode(x,y){
        let nodeX = Math.floor(x / 30);
        let nodeY = Math.floor(y / 30);
        nodeY = nodeY == 30 ? 29 : nodeY;
        nodeX = nodeX == 30 ? 29 : nodeX;
        let nodeIndex = nodeY * 30 + nodeX;
        return nodeIndex;
    }

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

    // dfs(start,end,explored = new Set()){
    //     explored.add(start);
    //     this.path.push(start);
    //     var connections = this.mapGraph.edges[start];
    //     for(var i = 0; i < connections.length; i++){
    //         if(connections[i] == end){
    //             this.path.push(connections[i]);
    //             return true;
    //         }
    //         if(!explored.has(connections[i])){
    //             if(this.dfs(connections[i],end,explored)){
    //                 return true;
    //             }
    //         }
    //     }
    //     this.path.pop();
    //     return false;
    // }

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