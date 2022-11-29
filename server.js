const express = require('express');
const app = express();
const path = require('path');
const { urlencoded } = require('express');

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 8080;

app.get("/", (req, res) => {
    res.sendFile(path.resolve('index.html'))
});


app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + '/public')));



if (externalUrl) {
    const hostname = '127.0.0.1';
    app.listen(port, hostname, () => {
        console.log(`Server locally running at http://${hostname}:${port}/ and from outside on ${externalUrl}`);
    });
}
else {
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });

}