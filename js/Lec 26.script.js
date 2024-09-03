
//Function to load external HTML content
function loadExternalContent(url, targetElement) {
    return new Promise((resolve, reject) => {
      //Show the loading gif
    document.getElementById('loading').style.display ='block';
    
    fetch(url)//Starts a network request to 'url'
    .then(response => {
        if(!response.ok) {//Handles the response
            if(response.status >= 400 && response.status < 500){
                throw new Error(`Client error: ${response.status} ${response.statusText}`);
            } else if (response.status >= 500){
                throw new Error (`Server error: ${response.status} ${response.statusText}`);
            } else{
                throw new Error (`Unknown error`);
            } 
        }
        return response.text();// parse the response as text
    }) 
    .then(data => {
        //Hide the loading gif
        document.getElementById('loading').style.display = 'none';
       
        //insert fetched content into the target element
        document.getElementById(targetElement).innerHTML = data;
        resolve(); // Resolve the promise when content is successfully loaded
    })
    .catch(error => {
        //Hide the loading gif
        document.getElementById('loading').style.display = 'none'
       
        //Handles any errors that occur during the fetch or subsequent operations
        console.error('There was a problem with the fetch operation:', error);
        displayErrorMessage(error.message); //Display a user-friendly error message
        reject(error); // Reject the promise if there's an error
    });
});

}
//Function to display an error message to the user
function displayErrorMessage(message) {
    const errorMessageELement = document.getElementById('error-message');
    errorMessageELement.textContent =`An error occured while loading the content: ${message}`;
    errorMessageELement.style.display ='block'; //Make the error message visible
}

//Load the content when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadExternalContent('../snippets/Home-snippet.html', 'content-home')
    .then(() => {
         //Show footer
         document.getElementById('hide-footer').style.display ='block';
        // Initialize carousel and navbar scripts only after content is fully loaded
        initializeCarousel();
        initializeNavbar();
    })
    .catch(error => {
        console.error('Error loading content:', error);
    });
});

// // Function to initialize the carousel
// function initializeCarousel() {
//     // Your carousel script here
// }

// // Function to initialize the navbar
// function initializeNavbar() {
//     // Your navbar script here
// }

 






