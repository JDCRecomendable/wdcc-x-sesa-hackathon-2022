let time = 25;
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    if(message.method == "getTime"){
      sendResponse(time);
    }
  });