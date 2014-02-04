var generateStory = require("../main/story").generateStory;


function getTestStory(player){
    return generateStory({target:"X",reward:100,returnTo:"Y",player:player});
}

module.exports.testSimpleStory = function(test){
    var player = { money: 0 };
    var story = getTestStory(player);
    var step = story.defeat("X");
    step = step.returnTo("Y");
    test.equals(step.isDone(),true);
    test.done();
};

module.exports.testDefeatedWrongTarget = function(test){
    var player = { money: 0 };
    var story = getTestStory(player);
    var step = story.defeat("Z");
    step = step.returnTo("Y");
    test.equals(step.isDone(),false);
    test.done();
};

module.exports.testReturnedToWrongTarget = function(test){
    var player = { money: 0 };
    var story = getTestStory(player);
    var step = story.defeat("X");
    step = step.returnTo("Z");
    test.equals(step.isDone(),false);
    test.done();
};

module.exports.testGetReward = function(test){
    var player = { money: 0 };
    var story = getTestStory(player);
    var step = story.defeat("X");
    step = step.returnTo("Y");
    test.equals(player.money,100);
    test.done();
};