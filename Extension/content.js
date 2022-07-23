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

window.addEventListener("click", test, true);

function test() {
  chrome.runtime.sendMessage({ method: "yo" }, function (response) {
    console.log(response);
    var iframe = document.createElement("iframe");
    iframe.style.height = "100%";
    iframe.style.width = "100%";
    iframe.style.position = "fixed";
    iframe.style.top = "0px"
    iframe.style.opacity = "1";
    iframe.style.zIndex = "9000000000000000000";
    iframe.srcdoc = "<img src='https://c.tenor.com/n9Hl8cEdNV4AAAAC/ricardo-milos.gif' width='100%' height='100%'>";
    

    document.body.appendChild(iframe);
    let counter =0;
    setInterval(() => {
      counter++
      if(counter ==10){
        document.body.removeChild(iframe);
      }
    }, 1000);
    
  });
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
