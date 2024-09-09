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
        // Show the loading gif
        document.getElementById('loading').style.display = 'block';
        
        fetch('snippets/Menu-items.json')
            .then(response => {
                if (!response.ok) {
                    if (response.status >= 400 && response.status < 500) {
                        throw new Error(`Client error: ${response.status} ${response.statusText}`);
                    } else if (response.status >= 500) {
                        throw new Error(`Server error: ${response.status} ${response.statusText}`);
                    } else {
                        throw new Error(`Unknown error`);
                    }
                }
                return response.json(); // parse the response as JSON
            })
            .then(data => {
                // Hide the loading gif
                document.getElementById('loading').style.display = 'none';
                
                // Show footer
                document.getElementById('hide-footer').style.display = 'block';
                
                if (!data['menu-items']) {
                    throw new Error('JSON does not contain menu-items property');
                }
                
                // Create the parent row
                const menuRow = document.createElement('div');
                menuRow.classList.add('row');

                // Loop through the menu items (4 categories)
                for (let i = 0; i < data['menu-items'].length; i++) {
                    const item = data['menu-items'][i];

                    // Create a column for each menu category
                    const column = document.createElement('div');
                    column.classList.add('col-sm-12', 'col-md-6' );

                    // Create the first row (two images: imagetile1 and imagetile2)
                    const row1 = document.createElement('div');
                    
                    row1.classList.add('row');

                    // Image col 1.1 (imagetile1)
                    const col1Img1 = document.createElement('div');
                    
                    col1Img1.classList.add('col-sm-6', 'col-md-3','reduce-image');
                     
                    const img1 = document.createElement('img');
                    img1.src = item.imagetile1;
                    col1Img1.appendChild(img1);

                    // Image col 1.2 (imagetile2)
                    const col1Img2 = document.createElement('div');
                    col1Img2.classList.add('col-sm-6', 'col-md-3','reduce-image');
                    
                    
                    const img2 = document.createElement('img');
                    img2.src = item.imagetile2;
                    col1Img2.appendChild(img2);

                    // Append col1.1 and col1.2 to row1
                    row1.appendChild(col1Img1);
                    row1.appendChild(col1Img2);

                    // Create the second row (one image: imagetile3 and one text block)
                    const row2 = document.createElement('div');
                    row2.classList.add('row');

                    // Image col 1.3 (imagetile3)
                    const col2Img = document.createElement('div');
                    col2Img.classList.add('col-sm-6', 'col-md-3','reduce-image');
                 
                    const img3 = document.createElement('img');
                    img3.src = item.imagetile3;
                    col2Img.appendChild(img3);

                    // Text col 1.4 (texttile)
                    const col2Text = document.createElement('div');
                    col2Text.classList.add('col-sm-6', 'col-md-3');
                    const text = document.createElement('p');
                    text.innerText = item.texttile;
                    col2Text.appendChild(text);

                    // Append col1.3 and col1.4 to row2
                    row2.appendChild(col2Img);
                    row2.appendChild(col2Text);

                    // Append rows to the column
                    column.appendChild(row1);
                    column.appendChild(row2);

                    // Add a horizontal break between columns
                    const hr = document.createElement('hr');

                    // Append the column and the horizontal break to the parent row
                    menuRow.appendChild(column);
                    menuRow.appendChild(hr);
                }

                // Finally, append the menuRow to your container
                document.getElementById('menu-container').appendChild(menuRow);
                
                resolve(); // Resolve the promise when content is successfully loaded  
            })
            .catch(error => {
                // Hide the loading gif
                document.getElementById('loading').style.display = 'none';
                
                // Handles any errors that occur during the fetch or subsequent operations
                console.error('There was a problem with the fetch operation:', error);
                displayErrorInfo(error.message); // Display a user-friendly error message
                reject(error); // Reject the promise if there's an error
            });

        // Function to display an error message to the user
        function displayErrorInfo(message) {
            const errorInfoElement = document.getElementById('error-info');
            errorInfoElement.textContent = `An error occurred while loading the content: ${message}`;
            errorInfoElement.style.display = 'block'; // Make the error message visible
        }
    });
}

// LOADING A JSON FILE WITH MENU DATA
// WAIT UNTIL FETCHING OPERATION IS COMPLETE THEN RUN THIS CODE Load the content when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadExternaljsonMenu()
        .then(() => {
            // Show footer
            document.getElementById('hide-footer').style.display = 'block';
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
