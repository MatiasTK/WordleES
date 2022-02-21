const fs = require('fs');
var words = require('an-array-of-spanish-words');
var shortWords = words.filter(d => d.length === 5);
const wordsJson = JSON.stringify(shortWords);

fs.writeFile("./diccionario.json", wordsJson, "utf-8", function(err){
    if(err){
        return console.log(err);
    }
})

console.log("OK");