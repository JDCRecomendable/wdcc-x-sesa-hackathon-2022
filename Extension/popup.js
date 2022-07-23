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

// This function will update the html and css based on url and status
chrome.runtime.sendMessage({method:"getInfo"},function(response){
  const progressBar = document.getElementById("progressBar");
  const heading = document.getElementById("h1")
    let status = response;

    if (status == true) {
      heading.style.color = "green";
      progressBar.style.backgroundColor = "green";
    } else if (status == false) {
        heading.style.color = "red";
        progressBar.style.backgroundColor = "red";
    } else {
      heading.style.color = "white";
      progressBar.style.backgroundColor = "white";
    }

});




