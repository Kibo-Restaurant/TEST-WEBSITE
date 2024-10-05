
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
                menuRow.classList.add('menu-box', 'row');

                // Loop through the menu items (4 categories)
                for (let i = 0; i < data['menu-items'].length; i++) {
                    const item = data['menu-items'][i]; // Accessing the json through bracket notation.

                    // Create a column for each menu category
                    const column = document.createElement('div');
                    column.id = item.idtile;
                    column.classList.add('col-sm-12', 'col-lg-6', 'menu-contents');

                    // Create the first row (1 textblock and one image: Texttile1 and imagetile1)
                    const row1 = document.createElement('div');
                    row1.classList.add('row');

                    // Text block (texttile)
                    const col1Text = document.createElement('div');
                    col1Text.classList.add('reduce-image');
                    const text = document.createElement('p');
                    text.innerText = item.texttile;
                    col1Text.appendChild(text);

                    // Image block (imagetile1)
                    const col1Img1 = document.createElement('div');
                    col1Img1.classList.add('reduce-image','slow-load','lazy-load');
                    const img1 = document.createElement('img');
                    // img1.src = item.imagetile1;
                    
                    img1.classList.add('slow-load','img-fluid');
                    img1.id = item.idtile;
                    img1.src = 'Kibo-test-images/sixteen-nine-Light-grey-placeholder.png';
                    img1.setAttribute('data-src',item.imagetile1);
                    img1.alt = item.alttext;
                    col1Img1.appendChild(img1);
                    
                    // Append col1Text and col1Img1 to row1
                    row1.appendChild(col1Text);
                    row1.appendChild(col1Img1);

                    // Create the second row (two images: imagetile2 and imagetile3)
                    const row2 = document.createElement('div');
                    row2.classList.add('row');

                    // Image block (imagetile2)
                    const col1Img2 = document.createElement('div');
                    col1Img2.classList.add('reduce-image');
                    const img2 = document.createElement('img');
                    // img2.src = item.imagetile2; //quest to placeholder
                    img2.classList.add('slow-load','img-fluid','lazy-load');
                    img2.src = 'Kibo-test-images/sixteen-nine-Light-grey-placeholder.png';
                    img2.setAttribute('data-src',item.imagetile2);
                    img2.alt = item.alttext;
                    col1Img2.appendChild(img2);

                    // Image block (imagetile3)
                    const col1Img3 = document.createElement('div');
                    col1Img3.classList.add('reduce-image');
                    const img3 = document.createElement('img');
                    // img3.src = item.imagetile3;
    
                    img3.classList.add('slow-load','img-fluid','lazy-load');
                    img3.src = 'Kibo-test-images/sixteen-nine-Light-grey-placeholder.png';
                    img3.setAttribute('data-src',item.imagetile3);
                    img3.alt = item.alttext;
                    col1Img3.appendChild(img3);

                    // Append col1Img2 and col1Img3 to row2
                    row2.appendChild(col1Img2);
                    row2.appendChild(col1Img3);
                    
                    // Append row1 and row2 to the column
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
