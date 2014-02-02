var Rectangle = require("./Rectangle");

var Dungeon = function(size){
    this.size=size;
    this.rectangle = new Rectangle(0,0,size,size);
};

Dungeon.prototype.getRooms = function(){
    return getRoomsHelper(this.rectangle);
};

Dungeon.prototype.getCorridors = function(){
    //var rooms = this.getRooms();
    //var room = rooms[0];
    return getCorridorHelper(this.rectangle);
};

function horizontalCorridor(leftRoom,rightRoom){
    return {
	left: leftRoom.room.right,
        top: Math.max(leftRoom.room.top,rightRoom.room.top),
	width: rightRoom.room.left-leftRoom.room.right,
        height: 16*3
    };
}

function verticalCorridor(topRoom,bottomRoom){
    return {
	left: Math.max(topRoom.room.left,bottomRoom.room.left),
        top: topRoom.room.bottom,
        width: 16*3, 
	height: bottomRoom.room.top - topRoom.room.bottom
    }
}

function getCorridorHelper(room){
    var corridors = [];
    if(room.hasChildren() && !room.allChildrenAreLeaves()){
	for(var i=0; i < room.parts.length; i++){
	    corridors = corridors.concat(getCorridorHelper(room.parts[i]));
	}
    }else if(!room.leaf){
	corridors.push(horizontalCorridor(room.parts[0],room.parts[1]));
	corridors.push(horizontalCorridor(room.parts[2],room.parts[3]));
	corridors.push(verticalCorridor(room.parts[0],room.parts[2]));
	corridors.push(verticalCorridor(room.parts[1],room.parts[3]));
    }
    return corridors;
}

function getRoomsHelper(dungeon){
    var rooms=[];
    if(dungeon.leaf){
	dungeon.fillRoom();
	rooms.push(dungeon.room);
    }else{
	for(var i=0; i<dungeon.parts.length; i++){
	    rooms = rooms.concat(getRoomsHelper(dungeon.parts[i]));
	}
    }
    return rooms;
}

module.exports=Dungeon;