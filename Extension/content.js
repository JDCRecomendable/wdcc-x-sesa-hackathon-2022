<<<<<<< HEAD


// chrome.runtime.sendMessage({from:"content"}); //first, tell the background page that this is the tab that wants to receive the messages.

// chrome.runtime.onMessage.addListener(function(msg) {
//   if (msg.from == "background") {
//     var first = msg.first;
//     var second = msg.second;
//     //here you use the values as you wish, for example:
//     //document.getElementById("anInput").value = first;
//   }
// });

// console.log("testing")

// let p = document.getElementsByTagName('div');

// for(elt of p){
//   elt.style['background-color'] = "red";
// }
=======
>>>>>>> ba1c37de440368c4a5c8d4b1e2192a88f9d5aaf8

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
    iframe.style.top = "0px";
    iframe.style.opacity = "1";
    iframe.style.zIndex = "9000000000000000000";
<<<<<<< HEAD
    iframe.srcdoc = '<center><iframe src="https://giphy.com/embed/UtcBRO8cxulRzkrVLc" width="800" height="800" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></center>';
    */

    //document.body.appendChild(iframe);

    //play audio
    var myAudio = new Audio(chrome.runtime.getURL("sounds/ugotthat.mp3"));
    myAudio.play();

=======
    iframe.srcdoc = '<center><iframe src="'+fileLink+'" width="1000px" height="1000px" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></center>';
    
    document.body.appendChild(iframe);
>>>>>>> ba1c37de440368c4a5c8d4b1e2192a88f9d5aaf8
    //10 seconds timer to remove ifram
    // let counter =0;
    // setInterval(() => {
    //   counter++
    //   if(counter ==10){
    //     document.body.removeChild(iframe);
    //   }
    // }, 1000);
    

    //cursor
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
