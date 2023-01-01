window.addEventListener("load", () => {
const button3 = document.getElementById('button3')
const editor = CodeMirror.fromTextArea(document.getElementById("CodeWindow"), {
  lineNumbers: true,
  mode: 'javascript'
});
editor.getDoc().setValue("\n\n\n\n\n\n\n\n\n\n\n\n\n\n");

button3.addEventListener('click',() => {
  console.log(editor.getValue());
  socket.emit('codeSend',editor.getValue());
})
socket.on('codeRecive',code=>{
  editor.getDoc().setValue(code);
})
})