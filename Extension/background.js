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
let urlStatus = '';

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    if(message.method == "getInfo"){
        // chrome.storage.local.get.([urlkey], (result) => {
            
        // });
        sendResponse(currentURL, urlStatus);
    }
});

// Listener for when the active tab changes
chrome.tabs.onActivated.addListener(function(tabs) {
    currentURL = getURL();
    urlStatus = getStatus(currentURL);
    // chrome.storage.local.set({urlkey: url}, function() {
    // })
    // chrome.storage.local.set({statuskey: status}, function() {
    // })
    console.log(currentURL);
    console.log(urlStatus)
});

// This function returns the url of the active tab
function getURL() {
    chrome.tabs.query({active : true, lastFocusedWindow: true}, tabs => {
         let url = tabs[0].url;
         return url;
    })
}

// This function sends the url to the server to check whether the link is on the blacklist/whitelist. Returns the status of the url
function getStatus(url) {
    // send url to server to get back status
    let status = True;

    return status;
}




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
