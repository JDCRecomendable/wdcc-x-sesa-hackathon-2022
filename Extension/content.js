
window.addEventListener("click", test, true);

function test() {
  chrome.runtime.sendMessage({ method: "yo" }, function (response) {
    console.log(response);
    createIframe("https://giphy.com/embed/UtcBRO8cxulRzkrVLc")
    playAudio("ugotthat.mp3");
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
    iframe.srcdoc = '<center><iframe src="'+fileLink+'" width="1000px" height="1000px" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></center>';
    
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
