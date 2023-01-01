window.addEventListener("load", () => {
    console.log("we are in")
    const button = document.getElementById('clear')
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    var dataURL = canvas.toDataURL();

    button.addEventListener('click',() => {
        console.log("save?");
    })

   
})
