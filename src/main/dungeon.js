var assert=require("assert");
// Stuff for random number generation
var srand = require("srand");
srand.seed(42);

srand.randInt = function randInt(max){
    return Math.floor(srand.random()*max);
};


var Rectangle=function Rectangle( top,  left,  bottom,  right){
    this.top=top;
    this.left=left;
    this.bottom=bottom;
    this.right=right;
    this.leaf=true;
};

Rectangle.prototype.partitionHorizontal=function(){
    this.leaf=false;
    var middle = (this.top + this.bottom)/2;
    this.leftNode = new Rectangle(this.top,this.left,middle,this.right);
    this.rightNode = new Rectangle(middle + 1,this.left,this.bottom,this.right);
};

Rectangle.prototype.partitionVertical=function(){
    this.leaf=false;
    var middle = (this.left+this.right)/2;
    this.leftNode = new Rectangle(this.top,this.left,this.bottom,middle);
    this.rightNode = new Rectangle(this.top,middle+1,this.bottom,this.right);
};

Rectangle.prototype.partitionQuad = function(){
    this.leaf=false;
    var horizontalMiddle = Math.floor((this.top + this.bottom)/2);
    var verticalMiddle = Math.floor((this.left+this.right)/2);
    this.parts=[];
    this.parts[0] = new Rectangle(this.top,this.left,horizontalMiddle,verticalMiddle);
    this.parts[1] = new Rectangle(this.top,verticalMiddle+1,horizontalMiddle,this.right);
    this.parts[2] = new Rectangle(horizontalMiddle+1,this.left,this.bottom,verticalMiddle);
    this.parts[3] = new Rectangle(horizontalMiddle+1,verticalMiddle+1,this.bottom,this.right);
};

Rectangle.prototype.fillRoom = function(){
    var boundary=20;
    this.room = new Rectangle(this.top+boundary,this.left+boundary,this.bottom-boundary,this.right-boundary);
};

Rectangle.prototype.equals = function(other){
    return this.top==other.top && this.bottom==other.bottom && 
         this.left==other.left && this.right==other.right;
}

var getRooms = function getRooms(dungeon){
    var rooms=[];
    if(dungeon.leaf){
	dungeon.fillRoom();
	rooms.push(dungeon.room);
    }else{
	for(var i=0; i<dungeon.parts.length; i++){
	    rooms = rooms.concat(getRooms(dungeon.parts[i]));
	}
    }
    return rooms;
}

//Generate Dungeon Partitions
var dungeonRectangle = new Rectangle(0,0,1000,1000);

var recursivePartition = function recursivePartition(dungeon, depth){
    console.log(JSON.stringify(dungeon)+"," + depth);
    if(depth>0){
	dungeon.partitionQuad();
	//dungeon.parts[1].partitionQuad();
	for(var i=0; i<dungeon.parts.length; i++){
	    //dungeon.parts[i].partitionQuad();
	    recursivePartition(dungeon.parts[i],depth-1);

	}
    }
};

recursivePartition(dungeonRectangle,2);

var rooms = getRooms(dungeonRectangle);
console.log(rooms);

// Draw output
var Canvas = require('canvas');
var canvas = new Canvas(1000,1000);
var ctx = canvas.getContext('2d');

ctx.strokeStyle = 'rgba(0,0,0,0.5)';
/*
ctx.beginPath();
ctx.lineTo(0,0);
ctx.lineTo(1000,1000);
ctx.stroke();

*/
//ctx.fillRect(0,250,150,150);

drawRooms(rooms,ctx);

function drawRooms(rooms,ctx){
    for(var i=0; i<rooms.length; i++){
	console.log(rooms[i]);
	var height=rooms[i].bottom - rooms[i].top;
	var width=rooms[i].right - rooms[i].left;
	ctx.fillRect(rooms[i].left,rooms[i].top,width,height);
    }
}

function writeToFile(canvas){
    var fs = require("fs");
    var out = fs.createWriteStream(__dirname + "/dungeon.png");
    var stream = canvas.pngStream();
    stream.on('data',function(chunk){
        out.write(chunk);
    });
    stream.on('end', function(){
	console.log("Done!");
    });
}

writeToFile(canvas);

module.exports.Rectangle=Rectangle;