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
    chrome.bookmarks.getTree(function(bookmark){
        console.log(bookmark)
        var root = bookmark[0]['children'];
        console.log(root)
        var bookMarkBar = root[0]['children']
        console.log(bookMarkBar)
        var readLater = bookMarkBar[11]['children']
        console.log(readLater)

    })
    // chrome.notifications.create('notify1', opt, function(id) { console.log("Last error:", chrome.runtime.lastError) } )
    // chrome.notifications.create('notify2', opt, function(id) { console.log("Last error:", chrome.runtime.lastError) } )
    // chrome.notifications.create('notify3', opt, function(id) { console.log("Last error:", chrome.runtime.lastError) } )
    //chrome.notifications.create('notify1', opt, function(id) { } )
});
