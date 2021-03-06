var Canvas = require('canvas');
var assert=require("assert");

var Rectangle = require("./Rectangle");
var Dungeon = require("./Dungeon");
var partition = require("./RoomPartitionStrategy");


function drawRooms(dungeon){
    var rooms = dungeon.getRooms();
    //console.log(rooms);
    var canvas = new Canvas(dungeon.size,dungeon.size);
    var ctx = canvas.getContext('2d');    
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    for(var i=0; i<rooms.length; i++){
	var height=rooms[i].bottom - rooms[i].top;
	var width=rooms[i].right - rooms[i].left;
	ctx.fillRect(rooms[i].left,rooms[i].top,width,height);
    }
    var corridors = dungeon.getCorridors();
    //console.log(corridors);
    for(var i=0; i<corridors.length; i++){
	ctx.fillRect(corridors[i].left,corridors[i].top,
		     corridors[i].width,corridors[i].height);
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
    var dungeon = new Dungeon(5000);
    partition.randomParts(dungeon.rectangle,4);
    var canvas = drawRooms(dungeon);
    writeToFile(canvas);
};

main();