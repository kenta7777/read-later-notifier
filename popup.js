// use DOMContentLoaded to wait for loading HTML 
document.addEventListener("DOMContentLoaded", function(){
    var selected_folder_text_field = document.getElementById('selected_folder')
    var selected_folder_set_button = document.getElementById('selected_folder_button')
    
    // make text fields editable if they are tapped
    selected_folder_text_field.addEventListener("click", function() {
        console.log("selected folder text field is clicked!")
        selected_folder_text_field.contentEditable = true
    });

    // make text fields non editable and inputted text is stored 
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
})
