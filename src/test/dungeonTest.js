var Rectangle=require("../dungeon").Rectangle;


exports.testQuadPartition = function(test){
    var rect = new Rectangle(0,501,500,1000);
    rect.partitionQuad();
    test.ok(rect.parts[0].equals(new Rectangle(0,501,250,750)));
    test.ok(rect.parts[1].equals(new Rectangle(0,751,250,1000)));
    test.ok(rect.parts[2].equals(new Rectangle(251,501,500,750)));
    test.ok(rect.parts[3].equals(new Rectangle(251,751,500,1000)));
    console.log(rect.parts[3]);
    console.log(new Rectangle(251,751,500,1000));
    test.done();
};