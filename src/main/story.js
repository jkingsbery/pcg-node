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
var ToDefeatState = function ToDefeat(mission) {
    this.target=mission.target;
    this.mission = mission;
};

util.inherits(ToDefeatState,BaseState);

ToDefeatState.prototype.defeat= function defeat(who){
    if(this.target===who){
	return new ReturnToState(this.mission);
    }else{
	return this;
    }
};


/*
 ReturnToState
 */
var ReturnToState = function ReturnToState(mission) {
    this.target = mission.returnTo;
    this.mission = mission;
};

util.inherits(ReturnToState,BaseState);

ReturnToState.prototype.returnTo = function returnTo(who){
    if(this.target===who){
	this.mission.player.money+=this.mission.reward;
	return new DoneState(this.mission);
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
};

var generateDefeatStory = function (mission){
    return new ToDefeatState(mission);
};

module.exports.generateStory = generateDefeatStory;
