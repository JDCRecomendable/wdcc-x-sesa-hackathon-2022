chrome.runtime.sendMessage({from:"content"}); //first, tell the background page that this is the tab that wants to receive the messages.

chrome.runtime.onMessage.addListener(function(msg) {
  if (msg.from == "background") {
    var first = msg.first;
    var second = msg.second;
    //here you use the values as you wish, for example:
    //document.getElementById("anInput").value = first;
  }
});
