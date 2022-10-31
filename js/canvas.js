window.addEventListener("load", () => {
  var a = window.innerHeight * 0.118;
  var b = window.innerWidth * 0.0055;

  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");

  console.log("asdsad");

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
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineTo(e.clientX - b, e.clientY - a);
    ctx.stroke();
    ctx.strokeStyle = "green";
  }

  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", finishedPosition);
  canvas.addEventListener("mousemove", draw);
});
