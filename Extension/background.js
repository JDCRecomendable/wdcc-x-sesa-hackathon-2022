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
let currentURL = '';
let urlStatus = null;


// This listener will send the current url and url status to the popup window when opened
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    if(message.method == "getInfo"){
        sendResponse(urlStatus);
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
      alert(tab);
    }
  );

  //console.log(current_tab);
});

function alert(link){
  current_tab = link.url;
  updateDomain(current_tab);
  // Send current url to back end to receive back status
  getStatus(current_tab);

}
  


function updateDomain(link){
  const url = new URL(link);
  console.log(url.hostname);
  document.getElementById("domain").setAttribute("name", "url.hostname"); 
}

// This function sends the url to the server to check whether the link is on the blacklist/whitelist. Returns the status of the url
function getStatus(url) {
    // send url to server to get back status
    urlStatus = true;
}

let currency = 9900;
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    if(message.method == "getCurrency"){
      sendResponse(currency);
    }
  });

  
var contentTabId;

chrome.runtime.onMessage.addListener(function(msg,sender) {
  if (msg.from == "content") {  //get content scripts tab id
    contentTabId = sender.tab.id;
  }
    if (msg.from == "popup" && contentTabId) {  //got message from popup
      chrome.tabs.sendMessage(contentTabId, {  //send it to content script
        from: "background",
        first: msg.first,
        second: msg.second
      });
    }
  });

  // Placeholder for shields until back end sends correct among
  let shields = 2;

  // This listener checks how many shields the user has and sends it to the popup
  chrome.runtime.onMessage.addListener(function(message,sender,sendResponse) {
    if (message.method == "getShields") {
      sendResponse(shields);
    }
  });

  chrome.runtime.onMessage.addListener(function(message,sender,sendResponse) {
    if (message.method == "yo") {
      sendResponse("heyman");
    }
  });


