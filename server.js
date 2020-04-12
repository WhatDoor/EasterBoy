const express = require('express')
const server = express();
const path = require('path')

server.use(express.static(path.join(__dirname, 'public')))

server.use('/source_code', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'source_code.html'));
})

server.use('/insert10charactershere', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'luke22_3.html'));
})

server.use('/TSEJCIOOTT', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'safe_code.html'));
})

server.use('/judasfood', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'judasfood.html'));
})

server.use('/baraloc', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'morse.html'));
})

server.use('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'whereyougoing.html'));
})


server.listen(3000)