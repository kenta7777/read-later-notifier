// send values inputted in setting menu script to the background process script
// may realize with chrome.runtime.sendMessage and chrome.runtime.onMessage.addListener

// local 
// chrome.storage.local.set({'selectedFolder': "folderName"}, function () {
    
// });


// use DOMContentLoaded to wait for loading HTML 
document.addEventListener("DOMContentLoaded", function(){
    var selected_folder = document.getElementById('selected_folder')
    var selected_folder_button = document.getElementById('selected_folder_button');
    
    // make text fields editable if they are tapped

    // make text fields non editable and inputted text is stored in chrome if the set button is tapped 
    selected_folder_button.addEventListener("click", function() {
        console.log("selected_folder has been clicked!");
        selected_folder.contentEditable = false
        // store inputted folder name
    });
});
