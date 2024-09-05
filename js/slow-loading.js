

    // Function to check if an element is in the viewport--LOAD TOP CONTENTS FIRST
    

    // Define slowLoadMedia first
const slowLoadMedia = () => {
    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };
    const slowMediaElements = document.querySelectorAll('.slow-load','.lazy-load');
    for (let i = 0; i < slowMediaElements.length; i++) {
        const media = slowMediaElements[i];
        const src = media.getAttribute('data-src');

        if (src && isElementInViewport(media)) {
            if (media.tagName === 'IMG') {
                const tempImage = new Image();
                tempImage.src = src;

                tempImage.onload = () => {
                    media.src = src; 
                    media.classList.add('finished-loading');
                };
                tempImage.onerror = () => {
                    console.error(`Failed to load image: ${src}`);
                };
            } else if (media.tagName === 'VIDEO') {
                media.classList.add('video-placeholder');

                const tempVideo = document.createElement('video');
                tempVideo.src = src;
                tempVideo.preload = 'auto';
                tempVideo.onloadeddata = () => {
                    console.log(`Video loaded successfully: ${src}`);
                    media.src = src; 
                    media.classList.remove('video-placeholder');
                    media.classList.add('finished-loading');
                };
                tempVideo.onerror = () => {
                    console.error(`Failed to load video: ${src}`);
                };
            }
        } else {
            console.warn(`No data-src found for element ${i}:`, media);
        }
    }
};



    


// This function should be called after fetching external content
// const initializeAfterContentLoad = () => {
    // Fetch your external content (e.g., JSON, HTML snippets)
    // Then call slowLoadMedia() after the content is inserted into the DOM
//     slowLoadMedia();
// };

// Example of calling after fetch completion
// fetchExternalContent().then(initializeAfterContentLoad);





// document.addEventListener ('DOMContentLoaded', () => {
    
//     //Slow load images and videos
//     const slowLoadMedia = () => {
//         const slowMediaElements = document.querySelectorAll('.slow-load');
//         for (let i = 0; i < slowMediaElements.length; i++) {
//             const media = slowMediaElements[i];
//             const src = media.getAttribute('data-src');

//             if(src) {
//                 if (media.tagName === 'IMG') {
//                     //Handle image elements
//                     const tempImage = new Image();
//                     tempImage.src = src;
                    

//                     tempImage.onload = () =>{
//                         media.src = src; //Replace the placeholder with the actual image source
//                         media.classList.add('finished-loading'); //Optionally add 
//                     };
//                     tempImage.onerror = () => {
//                         console.error(`'Failed to load image:', ${src}`);
//                     };
//                 } else if( media.tagName === 'VIDEO'){
//                     //Handle video elements
//                     media.classList.add('video-placeholder'); //Add placeholder styling

//                     const tempVideo = document.createElement ('video');
//                     tempVideo.src = src;
//                     tempVideo.preload = 'auto';
//                     tempVideo.onloadeddata = () => {
//                         console.log(`Video loaded successfully: ${src}`);
//                         media.src = src; //Replace the placeholder with the actual video source
//                         media.classList.remove('video-placeholder');//Remove placeholder background
//                         media.classList.add('finished-loading'); //Optionally add a class for styling loading media
//                     };
//                     tempVideo.onerror = () => {
//                         console.error(`Failed to load video:', ${src}`);
//                     };
//                 } 
//             } else{
//                 console.warn(`No data-src found for element ${i}:`, media);
//               }  
//         }
//     };
//     //Call lazyLoadMedia initially and set an event listener for scroll and resize
//     slowLoadMedia();
//     window.addEventListener('scroll', slowLoadMedia);
//     window.addEventListener('resize', slowLoadMedia);
// });
