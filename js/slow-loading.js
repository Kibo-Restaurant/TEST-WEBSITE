

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
    const slowMediaElements = document.querySelectorAll('.slow-load');
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



    


