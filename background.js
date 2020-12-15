// create an alarm
chrome.alarms.create('read later notifier', { delayInMinutes : 1, periodInMinutes : 1 });

// set up addListener for notifies read later contents periodically
chrome.alarms.onAlarm.addListener(function(alarm){
    console.log('test: read-later-notification')
    
    // get all bookmark tree
    chrome.bookmarks.getTree(function(bookmark){
        var root = bookmark[0]['children']
        var bookMarkBar = root[0]['children']
        var readLater = bookMarkBar[11]['children']

        // get random elements from readLater 
        var selectedReadLater = getRandomIntArray(readLater, 3)
        
        selectedReadLater.forEach(function(item, index, array) {
            console.log(index, item)
            console.log(item.id)
            console.log(item.title)
            console.log(item.url)

            var opt = {
                type: 'list',
                title: item.title,
                message: item.url,
                priority: 1,
                items: [{ title: item.url, message: ''}],
                iconUrl:'./my-image.png'
            };

            // if clicked, open web page with the specified URL
            //TODO: fix a bug which shows three pages without clicking notification
            chrome.notifications.create('index', opt, function(id) { 
                chrome.notifications.onClicked.addListener(notificationClicked(item.url))
                console.log("Last error:", chrome.runtime.lastError) 
            } )
        })
        
    })
});

// get 10 elements from argument
function getRandomIntArray(array, number) {
    if (number == 0) {
        return []
    }
    
    var randomIntArray = []
    const max = array.length - 1
    
    for (let index = 0; index < number ;index++) {
        var randomInt = getRandomInt(0, max)
        randomIntArray.push(array[randomInt])
    }
    
    return randomIntArray
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    
    return Math.floor(Math.random() * (max - min) + min); 
}

function notificationClicked(url) {
    window.open(url, '_blank');
}