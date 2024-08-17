
document.addEventListener ('DOMContentLoaded', () => {
    //Slow load images and videos
    const slowLoadMedia = () => {
        const slowMediaElements = document.querySelectorAll('.slow-load');
        for (let i = 0; i < slowMediaElements.length; i++) {
            const media = slowMediaElements[i];
            const src = media.getAttribute('data-src');

            if(src) {
                if (media.tagName === 'IMG') {
                    //Handle image elements
                    const tempImage = new Image();
                    tempImage.src = src;
                    

                    tempImage.onload = () =>{
                        media.src = src; //Replace the placeholder with the actual image source
                        media.classList.add('finished-loading'); //Optionally add 
                    };
                    tempImage.onerror = () => {
                        console.error(`'Failed to load image:', ${src}`);
                    };
                } else if( media.tagName === 'VIDEO'){
                    //Handle video elements
                    media.classList.add('video-placeholder'); //Add placeholder styling

                    const tempVideo = document.createElement ('video');
                    tempVideo.src = src;
                    tempVideo.preload = 'auto';
                    tempVideo.onloadeddata = () => {
                        console.log(`Video loaded successfully: ${src}`);
                        media.src = src; //Replace the placeholder with the actual video source
                        media.classList.remove('video-placeholder');//Remove placeholder background
                        media.classList.add('finished-loading'); //Optionally add a class for styling loading media
                    };
                    tempVideo.onerror = () => {
                        console.error(`Failed to load video:', ${src}`);
                    };
                } 
            } else{
                console.warn(`No data-src found for element ${i}:`, media);
              }  
        }
    };
    //Call lazyLoadMedia initially and set an event listener for scroll and resize
    slowLoadMedia();
    window.addEventListener('scroll', slowLoadMedia);
    window.addEventListener('resize', slowLoadMedia);
});
