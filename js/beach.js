//This file will have a json on top and js fetching the json data. This is another way of load info dynamically into a html

const beachImages = {"beach-items": [/*This is simply an array of images. I want to loop through it 
in order to place the images in place holders*/
      "Kibo-test-images/kibo-gallery-1.1.jpeg",
      "Kibo-test-images/kibo-gallery-2.jpeg",
      "Kibo-test-images/kibo-gallery-3.jpeg",
      "Kibo-test-images/kibo-gallery-4.0.jpeg",
      "Kibo-test-images/kibo-gallery-1.jpeg",
      "Kibo-test-images/kibo-gallery10.jpeg",
      "Kibo-test-images/kibo-gallery-6.jpeg",
      "Kibo-test-images/kibo-gallery-4.0.jpeg",
      "Kibo-test-images/kibo-gallery-1.jpeg",
      "Kibo-test-images/kibo-gallery-7.jpeg",
      "Kibo-test-images/kibo-gallery8.jpeg",
      "Kibo-test-images/kibo-gallery9.jpeg" 
]
};

// const beachImagesFetching =   () => {
//       const container = document.querySelector('.beach-content-container');
//       if (!container) return false; // Return false if container is not found
//     for (let i = 0; i < beachImages["beach-items"].length; i++) {
//         container.classList.add('row');
//         const colInrowDiv = document.createElement('div');
//         colInrowDiv.classList.add('col-sm-12', 'col-md-4', 'mb-1', 'p-1');
//         const img = document.createElement('img');
//         img.classList.add('img-fluid', 'slow-load');
//         img.id = ('events-images');
//         // img.src = beachImages["beach-items"][i];
//         img.src = './Kibo-test-images/16-9-Light-grey-placeholder.png';
//         img.setAttribute('data-src', beachImages["beach-items"][i]);
//         img.alt = "kibo-restaurant-beach-photos";
        

//        // Error handling for broken images
//     img.onerror = function () {
//       console.error('Image failed to load: ' + beachImages["beach-items"][i]);
//       img.src = 'Kibo-test-images/16-9-Light-grey-placeholder.png'; // Fallback image
//     };

//         colInrowDiv.appendChild(img);
//       //   rowDiv.appendChild(colInrowDiv);
//         // Finally, append the colInrowDiv to your  container
//        container.appendChild(colInrowDiv);
//       }  
//       return true; // Indicate that the function has completed successfully     
// };

// document.addEventListener('DOMContentLoaded', () => {
  
//   document.getElementById('loading').style.display ='block';
//   document.getElementById('hide-video').style.display = 'none';
//   document.getElementById('hide-footer').style.display = 'none';// Call the function to execute   
//   const responseOk = beachImagesFetching();
//      if(responseOk){
//       initializeNavbar();
//       slowLoadMedia();
//       document.getElementById('hide-video').style.display = 'block';
//       document.getElementById('hide-footer').style.display = 'block';
//       document.getElementById('loading').style.display ='none';
//      } else{
      
//      }

// // Initialize carousel and navbar scripts only after content is fully loaded
     
//     //  responseOk === beachImagesFetching();
        
        
            
//     // Call slowLoadMedia initially and set an event listener for scroll and resize
//     window.addEventListener('scroll', slowLoadMedia);
//     window.addEventListener('resize', slowLoadMedia);
// });
const beachImagesFetching = () => {
  const container = document.querySelector('.beach-content-container');
  if (!container) return false; // Return false if container is not found
  
  container.classList.add('row');
  const images = beachImages["beach-items"];
  let imagesLoaded = 0;
  let imagesStartedLoading = false; // Track when the first image starts loading

  for (let i = 0; i < images.length; i++) {
    const colInrowDiv = document.createElement('div');
    colInrowDiv.classList.add('col-sm-12', 'col-md-4', 'mb-1', 'p-1');
    
    const img = document.createElement('img');
    img.classList.add('img-fluid', 'slow-load');
    img.src = './Kibo-test-images/16-9-Light-grey-placeholder.png'; // Initial placeholder
    img.setAttribute('data-src', images[i]); // Store actual image src for slow loading
    img.alt = "kibo-restaurant-beach-photos";

    // Load actual image with a fallback in case of error
    const actualImage = new Image();
    actualImage.src = images[i];
    
    actualImage.onload = () => {
      if (!imagesStartedLoading) {
        imagesStartedLoading = true; // Mark that loading has started
        document.getElementById('hide-footer').style.display = 'block'; // Show footer when images start loading
        document.getElementById('hide-video').style.display = 'block'; // Show video while waiting for images
      }
      img.src = images[i]; // Replace placeholder with actual image
      imagesLoaded++;
      
      // Hide the loading GIF once the first image starts loading
      if (imagesLoaded === 1) {
        document.getElementById('loading').style.display = 'none'; // Hide loading gif when first image starts loading
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
  document.getElementById('hide-video').style.display = 'none';
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
    