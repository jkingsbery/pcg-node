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

Rectangle.prototype.allChildrenAreLeaves = function(){
    var x = true;
    for(var i=0; i<this.parts.length; i++){
	x = x && this.parts[i].leaf;
    }
    return x;
};

Rectangle.prototype.hasChildren = function(){
    return this.parts != null;
}

Rectangle.prototype.getWidth = function(){
    return this.right - this.left;
};

Rectangle.prototype.getHeight = function(){
    return this.bottom - this.top;
};

Rectangle.prototype.getArea = function(){
    return this.getWidth() * this.getHeight();
};


Rectangle.prototype.getLeftChildren = function(){
    if(this.leaf == true){
	return [this];
    }else{
	var result=[];
	result = result.concat(this.parts[0].getLeftChildren());
	result = result.concat(this.parts[2].getLeftChildren());
	return result;
    }
};


Rectangle.prototype.getRightChildren = function(){
    if(this.leaf == true){
	return [this];
    }else{	
	var result=[];
	result = result.concat(this.parts[1].getRightChildren());
	result = result.concat(this.parts[3].getRightChildren());
	return result;
    }
};


Rectangle.prototype.getTopChildren = function(){
    if(this.leaf == true){
	return [this];
    }else{
	var result=[];
	result = result.concat(this.parts[0].getTopChildren());
	result = result.concat(this.parts[1].getTopChildren());
	return result;
    }
};

Rectangle.prototype.getBottomChildren = function(){
    if(this.leaf == true){
	return [this];
    }else{
	var result=[];
	result = result.concat(this.parts[2].getBottomChildren());
	result = result.concat(this.parts[3].getBottomChildren());
	return result;
    }
};


Rectangle.prototype.fillRoom = function(){
    //    var boundary=20;
    
    //this.room = new Rectangle(this.top+boundary,this.left+boundary,this.bottom-boundary,this.right-boundary);
    if(!this.room){
	var x=Math.floor(this.getWidth()*0.3);
	this.room = new Rectangle(this.top+srand.randInt(x)+1,this.left+srand.randInt(x)+1,
				  this.bottom-srand.randInt(x)+1,this.right-srand.randInt(x)+1);
    }
    return this.room;
};

Rectangle.prototype.equals = function(other){
    return this.top==other.top && this.bottom==other.bottom && 
         this.left==other.left && this.right==other.right;
};

module.exports=Rectangle;