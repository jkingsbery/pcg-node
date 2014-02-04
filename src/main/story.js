var util=require("util");


var BaseState = function BaseState(){

};

BaseState.prototype.isDone = function(){
    return false;
};

BaseState.prototype.defeat = function(target){
    return this;
};

BaseState.prototype.returnTo = function(who){
    return this;
}

/*
 ToDefeatState
 */
var ToDefeatState = function ToDefeat(target) {
    this.target=target;
};

util.inherits(ToDefeatState,BaseState);

ToDefeatState.prototype.defeat= function defeat(who){
    if(this.target===who){
	return new ReturnToState("Y");
    }else{
	return this;
    }
};


/*
 ReturnToState
 */
var ReturnToState = function ReturnToState(target,reward) {
    this.target = target;
};

util.inherits(ReturnToState,BaseState);

ReturnToState.prototype.returnTo = function returnTo(who){
    if(this.target===who){
	return new DoneState();
    }else{
	return this;
    }
};

/*
 DoneState
*/
var DoneState = function DoneState(){

};

DoneState.prototype.isDone = function(){
    return true;
}

var generateStory = function generateStory(){
    return new ToDefeatState("X");
};

module.exports.generateStory = generateStory;

