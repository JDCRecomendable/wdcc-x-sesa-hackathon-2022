
window.addEventListener("click", test, true);

const imgs = ['https://giphy.com/embed/d3mlE7uhX8KFgEmY', 'https://giphy.com/gifs/culture--think-hmm-d3mlE7uhX8KFgEmY', 'https://giphy.com/embed/a5viI92PAF89q']


function test() {
  chrome.runtime.sendMessage({ method: "yo" }, function (response) {
    console.log(response);
    var x = Math.floor(Math.random() * 5)
    var y = Math.floor(Math.random() * 3)
        if (x == 0){
            createIframe("https://giphy.com/embed/UtcBRO8cxulRzkrVLc")
            playAudio("ugotthat.mp3");
        }
        if( x == 1){
            const colours = ["red", "green", "yellow", "blue", "purple", "pink", "orange", "Chartreuse", "DarkGoldenRod", "GreenYellow", "thistle"];
            const fg = [];
            const bg = []
            let elements = document.getElementsByTagName("*");
            console.log(elements);
            for (elt of elements) {
        
              fg.push(elt.style.color);
              bg.push(elt.style.background);
        
              elt.style.cursor = 'none';
              console.log(elt.style.cursor);
              let col1 = Math.floor(Math.random() * 12);
              let col2 = Math.floor(Math.random() * 12);
              elt.style.color = colours[col1];
              elt.style.background = colours[col2];
        
            }
        
            // 10 seconds timer to remove ifram
            let counter =0;
            setInterval(() => {
              counter++
              if(counter ==15){
                var ctr = 0
                for(elt of elements){
                    elt.style.cursor = 'default';
        
                    elt.style.color = fg[ctr];
                    elt.style.background = bg[ctr];
                    ctr = ctr + 1;
                }
        
              }
            }, 1000);
        }
        if(x==2){
            playAudio("scream.mp3")
        }
        if(x==3){
            playAudio("knock.mp3")
        }
        if(x==4){
            createIframe(imgs[y]);
        }
    });

}


function createIframe(fileLink){
    var iframe = document.createElement("iframe");
    iframe.style.height = "100%";
    iframe.style.width = "100%";
    iframe.style.position = "fixed";
    iframe.style.top = "0px"
    iframe.style.opacity = "1";
    iframe.style.zIndex = "9000000000000000000";
    iframe.srcdoc = '<center><iframe src="'+fileLink+'" width="700px" height="700px" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></center>';
    
    document.body.appendChild(iframe);
    //10 seconds timer to remove ifram
    let counter =0;
    setInterval(() => {
      counter++
      if(counter ==10){
        document.body.removeChild(iframe);
      }
    }, 1000);
}

 function playAudio(filename){
    //play audio
    var myAudio = new Audio(chrome.runtime.getURL("sounds/"+filename));
    myAudio.play();
}



/*chrome.runtime.sendMessage({ from: "content" }); //first, tell the background page that this is the tab that wants to receive the messages.

chrome.runtime.onMessage.addListener(function (msg) {
  if (msg.from == "background") {
    console.log("hello");
    //here you use the values as you wish, for example:
    //document.getElementById("anInput").value = first;
  }
});
*/

function gotMessage(request, sender, sendResponse) {
  console.log(request.txt);
  if (request.txt == "hello") {
    let bodies = document.getElementsByTagName("body");
    for (elt of bodies) {
      elt.style["background-color"] = "#000000";
    }
  }
}
