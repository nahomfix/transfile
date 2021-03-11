const express = require('express');
const fileUpload = require('express-fileupload');
const monk = require('monk');
const { nanoid } = require('nanoid');
const fs = require('fs');
const cors = require('cors');
const cron = require('node-cron');
const path = require('path');

const app = express();
const PORT = 3000;
require('dotenv').config();


const db = monk(process.env.MONGO_URI);
const links = db.get('links');

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'build')));

app.post('/uploads', function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let uploadFile = req.files.file;
    let uploadPath = __dirname + '/uploads/' + uploadFile.name;

    // Use the mv() method to place the file somewhere on your server
    uploadFile.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).send(err);
        }

        const slug = nanoid(5);

        const data = {
            name: uploadFile.name,
            mimetype: uploadFile.mimetype,
            size: uploadFile.size,
            message: req.body.message,
            slug: slug,
            link: `${process.env.HOST}:${process.env.PORT}/${slug}`
        }


        links.insert(data);

        res.json({
            status: true,
            message: 'File is uploaded',
            data: data
        });
    });
});


// app.get('/:slug', async (req, res) => {
//     const data = await links.findOne({ slug: req.params.slug });
//     if (!data) {
//         res.status(400).send('File not found!');
//     } else {
//         const { name, message } = data;
//         let uploadPath = __dirname + '/uploads/' + name;
//         fs.readFile(uploadPath, (err, file) => {
//             res.json({ name, file, message });
//         });
//     }
// });


app.get('/uploads/:slug', async (req, res) => {
    const data = await links.findOne({ slug: req.params.slug });
    if (!data) {
        res.status(400).send('File not found!');
    } else {
        const { name, message } = data;
        res.json({ name, message });
    }
});

app.get('/download/:slug', async (req, res) => {
    const data = await links.findOne({ slug: req.params.slug });
    if (!data) {
        res.status(400).send('File not found!');
    } else {
        const { name } = data;
        let uploadPath = __dirname + '/uploads/' + name;
        res.set({
            "Content-Disposition": 'attachment;filename="' + name + '"',
            "Content-Type": "application/octet-stream"
        });
        res.sendFile(uploadPath);
    }
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


// cron.schedule('0 * */23 * * *', () => {
//     fs.readdir(__dirname + '/uploads/', (err, files) => {
//         if (files.length) {
//             files.forEach(file => {
//                 fs.unlink(__dirname + '/uploads/' + file, (err) => {
//                     if (err) {
//                         console.log(err)
//                     }
//                 });
//             });
//             links.drop();
//         }
//     });
// });


app.listen(process.env.PORT || PORT, () => {
    console.log(`Server started on port: ${process.env.PORT || PORT}`);
});