//This file will have a json on top and js fetching the json data. This is another way of load info dynamically into a html

const beachImages = {"beach-items": [/*This is simply an array of images. I want to loop through it 
in order to place the images in place holders*/
      "Kibo-test-images/kibo-gallery-1.1.jpeg",
      "Kibo-test-images/kibo-gallery-2.jpeg",
      "Kibo-test-images/kibo-gallery-3.jpeg",
      "Kibo-test-images/kibo-gallery-4.0.jpeg",
      "Kibo-test-images/beach-tables2-kibo-restaurant-watmu.jpeg",
      "Kibo-test-images/kibo-gallery10.jpeg",
      "Kibo-test-images/kibo-gallery-6.jpeg",
      "Kibo-test-images/kibo-gallery-4.0.jpeg",
      "Kibo-test-images/kibo-gallery-1.jpeg",
      "Kibo-test-images/beach-tables-kibo-restaurant-watamu.jpeg",
      "Kibo-test-images/kibo-gallery8.jpeg",
      "Kibo-test-images/beach-tables4-kibo-restaurant-watamu.jpeg",
      "Kibo-test-images/beach-tables5-restaurant-watamu.jpeg",
      "Kibo-test-images/beach-tables6-restaurant-watamu.jpeg",
      "Kibo-test-images/beach-tables3-kibo-restaurant-watamu.jpeg" 
]
};
const beachImagesFetching = () => {
  const container = document.querySelector('.beach-content-container');
  if (!container) return false; 
  // Return false if container is not found
  
  container.classList.add('row');
  const images = beachImages["beach-items"];
  let imagesLoaded = 0;
  let imagesStartedLoading = false; // Track when the first image starts loading
  const allImages = images.length;
  for (let i = 0; i < images.length; i++) {
    const colInrowDiv = document.createElement('div');
    colInrowDiv.classList.add('col-sm-12', 'col-md-4', 'p-2', 'justify-content-center', 'align-items-center');
    
    const img = document.createElement('img');
    img.classList.add('img-fluid', 'slow-load','m-2');
    img.src = './Kibo-test-images/16-9-Light-grey-placeholder.png'; // Initial placeholder
    img.setAttribute('data-src', images[i]); // Store actual image src for slow loading
    img.alt = "kibo-restaurant-beach-photos";

    // Load actual image with a fallback in case of error
    const actualImage = new Image();
    actualImage.src = images[i];
    
    actualImage.onload = () => {
      if (!imagesStartedLoading) {
        imagesStartedLoading = true; // Mark that loading has started
        
      }
      img.src = images[i]; // Replace placeholder with actual image
      imagesLoaded++;
      
      // Hide the loading GIF once the first image starts loading
      if (imagesLoaded === 1) {
        document.getElementById('loading').style.display = 'none'; // Hide loading gif when first image starts loading
      }
      if(imagesLoaded === allImages ){
        document.getElementById('events-videos').style.display ='block';
        document.getElementById('hide-footer').style.display = 'block';
      }
     
    };

    // Error handling for broken images
    actualImage.onerror = () => {
      console.error('Image failed to load: ' + images[i]);
      img.src = 'Kibo-test-images/16-9-Light-grey-placeholder.png'; // Fallback image
    };

    colInrowDiv.appendChild(img);
    container.appendChild(colInrowDiv);
  }

  return true; // Indicate that the function has completed successfully
};

document.addEventListener('DOMContentLoaded', () => {
  // Initially show the loading gif and hide video and footer
  document.getElementById('loading').style.display = 'block';
  document.getElementById('events-videos').style.display = 'none';
  document.getElementById('hide-footer').style.display = 'none';
  
  // Fetch images and handle visibility logic
  const responseOk = beachImagesFetching();

  // Initialize navbar and slow loading if image fetching is successful
  if (responseOk) {
    initializeNavbar();
    slowLoadMedia();
  }

  // Set event listeners for scroll and resize to handle slow loading of media
  window.addEventListener('scroll', slowLoadMedia);
  window.addEventListener('resize', slowLoadMedia);
});
    
