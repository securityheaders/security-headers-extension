var score = "";
var xhr = new XMLHttpRequest();
var hasClicked = false;
var currentURL = "";
var currentTab = "";

// Fire when user clicks icon
chrome.browserAction.onClicked.addListener(function (tab) {
	var host = tab.url.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[0];

	if (hasClicked) {
		chrome.tabs.create({ url: "https://securityheaders.io/?hide=on&source=chromeplugin&q=" + host });
	}
	else
	{
		hasClicked = true;
		if(isValidURL(host)) {
        	xhr.open("HEAD", "https://securityheaders.io/?hide=on&source=chromeplugin&q=" + host, true);
        	xhr.send();
    	}
	}
    currentURL = tab.url;
    currentTab = tab.id;
});

// Handle tab switching
chrome.tabs.onActivated.addListener(function ({ tabId }) {
    setDefault();
    currentTab = tabId;
    chrome.tabs.get(tabId, function (tab) {
        currentURL = tab.url;
    });
});

// Handle URL changes
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if(tab.url != currentURL && tabId == currentTab) {
        setDefault();
    }
});

// Handle XMLHTTP State Changes
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4 && xhr.status == 200) {
    score = JSON.parse(atob((xhr.getResponseHeader('X-Score'))));
    switch(score.score) {
        case "A+":
            chrome.browserAction.setIcon({path: 'icons/Aplus.png'});
        break;

        case "A":
            chrome.browserAction.setIcon({path: 'icons/A.png'});
        break;

        case "B":
            chrome.browserAction.setIcon({path: 'icons/B.png'});
        break;

        case "C":
            chrome.browserAction.setIcon({path: 'icons/C.png'});
        break;

        case "D":
            chrome.browserAction.setIcon({path: 'icons/D.png'});
        break;

        case "E":
            chrome.browserAction.setIcon({path: 'icons/E.png'});
        break;

        case "F":
            chrome.browserAction.setIcon({path: 'icons/F.png'});
        break;

        case "R":
            chrome.browserAction.setIcon({path: 'icons/R.png'});
        break;

        case "Q": // error
            chrome.browserAction.setIcon({path: 'icons/Q.png'});
        break;

        default:
            // do nothing
        break;
    }
  }
}

function isValidURL(url) {
  return (url.indexOf("http://") == 0 || url.indexOf("https://") == 0) ? true : false;
}

function setDefault() {
    chrome.browserAction.setIcon({path: 'icons/security-headers-icon-48.png'});
    hasClicked = false;
}
