const socket =  io.connect('http://localhost:3000')





window.addEventListener("load", () => {

    const axisX = 12;
    const axisY = 12;

    var a = window.innerHeight * 0.118;
    var b = window.innerWidth * 0.0055;
  
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    
    canvas.height = window.innerHeight;
    canvas.width = 1770;
  
    let painting = false;
  
    function startPosition(e) {
      ctx.moveTo(e.clientX - b, e.clientY - a);
      painting = true;
    }
  
    function finishedPosition() {
      painting = false;
    }
  
    function draw(e) {
      if (!painting) return;
      socket.emit( 'drawEvent', e.clientX, e.clientY, {
      })
    }

    socket.on('drawListen', (number1, number2) => {

        
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineTo(number1 - b, number2 - a);
      ctx.stroke();
      ctx.strokeStyle = "green";
      
    })

    function drawServer(axisX, axisY) {
      if (!painting) return;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineTo(axisX - b, axisY - a);
      ctx.stroke();
      ctx.strokeStyle = "green";
    }

  
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", draw);
  });
  





  function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
  