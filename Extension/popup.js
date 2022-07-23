var time;

chrome.runtime.sendMessage({method:"getTime"},function(response){
    //here response will be the word you want
    time = response;
    console.log(time);
  });

const progressEl = document.getElementById("progressBar");
progressEl.value = 5;
let coinTimer = setInterval(() => {
  progressEl.value++;

  if (progressEl.value >= progressEl.max) {
    clearInterval(coinTimer);
    console.log("Would replace");
  }
}, 200);