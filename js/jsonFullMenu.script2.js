//NAVBAR COLLAPSING
// document.addEventListener('DOMContentLoaded', () =>{
//     const navbarToggler = document.querySelector('.navbar-toggler');
//     const navbarCollapse = document.querySelector('#navbarSupportedContent'); //Tutor-please find navSupported content id in bootstrap css
// //Collapse the navbar only if focus is moved outside the navbar_Tutor should break this down
// document.addEventListener('click', (event) => {
//     const isClickInsideNavbar = navbarCollapse.contains(event.target) || navbarToggler.contains(event.target);
//     if (!isClickInsideNavbar && navbarCollapse.classList.contains('show')){
//         navbarCollapse.classList.remove('show');
//     }
// });
//     // // If you want to Collapse the navbar when the toggler loses focus
// //      navbarToggler.addEventListener('blur', () => {

// //       if(navbarCollapse.classList.contains('show')) {
// //          navbarCollapse.classList.remove('show');
// //      }

//    });


function loadExternaljsonMenu() {
    return new Promise((resolve, reject) => {
    //Show the loading gif
    document.getElementById('loading').style.display ='block';
    fetch('snippets/Menu-items.json')
    //.then(response => response.json ())
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
        return response.json();// parse the response as a json
    }) 

    .then(data => {
         //Hide the loading gif
         document.getElementById('loading').style.display = 'none';
         //Show footer
         document.getElementById('hide-footer').style.display ='block';
        console.log(data);
        if (!data["menu-items"]) {
            throw new Error('JSON does not contain menu-items property');
        }
        //pointing to the section  and asigning value to class row
        const row = document.getElementById('menu-content-container');
        for(let i= 0; i < data["menu-items"].length; i++){
            const menu = data["menu-items"][i];
            
            //create the most most outer div with the class menu-item tile
            const mostMostOuterDiv = document.createElement('div');
            mostMostOuterDiv.classList.add('menu-item-tile', 'col-md-6');
            //create the most outer div with the class row
            const mostOuterDiv = document.createElement('div');
            mostOuterDiv.classList.add('row');
            
            //create the outer 1 div with the class col-sm-5
            const outerDiv1 = document.createElement('div');
            outerDiv1.classList.add('col-sm-5');

            //create the inner div with the class menu-item-photo
            const innerDiv = document.createElement('div');
            innerDiv.classList.add('menu-item-photo');

            //create contents of the inner div
            const pNumber = document.createElement('p');
            pNumber.classList.add('tile-number')
            pNumber.textContent = menu.tileNumber;
    
            
            const img = document.createElement('img');
            img.classList.add('img-fluid', 'slow-load');
            img.width = 250;
            img.height = 150;
            // img.src = menu.tileImage; -before set Attribute-data-src
            img.setAttribute('data-src', menu.tileImage); //Set the actual image source in data src
            img.src = '../Kibo-test-images/16-9-Light-grey-placeholder.png';
            img.alt = menu.tileTitle;
            console.log(menu.tileTitle);
            //Append elements to the innerDiv
            innerDiv.appendChild(pNumber);
            innerDiv.appendChild(img);
            
            //Append innerDiv to the outerDiv1
            outerDiv1.appendChild(innerDiv);

            //APpend OuterDiv1 to the mostOuterdiv
            mostOuterDiv.appendChild(outerDiv1);

            //Create outerDiv 2
            const outerDiv2 = document.createElement('div');
            outerDiv2.classList.add('menu-item-description', 'col-sm-7');
           
            //Create contents of outerDiv2
            const h3 = document.createElement('h3');
            h3.classList.add('menu-item-title');
            h3.textContent = menu.tileTitle;
            console.log(menu.tileTitle);

            const pDescription = document.createElement('p');
            pDescription.classList.add('menu-item-details');
            pDescription.innerHTML = menu.tileDescription;
            console.log(pDescription)
            //APpend contents to outerDiv2
            outerDiv2.appendChild(h3);
            outerDiv2.appendChild(pDescription);

            //Append outerDiv2 to the most outerdiv
            mostOuterDiv.appendChild(outerDiv2);

            //Append the mostOuterDiv to the most most outer Div
             mostMostOuterDiv.appendChild(mostOuterDiv);
             
             //Append <hr>before closing the most most outer div
             if(menu.horizontalBreak) {
                const hr = document.createElement('hr');
                hr.classList.add('d-block', 'd-sm-none');
                mostMostOuterDiv.appendChild(hr);
              }
             //Append the most most Outer div to the row
             row.appendChild(mostMostOuterDiv);
              
        }
        resolve(); // Resolve after the loop has completed resolve(); // Resolve the promise when content is successfully loaded  
    })
    //.catch(error => console.error( 'Error loading the JSON file:', error)); --a simple way of dispaly an error message on the console
    .catch(error => {
         //Hide the loading gif
         document.getElementById('loading').style.display = 'none'
         
        //Handles any errors that occur during the fetch or subsequent operations
        console.error('There was a problem with the fetch operation:', error);
        displayErrorInfo(error.message); //Display a user-friendly error message
        reject(error); // Reject the promise if there's an error
    })
    //Function to display an error message to the user
        function displayErrorInfo(message) {
       const errorInfoELement = document.getElementById('error-info');
       errorInfoELement.textContent =`An error occured while loading the content: ${message}`;
       errorInfoELement.style.display ='block'; //Make the error message visible
}  
    });
}

// LOADING A JSON FILE WITH MENU DATA
//WAIT UNTIL FETCHING OPERATION IS COMPLETE THEN RUN THIS CODE Load the content when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () =>{
    loadExternaljsonMenu()
    .then(() => {
         //Show footer
         document.getElementById('hide-footer').style.display ='block';
        // Initialize carousel and navbar scripts only after content is fully loaded
        initializeNavbar();
        slowLoadMedia();
    })
    .catch(error => {
        console.error('Error loading content:', error);
    }); 
    // Call slowLoadMedia initially and set an event listener for scroll and resize
    window.addEventListener('scroll', slowLoadMedia);
    window.addEventListener('resize', slowLoadMedia);
});