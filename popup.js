// use DOMContentLoaded to wait for loading HTML 
document.addEventListener("DOMContentLoaded", function(){
    var selected_folder_text_field = document.getElementById('selected_folder')
    var selected_folder_set_button = document.getElementById('selected_folder_button')
    
    // set values to text fields from storage
    chrome.storage.local.get(['selectedFolder'], function(result) {
        console.log('load selected folder name: ' + result.selectedFolder);
        selected_folder_text_field.textContent = result.selectedFolder
        console.log('loaded value: ' + selected_folder_text_field.textContent)
    });

    chrome.storage.local.get(['notificationInterval'], function(result) {
        console.log('load notification interval: ' + result.notificationInterval);
        notification_interval.textContent = result.notificationInterval
        console.log('loaded value: ' + notification_interval.textContent)
    });

    chrome.storage.local.get(['numberOfNotifications'], function(result) {
        console.log('load number of notifications: ' + result.numberOfNotifications);
        number_of_notifications.textContent = result.numberOfNotifications
        console.log('loaded value: ' + number_of_notifications.textContent)
    });
    
    // make text field for folder name editable if they are tapped
    selected_folder_text_field.addEventListener("click", function() {
        console.log("selected folder text field is clicked!")
        selected_folder_text_field.contentEditable = true
    });

    // make text field for folder name non-editable and inputted text is stored 
    // in chrome if the set button is tapped 
    selected_folder_set_button.addEventListener("click", function() {
        console.log("selected folder set button is clicked!")
        
        var selectedFolderName = selected_folder_text_field.textContent
        selected_folder_text_field.contentEditable = false
        
        // store inputted folder name
        chrome.storage.local.set({selectedFolder: selectedFolderName}, function() {
            console.log('Selected folder has been specified: ' + selectedFolderName);
        })
    })

    // make text field for notification interval editable if they are tapped
    notification_interval.addEventListener("click", function() {
        console.log("notification interval text field is clicked!")
        notification_interval.contentEditable = true
    });

    // make text field for notification interval non editable and inputted text is stored 
    // in chrome if the set button is tapped 
    notification_interval_button.addEventListener("click", function() {
        console.log("notification interval set button is clicked!")

        const selectedNotificationInterval = notification_interval.textContent
        notification_interval.contentEditable = false

        // store inputted notification interval
        chrome.storage.local.set({notificationInterval: selectedNotificationInterval}, function() {
            console.log('Notification interval has been specified: ' + selectedNotificationInterval);
        })
    });

    number_of_notifications.addEventListener("click", function() {
        console.log("number of notification text field is clicked!")
        number_of_notifications.contentEditable = true
    });

    number_of_notifications_button.addEventListener("click", function() {
        console.log("number of notification set button is clicked!")

        const selectedNumberOfNotifications = number_of_notifications.textContent
        number_of_notifications.contentEditable = false

        // store inputted notification interval
        chrome.storage.local.set({numberOfNotifications: selectedNumberOfNotifications}, function() {
            console.log('Number of Notifications has been specified: ' + selectedNumberOfNotifications);
        })
    });

    
})
