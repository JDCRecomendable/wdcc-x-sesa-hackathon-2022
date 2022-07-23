let time = 50;
let counter = 0;
let timeIncrement = setInterval(() => {
    time++;
    console.log(time)
    if (time >= 100) {
      time = 0;
      counter++; 
   }
  }, 1000);


chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    if(message.method == "getTime"){
      sendResponse(time);
    }
});


// Global variables storing current URL and status of URL

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    if(message.method == "getInfo"){
        sendResponse(currentURL, urlStatus);
    }
});


var current_tab;
// Listener for when the active tab changes
chrome.tabs.onActivated.addListener(function (tabs) {
  chrome.tabs.query(
    {
      active: true,
      lastFocusedWindow: true,
    },
    function (tabs) {
      // and use that tab to fill in out title and url
      var tab = tabs[0];
      //console.log(tab.url);
      alert(tab.url);
    }
  );

  //console.log(current_tab);
});

function alert(link){
  current_tab = link;
  console.log(current_tab);
  // Change html and css of popup
  let message = current_tab + urlStatus + "/message";
  chrome.runtime.sendMessage({method:message},function(response){
    console.log(response);
});
}
  



// This function sends the url to the server to check whether the link is on the blacklist/whitelist. Returns the status of the url
function getStatus(url) {
    // send url to server to get back status
    let status = true;

    return status;
};



let currency = 9900;
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    if(message.method == "getCurrency"){
      sendResponse(currency);
    }
  });

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.greeting === "hello")
        sendResponse({farewell: "goodbye"});
    }
  );

