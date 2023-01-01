class Node {
    constructor(element) {
        this.element = element;
        this.next = null
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    add(element) {
        var node = new Node(element);
        var current;
        if (this.head == null)
            this.head = node;
        else {
            current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.size++;
    }
    size_of_list() {
        console.log(this.size);
    }

    isEmpty() {
      return this.size == 0;
    }

    printList() {
        var curr = this.head;
        var str = "";
        while (curr) {
            str += curr.element + " ";
            curr = curr.next;
        }
        console.log(str);
    }
}

const express = require('express')
const socket = require('socket.io')

const app = express()
const server = app.listen(3000)

app.use(express.static('public'))

const io = socket(server)
let socketId = null;

let cnt = 0;
var llist = new LinkedList();


io.on('connection', (socket) => {
    socketId = socket.id;
    if(llist.isEmpty){
        console.log("new user..."+socketId+"         sending data...")
        var curr = llist.head;
        while (curr) {
            io.to(socketId).emit('firstConnectionDraw',curr.element,curr.next.element);
            curr = curr.next.next;
        }
    }

    socket.on('drawStart', (pos1, pos2) =>{
        io.emit('drawStartListen',pos1,pos2)
    })

    socket.on('drawEvent', (number1, number2) => {
        llist.add(number1);
        llist.add(number2);
        cnt++;
        io.emit('drawListen', number1, number2)
    })

    socket.on('chat',data=>{
        io.sockets.emit('chat',data)
    })

    socket.on('chatToRoom',data =>{
        io.sockets.to(room).emit('chatToRoom',data);
    })

    socket.on("upload", (file, callback)=>{
        console.log(file);
    })
    
    socket.on('clear',() =>{
        llist.head = llist.next     
        io.sockets.emit('clearpage') 
    })

    socket.on('codeSend',code=>{
        io.sockets.emit('codeRecive',code);
    })
})
