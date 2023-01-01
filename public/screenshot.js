window.addEventListener("load", () => {
    console.log("we are in")
    const button5 = document.getElementById('save');
    button5.addEventListener('click',() => {
        console.log("screenshot baby!");
        
        const canvas = document.getElementById('canvas');
        const img    = canvas.toDataURL('image/png');
        var win = window.open();
        win.document.write('<iframe src="' + img + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>')
    })
})
