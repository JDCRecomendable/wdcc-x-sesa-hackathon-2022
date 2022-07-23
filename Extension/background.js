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