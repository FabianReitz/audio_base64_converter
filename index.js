import express from 'express';
import fs from 'fs';

var app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    // Source file
    var audio = fs.readFileSync('./guitar.mp3');

    // Source file as base 64 string
    var base64Audio = audio.toString('base64');

    // Unix time
    var timeStamp = Date.now();

    // Get last six digits of Unix time
    var lastDigets = timeStamp % 1000000;

    var position = lastDigets;

    if (lastDigets >= base64Audio.length) {
        position = lastDigets - base64Audio.length;
    }

    // Get a specific piece of the base 64 string
    function extractString(input, index, length) {
        return input.substring(index, index + length);
    }

    // Get the 20 chars of the base 64 string at position
    var randomString = extractString(base64Audio, position, 20);

    res.send(randomString);
});

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
});
