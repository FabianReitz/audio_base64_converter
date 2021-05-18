import express from 'express';
import fs from 'fs';

const app = express();

const PORT = 8080;

// Configure express to use pug
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    // Source file
    const audio = fs.readFileSync('./guitar.mp3');

    // Source file as base 64 string
    const base64Audio = audio.toString('base64');

    // Unix time
    const timeStamp = Date.now();

    // Get last six digits of Unix time
    const lastDigets = timeStamp % 1000000;

    let position = lastDigets;

    if (lastDigets >= base64Audio.length) {
        position = lastDigets - base64Audio.length;
    }

    // Get a specific piece of the base 64 string
    function extractString(input, index, length) {
        return input.substring(index, index + length);
    }

    // Get the 20 chars of the base 64 string at position
    const randomString = extractString(base64Audio, position, 20);

    // Render response using
    res.render('index', { randomString: randomString });
});

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
});
