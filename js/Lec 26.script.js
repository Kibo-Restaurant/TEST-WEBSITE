document.addEventListener('DOMContentLoaded', () =>{
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarSupportedContent'); //Tutor-please find navSupported content id in bootstrap css
//Collapse the navbar only if focus is moved outside the navbar_Tutor should break this down
document.addEventListener('click', (event) => {
    const isClickInsideNavbar = navbarCollapse.contains(event.target) || navbarToggler.contains(event.target);
    if (!isClickInsideNavbar && navbarCollapse.classList.contains('show')){
        navbarCollapse.classList.remove('show');
    }
});
    // // If you want to Collapse the navbar when the toggler loses focus
//      navbarToggler.addEventListener('blur', () => {

//       if(navbarCollapse.classList.contains('show')) {
//          navbarCollapse.classList.remove('show');
//      }

   });
//Function to load external HTML content
function loadExternalContent(url, targetElement) {
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
    })
    .catch(error => {
        //Hide the loading gif
        document.getElementById('loading').style.display = 'none'
        //Handles any errors that occur during the fetch or subsequent operations
        console.error('There was a problem with the fetch operation:', error);
        displayErrorMessage(error.message); //Display a user-friendly error message
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
    loadExternalContent('../snippets/Home-snippet.html', 'content');
});


 






