const express = require('express')
const app = express()
const dbManager = require('./dbManager.js')

app.use(express.static('client', { extensions: ['html'] }))

function asyncWrap(f) {
    return (req, res, next) => {
        Promise.resolve(f(req, res, next))
            .catch((e) => next(e || new Error()));
    };
}

async function postFile(req, res) {
    const file = await dbManager.addFile(req.body);
    res.json(file);
}

app.post('/files', express.json(), asyncWrap(postFile));

app.listen(8080)
