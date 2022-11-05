const express = require('express')
const socket = require('socket.io')

const app = express()
const server = app.listen(3000)

app.use(express.static('public'))

const io = socket(server)

io.on('connection', (socket) => {
    console.log(socket.id)

    socket.on('drawEvent', (number1, number2) => {
        console.log(number1 + "---" + number2),
        io.emit('drawListen', number1, number2)
    })


})
