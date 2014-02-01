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
};

module.exports=Rectangle;