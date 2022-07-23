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


chrome.tabs.onActivated.addListener(function(tabs) {
    chrome.tabs.query({active : true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        console.log(url);
    })
});


