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


// This sender will update the users currency total
chrome.runtime.sendMessage({method:"getCurrency"},function(response){
  let currency = response;
  const currencyText = document.getElementById("currency");
  currencyText.innerText = currency;
});

// This sender will update the users shield total
chrome.runtime.sendMessage({method:"getShields"}, function(response){
  let shields = response;
  if (shields == 3) {

    document.getElementById("shield1").style.opacity = "1";
    document.getElementById("shield2").style.opacity = "1";
    document.getElementById("shield3").style.opacity = "1";
  } else if (shields == 2) {

    document.getElementById("shield1").style.opacity = "1";
    document.getElementById("shield2").style.opacity = "1";
    document.getElementById("shield3").style.opacity = "0.3";
  } else if (shields == 1) {

    document.getElementById("shield1").style.opacity = "1";
    document.getElementById("shield2").style.opacity = "0.3";
    document.getElementById("shield3").style.opacity = "0.3";
  } else {

    document.getElementById("shield1").style.opacity = "0.3";
    document.getElementById("shield2").style.opacity = "0.3";
    document.getElementById("shield3").style.opacity = "0.3";
  }
});

// This function will update the html and css based on url and status
chrome.runtime.sendMessage({method:"getInfo"},function(response){

    let status = response;

    if (status == true) {
      document.getElementById("h1").style.color = "green";
      document.getElementById("progressBar").style.background = "green";
    } else if (status == false) {
      document.getElementById("h1").style.color = "red";
      document.getElementById("progressBar").style.background = "red";
    } else {
      document.getElementById("h1").style.color = "white";
      document.getElementById("progressBar").style.background = "white";
    }

});




