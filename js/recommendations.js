  // Function to display search results
  function displayResults(results) {
    const container = document.getElementById('recommendations-container');
  
    if (results.length === 0) {
      // Friendly message if no results found
      container.innerHTML = `
        <div class="no-results">
          <p>No results found. Please contact Kibo for more info or 
          <a href="full-menu.pdf" target="_blank">Simply Download our Full Menu Here</a>.</p>
          <p>Who knows, we may just have what you need 😊</p>
        </div>
      `;
    } else {
      const imagePromises = results.map(item => {
        // Create a promise that resolves when each image loads
        return new Promise((resolve) => {
          const itemDiv = document.createElement('div');
          itemDiv.classList.add('item');
  
          const img = new Image();
          img.src = item.imagetile1;
          img.alt = item.texttile;
          img.loading = "lazy";
  
          // Resolve promise when image is fully loaded
          img.onload = () => {
            resolve();
          };
  
          itemDiv.appendChild(img);
  
          itemDiv.innerHTML += `
            <div>
              <h2>${item.texttile}</h2>
              <a href="Kibo Full Menu.html#${item.idtile}" class="category-link" data-category-id="${item.idtile}">
                Go to ${item.texttile}
              </a>
            </div>
          `;
  
          container.appendChild(itemDiv);
        });
      });
  
      // Wait for all images to load, then trigger scrolling
      Promise.all(imagePromises).then(() => {
        scrollToCategory();
      });
    }
  }
  
  // Function to get search results from localStorage
  function getSearchResults() {
    const results = localStorage.getItem('searchResults');
    return results ? JSON.parse(results) : [];
  }
  
  // On page load, display the results and wait for all images to load
  window.onload = () => {
    const searchResults = getSearchResults();
    displayResults(searchResults);
  };
  
  // Function to scroll to the category after images have loaded
  function scrollToCategory() {
    const url = new URL(window.location.href);
    const categoryId = url.hash.substring(1);  // Extract the hash part (without '#')
  
    if (categoryId) {
      const targetElement = document.getElementById(categoryId);
      if (targetElement) {
        // Scroll smoothly to the section once everything has loaded
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
  