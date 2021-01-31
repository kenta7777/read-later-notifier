// create an alarm
chrome.alarms.create('read later notifier', { delayInMinutes : 1, periodInMinutes : 60 });

// set up addListener for notifies read later contents periodically
chrome.alarms.onAlarm.addListener(function(alarm){
    
    // get all bookmark tree
    chrome.bookmarks.getTree(function(bookmark){
        // TODO: enable to select directory name and content item number in setting menu(#3)
        var selectedDirectoryName = "read_later"
        var selectedItemNumber = 3
        var root = bookmark[0]['children']
        var bookMarkBar = root[0]['children']

        // get read later directory from book mark bar
        var readLater = bookMarkBar.filter(function(element, index, array) {
            return isChildrenArray(element) && element.title == selectedDirectoryName
        })

        // get random read later contents from readLater 
        // TODO: error handling(if n <= 2) when implementing setting menu(#3)
        var selectedReadLater = getReadLaterContents(readLater[0]['children'], selectedItemNumber)
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

function getReadLaterContents(array, number) {
    if (number == 0) {
        return []
    }
    
    var selectedReadLaterContentsArray = []
    const max = array.length

    var randomIndexesArray = getRandomIndexes(max, number)
    randomIndexesArray.forEach( elem => {
        selectedReadLaterContentsArray.push(array[elem])
    })
    
    return selectedReadLaterContentsArray
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    
    return Math.floor(Math.random() * (max - min) + min); 
}

// get an array that holds selected number of index for contents array
// to avoid the duplicate of contents
function getRandomIndexes(max, selectedItemNumber) {
    var array = []
    
    for (let index = 0; index < selectedItemNumber; index++) { 
        while(true) {
            var randomInt = getRandomInt(0, max)
            if(!array.includes(randomInt)) {
                array.push(randomInt)
                break
            }
        }
    }

    return array
}

function isChildrenArray(elem) {
    return 'children' in elem
}

function notificationClicked(url) {
    chrome.tabs.create({ "url": url, active: false });
}
