window.addEventListener("load", () => {
//const socket =  io.connect('http://localhost:3000')
const button3 = document.getElementById('button3')
const editor = CodeMirror.fromTextArea(document.getElementById("CodeWindow"), {
  lineNumbers: true,
  mode: 'javascript'
});
editor.getDoc().setValue('    CODE HERE!');

button3.addEventListener('click',() => {
  console.log(editor.getValue());
  socket.emit('codeSend',editor.getValue());
})

socket.on('codeRecive',code=>{
  editor.getDoc().setValue(code);
})

})



