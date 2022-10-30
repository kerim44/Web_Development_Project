window.addEventListener("load", () => {
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");

  console.log("asdsad");

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;


  let painting = false;
  ctx.fillStyle ='white'



  function startPosition(e){
    ctx.moveTo(e.clientX,e.clientY-108);
    painting = true;
  }

  function finishedPosition(){
    painting = false;
  }

  function draw(e){
    if(!painting) return;
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.lineTo(e.clientX,e.clientY-108);
    ctx.stroke();
  }

  

  canvas.addEventListener("mousedown", startPosition)
  canvas.addEventListener("mouseup", finishedPosition)
  canvas.addEventListener("mousemove", draw)
});
