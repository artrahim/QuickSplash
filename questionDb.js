
let lineReader = require('readline').createInterface({
    input: require('fs').createReadStream("./src/Assets/questions/prompts.txt")
});

lineReader.on('line', function (line) {
    console.log('Line from file:', line);
});