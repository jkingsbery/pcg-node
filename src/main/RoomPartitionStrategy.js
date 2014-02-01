// Stuff for random number generation
var srand = require("srand");
srand.seed(42);

srand.randInt = function randInt(max){
    return Math.floor(srand.random()*max);
};

function shouldPartition(rect){
    return rect.getArea()>=(32*4)*(32*4);
    
}

module.exports.randomParts = function randomParts(dungeon, depth){
    if(depth>0){
	dungeon.partitionQuad();
	for(var i=0; i<dungeon.parts.length; i++){
	    if(srand.randInt(100)<60 && shouldPartition(dungeon.parts[i])){
		randomParts(dungeon.parts[i],depth-1);
	    }
	}
    }
};

module.exports.sameSize = function sameSize(dungeon, depth){
    console.log(JSON.stringify(dungeon)+"," + depth);
    if(depth>0){
	dungeon.partitionQuad();
	for(var i=0; i<dungeon.parts.length; i++){
	    sameSize(dungeon.parts[i],depth-1);
	}
    }
};
