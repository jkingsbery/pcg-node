var Rectangle = require("./Rectangle");

var Dungeon = function(size){
    this.size=size;
    this.rectangle = new Rectangle(0,0,size,size);
};

Dungeon.prototype.getRooms = function(){
    return getRoomsHelper(this.rectangle);
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