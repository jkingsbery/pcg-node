var generateStory = require("../main/story").generateStory;


module.exports.testSimpleStory = function(test){
    var story = generateStory();
    var step = story.defeat("X");
    step = step.returnTo("Y");
    test.equals(step.isDone(),true);
    test.done();
};

module.exports.testDefeatedWrongTarget = function(test){
    var story = generateStory();
    var step = story.defeat("Z");
    step = step.returnTo("Y");
    test.equals(step.isDone(),false);
    test.done();
};

module.exports.testReturnedToWrongtarget = function(test){
    var story = generateStory();
    var step = story.defeat("X");
    step = step.returnTo("Z");
    test.equals(step.isDone(),false);
    test.done();
};