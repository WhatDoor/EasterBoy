const express = require('express')
const server = express();
const path = require('path')

server.use(express.static(path.join(__dirname, 'public')))

server.use('/trailer', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'trailer.html'));
})

server.use('/XXXXXXXXXX', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'luke22_3.html'));
})

server.use('/TSEJCIOFTT', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'safe_code.html'));
})

server.use('/judasfood', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'judasfood.html'));
})

server.use('/morse', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'morse.html'));
})

server.use('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'whereyougoing.html'));
})


server.listen(3000)