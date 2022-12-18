const socket =  io.connect('http://localhost:3000')


window.addEventListener("load", () => {

  //Calibration of Canvas
    var a = window.innerHeight * 0.12;
    var b = window.innerWidth * 0.005;
  
  //Setting up Canvas Constants
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    
    canvas.height = window.innerHeight;
    canvas.width = 2000;
  
  //Setting up canvas Variables
    let painting = false;
    let drawColor = "green";
    let drawThickness = 2;
  
  //Drawing Functions
    function startPosition(e) {
      socket.emit('drawStart', e.clientX/window.innerWidth, e.clientY/window.innerHeight, {
      })
      painting = true;
    }
  
    function finishedPosition() {
      painting = false;
    }
  
    function draw(e) {
      if (!painting) return;  
        socket.emit( 'drawEvent', e.clientX/window.innerWidth, e.clientY/window.innerHeight, {
        })
    }

    socket.on('drawStartListen', (pos1, pos2) => {
      ctx.moveTo(pos1*window.innerWidth -b, pos2*window.innerHeight-a);
    })

    socket.on('drawListen', (number1, number2) => {
      ctx.lineWidth = drawThickness;
      ctx.lineCap = "round";
      ctx.lineTo(number1*window.innerWidth -b, number2*window.innerHeight-a);
      ctx.stroke();
      ctx.strokeStyle = drawColor;    
    })

    socket.on('firstConnectionDraw',(n1,n2) => {
      ctx.lineWidth = drawThickness;
      ctx.lineCap = "round";
      ctx.lineTo(n1*window.innerWidth -b, n2*window.innerHeight-a);
      ctx.stroke();
      ctx.strokeStyle = drawColor;
    })

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", draw);

  const clear = document.getElementById('clear')
    clear.addEventListener("click", clearCanvas)

      // Clear function
    function clearCanvas(){
      socket.emit('clear')    
    }

    socket.on('clearpage',() =>{{
      ctx.fillStyle = "#000023"
      ctx.beginPath()
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  })

});

//Username RoomID functions?

const roomid = document.getElementById('roomo')
const username = document.getElementById('usero')
const enterBtn = document.getElementById('entero')


enterBtn.addEventListener('click',() =>{
  if(username.value != '' && roomid.value != '')
  {
    console.log('Selamlar '+username.value+','+roomid.value+' numaralı odaya girmek istiyorsun ancak odalar şuan yapım aşamasında. Sabrın için teşekkürler.')
  }

})


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
  //message.value = '';
})

socket.on('chatToRoom',data =>{
  output.innerHTML +='<p><strong>'+ data.sender +' : </strong>'+data.message+'</p>'
  io.sockets.to("room1").emit('chatToRoom',data);
  message.value = '';
})

function upload(files){
  socket.emit("upload", files[0], (status)=>{
    console.log(status);
  });
}

//Pop-up Functions
function openForm() {
  if(document.getElementById("myForm").style.display == "block")
  {
    console.log("kapalı")
    document.getElementById("myForm").style.display = "none";
  }
  else
  {
    console.log("açık")
    document.getElementById("myForm").style.display = "block";
  }
}
  
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
  
//Pop-up Sidebar
function openSidebar() {
  document.getElementById("sidebar").style.display = "block";
  document.getElementById("open-sidebar").style.display = "none";
}
  
function closeSidebar() {
  document.getElementById("sidebar").style.display = "none";
  document.getElementById("open-sidebar").style.display = "block";
}


function codeBtn(){
  if(document.getElementById("codeBtn").style.backgroundColor != "darkorange"){
    document.getElementById("codeBtn").style.backgroundColor = "darkorange";
    document.getElementById("chatBtn").style.backgroundColor = "rgb(0, 0, 35)";
    document.getElementById("chat-wrap").style.display = "none";
    document.getElementById("code-wrap").style.display = "block";

  }

}

function chatBtn(){
  if(document.getElementById("chatBtn").style.backgroundColor != "darkorange"){
    document.getElementById("chatBtn").style.backgroundColor = "darkorange";
    document.getElementById("codeBtn").style.backgroundColor = "rgb(0, 0, 35)";
    document.getElementById("chat-wrap").style.display = "block";
    document.getElementById("code-wrap").style.display = "none";
  }
}