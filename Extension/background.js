// import axios from 'axios';
const api = "https://ripscamera0c.pythonanywhere.com/ext/";
// const progEmpty = "/ext/{user_id}/progress-empty";
// const progFull = "/ext/{user_id}/progress-full";
const tabChange = "/switch-tabs";

const user = "Alpha";

// const axios = require('axios').default;

let time = 0;
let counter = 0;
let timeIncrement = setInterval(() => {
    if(urlStatus==true){
        time++;
        if (time >= 10) {
            time = 0;
            counter++; 
        }
    }else if(urlStatus==false){
        time--;
        if (time == 0) {
            time = 10;
            counter--; 
    }else{
        time =time;
    }
    
   }
  }, 1000);


chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    if(message.method == "getTime"){
      sendResponse(time);
    }
});


// Global variables storing current URL and status of URL
let currentURL = '';
let urlStatus = null;


// This listener will send the current url and url status to the popup window when opened
chrome.runtime.onMessage.addListener(function(message,sender,response){
    if(message.method == "getInfo"){
        response(urlStatus);
    }
    const apiString = api + user + tabChange;
      console.log(apiString);
  
      fetch(apiString).then(function(res) {
        if(res.status !== 200){
          response({ timeProgress: 0, newDomain: "oh no"});
          return
        }
        res.json().then(function(data) {
          debugger;
          //send the respoinse..
          response( {timeProgress: time, newDomain: url});
          console.log("here", data);
        });
      }).catch(function(err) {
        response({timeProgress: 0, newDomain: "no good"});
      });
});


var current_tab;
// Listener for when the active tab changes
chrome.tabs.onActivated.addListener(function (tabs) {
  chrome.tabs.query(
    {
      active: true,
      lastFocusedWindow: true,
    },
    function (tabs) {
      // and use that tab to fill in out title and url
      var tab = tabs[0];
      //console.log(tab.url);
      alert(tab);
    }
  );

  //console.log(current_tab);
});

function alert(link){
  current_tab = new URL(link.url).hostname;
  console.log(current_tab);

  // Send current url to back end to receive back status
  getStatus(current_tab);

}
  
var url_g = "test"
// This function sends the url to the server to check whether the link is on the blacklist/whitelist. Returns the status of the url
function getStatus(url) {
    // send url to server to get back status
    urlStatus = true;
    // if(msg.name == ""){
    url_g = url;
    // }
}

let currency = 9900;
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    if(message.method == "getCurrency"){




      sendResponse(currency);
    }
  });

  
var contentTabId;

chrome.runtime.onMessage.addListener(function(msg,sender) {
  if (msg.from == "content") {  //get content scripts tab id
    contentTabId = sender.tab.id;
  }
    if (msg.from == "popup" && contentTabId) {  //got message from popup
      chrome.tabs.sendMessage(contentTabId, {  //send it to content script
        from: "background",
        first: msg.first,
        second: msg.second
      });
    }
  });

  // Placeholder for shields until back end sends correct among
  let shields = 2;

  // This listener checks how many shields the user has and sends it to the popup
  chrome.runtime.onMessage.addListener(function(message,sender,sendResponse) {
    if (message.method == "getShields") {
      sendResponse(shields);
    }
  });

  chrome.runtime.onMessage.addListener(function(message,sender,sendResponse) {
    if (message.method == "yo") {
      sendResponse("heyman");
    }
  });


//async implmenetation for the app
const newPost = {
  userId: 1,
  title: 'A new post',
  body: 'This is the body of the new post'
};

// const sendtabChangeRequest = async () => {
//   try {
//       const reqUrl = api + tabChange;
//       const resp = await axios.post(reqUrl, newPost);
//       console.log(resp.data);
//   } catch (err) {
//       // Handle Error Here
//       console.error(err);
//   }
// };

