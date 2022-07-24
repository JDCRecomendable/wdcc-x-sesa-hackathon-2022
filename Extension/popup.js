chrome.runtime.sendMessage({method:"getTime"},function(response){
    let time = response;
    const progressLabel = document.getElementById("progressLabel");
    const progressEl = document.getElementById("progressBar");
    progressEl.value = time;
    progressLabel.innerText = "Current time for money: "+progressEl.value+"/"+progressEl.max;
    
    setInterval(() => {
      if(currentStatus==true){ 
        progressEl.value++;
        progressLabel.innerText = "Current time for money: "+progressEl.value+"/"+progressEl.max;
        if (progressEl.value >= progressEl.max) {
          progressEl.value = 0;       
       }
      } else if(currentStatus==false){
        progressEl.value--;
        if (progressEl.value > 0) {
          progressLabel.innerText = "Current time for money: "+progressEl.value+"/"+progressEl.max;  
       }else{
        progressEl.value = 10;  
        progressLabel.innerText = "Current time for money: "+progressEl.value+"/"+progressEl.max;
       }
      }
      else{
        progressLabel.innerText = "Current time for money: "+progressEl.value+"/"+progressEl.max;
      }

    }, 1000);
});

var currentStatus;
function getcurrentStatus(status){
  currentStatus = status;
  console.log(status);
}

// This sender will update the users currency total
chrome.runtime.sendMessage({method:"getCurrency"},function(response){
  let currency = response;

  const api_url = "http://ripscamera0c.pythonanywhere.com/common/Alpha/details";
      
  // Defining async function
  async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    
    let currency = data.points;

    const currencyText = document.getElementById("currency");
    currencyText.innerText = currency;
  };
  getapi(api_url);
});

// This sender will update the users shield total
chrome.runtime.sendMessage({method:"getShields"}, function(response){
  let shields = response;
  
  
  const api_url = "http://ripscamera0c.pythonanywhere.com/common/Alpha/details";
      
  // Defining async function
  async function getapi(url) {
    
        // Storing response
        const response = await fetch(url);
    
        // Storing data in form of JSON
        var data = await response.json();
        console.log(data.numberOfShields);
        let shields = data.numberOfShields;

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
  }

  // Calling that async function
  getapi(api_url);

  
});


// This function will update the html and css based on url and status
chrome.runtime.sendMessage({method:"getInfo"},function(response){
  const progressBar = document.getElementById("progressBar");
  const heading = document.getElementById("h1");
  const h5 = document.getElementById("h5");
    let status = response;
    getcurrentStatus(status);

    if (status == true) {
      heading.style.color = "green";
      heading.innerText = "ayo making that bread";
      h5.innerText = "+100";
      //progressBar.style.backgroundColor = "green";
    } else if (status == false) {
        heading.style.color = "red";
        heading.innerText = "hey watch out";
        h5.innerText = "-100";
        //progressBar.style.backgroundColor = "red";
    } else {
        heading.style.color = "white";
        heading.innerText = "go to a different website";
        //progressBar.style.backgroundColor = "white";
    }

});

// This listener will send the user to the web app in a new tab when the attack button is pressed
var button = document.getElementById("attackBtn");
button.addEventListener("click", function(){
  chrome.tabs.create({url:"localhost:3000/shop"}); // Placeholder for web app
})

var WdcCxSesaHackathon2022 = require('wdc_cx_sesa_hackathon_2022');

var api = new WdcCxSesaHackathon2022.ChromeExtensionApi()
var userId = userId_example; //  

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.extProgressFull(userId, callback);

console.log(callback);