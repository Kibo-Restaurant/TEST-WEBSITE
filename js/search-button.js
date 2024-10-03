// SEARCH BUTTON FUNCTIONALITY - THE LONGEST LOGIC!
// MAKING THE SEARCH BUTTON SEARCH EVERYWHERE - Tutor - I Will do this later

const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const searchContainer = document.querySelector('.search-container');
const closeBtn = document.getElementById('close-btn');

// Show search input field when search button is clicked
searchBtn.addEventListener('click', () => {
    searchContainer.classList.add('active');
    searchInput.focus();
});

// Event listener to detect when the user presses "Enter" inside the input field
searchInput.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        await performSearch(); // Perform search on "Enter"
    }
});

// Close search input when close button is clicked
closeBtn.addEventListener('click', () => {
    searchContainer.classList.remove('active');
    searchInput.value = ''; // Clear input field
});

// Hide search input if user clicks outside the search container
document.addEventListener('click', (e) => {
    if (!searchContainer.contains(e.target) && e.target !== searchBtn) {
        searchContainer.classList.remove('active');
    }
});

// Function to fetch menu data from external JSON file
async function fetchMenuData() {
    try {
        const response = await fetch('snippets/Menu-items.json'); // Fetch the JSON file
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const menuData = await response.json(); // Parse JSON data
        return menuData;
    } catch (error) {
        console.error('Error fetching menu data:', error);
        return null; // Return null if there's an error
    }
}

// Function to search through menu data based on the search term
async function searchMenu(searchTerm) {
    const menuData = await fetchMenuData(); // Fetch the menu data

    if (!menuData) {
        console.log('No menu data available');
        return [];
    }

    let results = []; // Array to store matching results
    const items = menuData["menu-items"]; // Access the "menu-items" array from the JSON data

    // Loop through each item and check if it matches the search term
    for (let item of items) {
        if (
            item.texttile.toLowerCase().includes(searchTerm) ||
            item.imagetile1.toLowerCase().includes(searchTerm) ||
            item.imagetile2.toLowerCase().includes(searchTerm) ||
            item.imagetile3.toLowerCase().includes(searchTerm)
        ) {
            results.push(item); // Add the matching item to the results array
        }
    }

    return results; // Return the array of matching results
}

// Function to perform search and redirect to recommendations.html
async function performSearch() {
    let searchTerm = searchInput.value.toLowerCase(); // Get user input

    if (searchTerm.trim() === '') {
        alert("Please enter a search term.");
        return; // Don't perform search if input is empty
    }

    let matchingResults = await searchMenu(searchTerm); // Perform the search

    if (matchingResults.length === 0) {
        console.log('No results found.');
        localStorage.setItem('searchResults', JSON.stringify([])); // Store empty results
    } else {
        console.log('Search Results:', matchingResults); // Log the search results
        localStorage.setItem('searchResults', JSON.stringify(matchingResults)); // Store the results
    }

    // Redirect to recommendations.html to display search results
    window.location.href = 'recommendations.html';
}

// Optional: You can add more functionality for additional buttons, like a "search" button to trigger the search when clicked

  
  //UNDERSTAND THIS FUNCTIONS BEFORE CONTINUING-Tutor You skipped this one
  
  
//   // Event listener for the search button to activate search container
//   const searchBtn = document.getElementById('search-btn');
//   const searchInput = document.getElementById('search-input');
//   const searchContainer = document.querySelector('.search-container');
//   const closeBtn = document.getElementById('close-btn');
  
//   searchBtn.addEventListener('click', () => {
//     searchContainer.classList.add('active');
//     searchInput.focus();
//   });
  
//   closeBtn.addEventListener('click', () => {
//     searchContainer.classList.remove('active');
//     searchInput.value = '';
//   });
  
//   // Hide the search container when clicking outside of it
//   document.addEventListener('click', (e) => {
//     if (!searchContainer.contains(e.target) && e.target !== searchBtn) {
//       searchContainer.classList.remove('active');
//     }
//   });
  
//   // Optional: Log the input value when the user types
//   searchInput.addEventListener('input', () => {
//     console.log('User is typing: ', searchInput.value);
//   });