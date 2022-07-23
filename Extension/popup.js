chrome.runtime.sendMessage({method:"getTime"},function(response){
    let time = response;
    const progressLabel = document.getElementById("progressLabel");
    const progressEl = document.getElementById("progressBar");
    progressEl.value = time;
    progressLabel.innerText = "Current time for money: "+progressEl.value+"/"+progressEl.max;
    
    setInterval(() => {
      progressEl.value++;
      progressLabel.innerText = "Current time for money: "+progressEl.value+"/"+progressEl.max;
      if (progressEl.value >= progressEl.max) {
        progressEl.value = 0;       
     }
    }, 1000);
});

chrome.runtime.sendMessage({method:"getCurrency"},function(response){
  let currency = response;
  const currencyText = document.getElementById("currency");
  currencyText.innerText = currency;

});

chrome.runtime.sendMessage({method:"getInfo"},function(response){
    // Grab html and css
    
    // Change html and css based on url and status
});

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    if(message.method == "*/message"){ 
        console.log(message.method);
        sendResponse("good");
    }
});




