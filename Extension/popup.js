

chrome.runtime.sendMessage({method:"getTime"},function(response){
    let time = response;
    const progressEl = document.getElementById("progressBar");
    progressEl.value = time;
    
    let coinTimer = setInterval(() => {
      progressEl.value++;
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


