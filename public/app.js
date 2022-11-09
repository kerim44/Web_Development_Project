const socket =  io.connect('http://localhost:3000')


window.addEventListener("load", () => {

  //Calibration of Canvas
    var a = window.innerHeight * 0.118;
    var b = window.innerWidth * 0.0055;
  
  //Setting up Canvas Constants
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    
    canvas.height = window.innerHeight;
    canvas.width = 1770;
  
  //Setting up canvas Veraibles
    let painting = false;
    let drawColor = "green";
    let drawThickness = 2;
    var delayInMilliseconds = 1;
  
  //Drawing Functions
    function startPosition(e) {
      socket.emit('drawStart', e.clientX, e.clientY, {
      })
      painting = true;
    }
  
    function finishedPosition() {
      painting = false;
    }
  
    function draw(e) {
      if (!painting) return;
      setTimeout(function() {
        socket.emit( 'drawEvent', e.clientX, e.clientY, {
        })
      }, delayInMilliseconds);
      
    }

    socket.on('drawStartListen', (pos1, pos2) => {
      ctx.moveTo(pos1 - b, pos2 - a);
    })

    socket.on('drawListen', (number1, number2) => {
      ctx.lineWidth = drawThickness;
      ctx.lineCap = "round";
      ctx.lineTo(number1 - b, number2 - a);
      ctx.stroke();
      ctx.strokeStyle = drawColor;    
    })

    socket.on('firstConnectionDraw',(n1,n2) => {
      ctx.lineWidth = drawThickness;
      ctx.lineCap = "round";
      ctx.lineTo(n1 - b, n2 - a);
      ctx.stroke();
      ctx.strokeStyle = drawColor;  
    })

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", draw);
  });
  
// Messaging functions
const sender = document.getElementById('sender')
const message = document.getElementById('message')
const output = document.getElementById('output')
const feedback = document.getElementById('feedback')
const button2 = document.getElementById('button2')

button2.addEventListener('click',() => {
  
  if(message.value!='' && sender.value !=''){
    socket.emit('chat',{
    message:message.value,
    sender:sender.value   
  })}
})
socket.on('chat', data =>{
  output.innerHTML +='<p><strong>'+ data.sender +' : </strong>'+data.message+'</p>'
  message.value = '';
})

//Pop-up Functions
  function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
  