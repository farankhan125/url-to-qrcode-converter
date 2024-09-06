import qr from 'qr-image';
import fs from 'fs';
import express from 'express'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'
import bodyParser from 'body-parser';

const __dirname = dirname(fileURLToPath(import.meta.url));
const qrImageDir = dirname(fileURLToPath(import.meta.url)) + "/public/imgs";
const savePath = path.join(qrImageDir, 'qr.png');
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log('running')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/result', (req, res) => {
    var url = req.body.url 
    var img = qr.image(url, { type: 'png' })
    img.pipe(fs.createWriteStream(savePath))
    res.sendFile(__dirname + '/public/result.html')
})