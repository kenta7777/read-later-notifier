// create an alarm
chrome.alarms.create('read later notifier', { delayInMinutes : 1, periodInMinutes : 1 });

// set up addListener for notifies read later contents periodically
chrome.alarms.onAlarm.addListener(function(alarm){
    
    // get all bookmark tree
    chrome.bookmarks.getTree(function(bookmark){
        //TODO: enable to select directory name and content item number in setting menu
        var selectedDirectoryName = "read_later"
        var selectedItemNumber = 3
        var root = bookmark[0]['children']
        var bookMarkBar = root[0]['children']

        // get read_later directory from book mark bar
        var readLater = bookMarkBar.filter(function(element, index, array) {
            return isChildrenArray(element) && element.title == selectedDirectoryName
        })

        // get random read later contents from readLater 
        //TODO: error handling(if n <= 2) when implementing setting menu
        var selectedReadLater = getReadLaterContents(readLater[0]['children'], selectedItemNumber)
        console.log(selectedReadLater)
        
        // selectedReadLater.forEach(function(item, index, array) {
        //     var opt = {
        //         type: 'list',
        //         title: item.title,
        //         message: item.url,
        //         priority: 1,
        //         items: [{ title: item.url, message: ''}],
        //         iconUrl:'./my-image.png'
        //     };

        //     // if clicked, open web page with the specified URL
        //     //TODO: fix a bug which shows three pages without clicking notification
        //     chrome.notifications.create('index', opt, function(id) { 
        //         chrome.notifications.onClicked.addListener(notificationClicked(item.url))
        //         console.log("Last error:", chrome.runtime.lastError) 
        //     } )
        // })
        
    })
});

function getReadLaterContents(array, number) {

    if (number == 0) {
        return []
    }
    
    var selectedReadLaterContentsArray = []
    const max = array.length
    
    for (let index = 0; index < number ;index++) {
        var randomInt = getRandomInt(0, max)
        selectedReadLaterContentsArray.push(array[randomInt])
    }
    
    return selectedReadLaterContentsArray
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    
    return Math.floor(Math.random() * (max - min) + min); 
}

function isChildrenArray(elem) {
    return 'children' in elem
}

function notificationClicked(url) {
    window.open(url, '_blank');
}
