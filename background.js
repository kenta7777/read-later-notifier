// set up notification interval
chrome.storage.local.get(['notificationInterval'], function(result) {
    let interval;
    let selectedNotificationInterval;
    
    console.log('The stored notification interval: ' + result.notificationInterval);
    selectedNotificationInterval = parseInt(result.notificationInterval, 10)

    if (isNotificationIntervalValid(selectedNotificationInterval)) {
        interval = selectedNotificationInterval
    } else {
        // default
        interval = 30    
    }

    chrome.alarms.create('read later notifier', { delayInMinutes : 1, periodInMinutes : interval });
});

// load selected folder name in popup
let selectedFolderName;
chrome.storage.local.get(['selectedFolder'], function(result) {
    console.log('The stored folder name: ' + result.selectedFolder);
    selectedFolderName = result.selectedFolder
});

// load selected number of notifications at one time
let selectedNumberOfNotifications;
chrome.storage.local.get(['numberOfNotifications'], function(result) {
    console.log('The stored number of notifications: ' + result.numberOfNotifications);
    selectedNumberOfNotifications = parseInt(result.numberOfNotifications, 10)
});

// set up addListener for notifying read later contents periodically
chrome.alarms.onAlarm.addListener(function(alarm){
    
    // get all bookmark tree
    chrome.bookmarks.getTree(function(bookmark){
        let folderName;        
        if (isFolderNameValid(selectedFolderName)) {
            folderName = selectedFolderName
        } else {
            // default
            folderName = "read_later"
        }
        
        console.log('folder name: ' + folderName)
        
        let notificationsCount;
        if (isNumberOfNotificationsValid(selectedNumberOfNotifications)) {
            notificationsCount = selectedNumberOfNotifications
            console.log('then branch. notificationsCount: '+ notificationsCount)
        } else {
            // default
            notificationsCount = 3
        }

        console.log('notifications count: ' + notificationsCount)


        var root = bookmark[0]['children']
        var bookMarkBar = root[0]['children']

        // get read later folder from book mark bar
        var readLater = bookMarkBar.filter(function(elem, index, array) {
            return isChildrenArray(elem) && elem.title == folderName
        })

        // get random read later contents from readLater 
        var selectedReadLater = getReadLaterContents(readLater[0]['children'], notificationsCount)
        console.log(selectedReadLater)
        
        selectedReadLater.forEach(function(item, index, array) {
            var notification = new Notification(item.title, {               
                body: "",
                requireInteraction: true     
            });
            notification.addEventListener("click", function (event) {
                notificationClicked(item.url)
                notification.close()
            } )
        })
    })
});

function getReadLaterContents(contentsArray, notificationsCount) {
    if (notificationsCount == 0) {
        return []
    }
    
    var selectedContentsArray = []
    const contentTotalCount = contentsArray.length

    var randomIndexesArray = getRandomIndexes(contentTotalCount, notificationsCount)
    randomIndexesArray.forEach( elem => {
        selectedContentsArray.push(contentsArray[elem])
    })
    
    return selectedContentsArray
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    
    return Math.floor(Math.random() * (max - min) + min); 
}

// get selected number of indexes without duplication 
// to avoid showing same contents
function getRandomIndexes(contentTotalCount, notificationsCount) {
    var randomIndexesArray = []
    
    for (let index = 0; index < notificationsCount; index++) { 
        while(true) {
            var randomInt = getRandomInt(0, contentTotalCount)
            if(!randomIndexesArray.includes(randomInt)) {
                randomIndexesArray.push(randomInt)
                break
            }
        }
    }

    return randomIndexesArray
}

function isChildrenArray(elem) {
    return 'children' in elem
}

function notificationClicked(url) {
    chrome.tabs.create({ "url": url, active: false });
}

function isFolderNameValid(folderName) {
    return folderName != "" | folderName != null || folderName != undefined
}

function isNumberOfNotificationsValid(folderName) {
    return folderName != "" | folderName != null || folderName != undefined
}

function isNotificationIntervalValid(notificationInterval) {
    return notificationInterval != "" | notificationInterval != null || notificationInterval != undefined
}
