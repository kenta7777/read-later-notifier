// create an alarm
chrome.alarms.create('read later notifier', { delayInMinutes : 1, periodInMinutes : 1 });
var opt = {
    type: 'list',
    title: 'notification',
    message: 'Primary message to display',
    priority: 1,
    items: [{ title: 'hoge', message: 'fuga'}],
    iconUrl:'./my-image.png'
};

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
        })
        
        //TODO: get the title and URL from them and set as notification

        //TODO: send notificaion
    })
    // chrome.notifications.create('notify1', opt, function(id) { console.log("Last error:", chrome.runtime.lastError) } )
    // chrome.notifications.create('notify2', opt, function(id) { console.log("Last error:", chrome.runtime.lastError) } )
    // chrome.notifications.create('notify3', opt, function(id) { console.log("Last error:", chrome.runtime.lastError) } )
    //chrome.notifications.create('notify1', opt, function(id) { } )
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