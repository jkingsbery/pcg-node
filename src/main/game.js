var Canvas = require('canvas');
var assert=require("assert");
// Stuff for random number generation
var srand = require("srand");
srand.seed(42);

srand.randInt = function randInt(max){
    return Math.floor(srand.random()*max);
};

var Rectangle = require("./Rectangle");
var Dungeon = require("./Dungeon");

var recursivePartition = function recursivePartition(dungeon, depth){
    console.log(JSON.stringify(dungeon)+"," + depth);
    if(depth>0){
	dungeon.partitionQuad();
	for(var i=0; i<dungeon.parts.length; i++){
	    if(srand.randInt(100)>65){
		recursivePartition(dungeon.parts[i],depth-1);
	    }
	}
    }
};

function drawRooms(rooms){
    var canvas = new Canvas(1000,1000);
    var ctx = canvas.getContext('2d');    
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    for(var i=0; i<rooms.length; i++){
	var height=rooms[i].bottom - rooms[i].top;
	var width=rooms[i].right - rooms[i].left;
	ctx.fillRect(rooms[i].left,rooms[i].top,width,height);
    }
    return canvas;
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

var main = function(){
    var dungeon = new Dungeon(1000);
    recursivePartition(dungeon.rectangle,2);
    var rooms = dungeon.getRooms();
    console.log(rooms);
    var canvas = drawRooms(rooms);
    writeToFile(canvas);
};

main();