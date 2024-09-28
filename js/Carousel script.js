function initializeCarousel() {
    // DYNAMICALLY SETTING THE CAROUSEL SLIDE SHOW
    let presentSlide = 0; // Keeps track of the current slide index
    const slides = document.querySelectorAll('.carousel-slide'); // Selection of all slides
    const allSlides = slides.length; // Number of slides

    console.log(`Counting slides to confirm: ${allSlides - 1}`);

    // Show the placeholder initially
    const placeholder = document.getElementById('carousel-placeholder');
    placeholder.style.display = 'block';

    function showSlide(index) {
        if (index >= allSlides) {
            presentSlide = 0; // Wrap around to the first slide
        } else if (index < 0) {
            presentSlide = allSlides - 1; // Wrap around to the last slide
        } else {
            presentSlide = index; // Show the requested slide
        }
        
        console.log('presentSlide: ', presentSlide);
        
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.style.transform = `translateX(-${presentSlide * 100}%)`;
            carouselContainer.offsetWidth; // Force reflow
        }
    }

    function moveSlide(n) {
        showSlide(presentSlide + n); // Move to the next or previous slide
    }

    function autoSlideOnce() {
        if (presentSlide < allSlides - 1) {
            moveSlide(1);
            setTimeout(autoSlideOnce, 3000); // Change slide every 3 seconds
        } else {
            showSlide(0); // Reset to the first slide after loop completion
            activateButtons(); // Enable buttons for manual navigation
            hidePlaceholder(); // Hide placeholder after auto sliding
        }
    }

    function hidePlaceholder() {
        placeholder.style.display = 'none'; // Hide the placeholder once slides are loaded
    }

    function checkImagesLoaded() {
        let imagesLoaded = 0;
        
        slides.forEach(slide => {
            const img = slide.querySelector('img');
            if (img.complete) {
                imagesLoaded++;
            } else {
                img.onload = () => {
                    imagesLoaded++;
                    if (imagesLoaded === allSlides) {
                        hidePlaceholder(); // Hide placeholder after all images are loaded
                    }
                };
                img.onerror = () => {
                    console.error(`Image failed to load: ${img.src}`);
                    imagesLoaded++;
                    if (imagesLoaded === allSlides) {
                        hidePlaceholder(); // Hide placeholder even if some images fail
                    }
                };
            }
        });

        // If all images are already loaded (e.g., cached), hide placeholder immediately
        if (imagesLoaded === allSlides) {
            hidePlaceholder();
        }
    }

    function activateButtons() {
        const prevButton = document.querySelector('.prev');
        const nextButton = document.querySelector('.next');
        
        if (prevButton) {
            prevButton.addEventListener('click', () => moveSlide(-1));
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => moveSlide(1));
        }
    }

    // Initialize the carousel
    showSlide(presentSlide); // Show the first slide
    checkImagesLoaded(); // Check if images are loaded
    autoSlideOnce(); // Start auto sliding
}

// Call the function only after the content is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadExternalContent('snippets/Home-snippet.html', 'content-home')
        .then(() => {
            // Show footer
            document.getElementById('hide-footer').style.display = 'block';
            // Initialize carousel and navbar scripts only after content is fully loaded
            initializeCarousel();
            initializeNavbar();
        })
        .catch(error => {
            console.error('Error loading content:', error);
        });
});




// //THIS IS SPECIFICALLY FOR THE HOME PAGE CAROUSEL
// function initializeCarousel(){
// //DYNAMICALLY SETTING THE CAROUSEL SLIDE SHOW
// let presentSlide = 0; //keeps track of the current slide index (first slide which is 0)
// const slides = document.querySelectorAll('.carousel-slide'); //selection of all slides under the class carousel slide (the list of slides is store in the const all slides)
// const allSlides = slides.length; // const allslides store the number of slide-here 6 slides
// console.log(`Counting slides to confirm: ${allSlides-1}`);
// function showSlide(index) {// index is the parameterhere
//     if(index >= allSlides) {//if index is over the last slide
//         presentSlide = 0; //Wrap around to/ go back to the first slide
//     } else if (index < 0){//if index is before the first slide
//         presentSlide = allSlides - 1;//wrap around to/ go back to the last slide (allSlides-1 is 6 slides-1= 5 index (we have 0-5 indexes which is 6 slides))
//     } else {
//         presentSlide = index; /*otherwise, show the requested slide-
//          This will be done once showslide(presentSlide) is
//           executed the parameter here is changed from index to present slide 
//           which  was declared at first here :let presentSlide = 0
//          */
//     }
//     console.log('presentSlide: ', presentSlide);// this gives you an array 0 to 5 indexes which is 6 slides
    
//     const carouselContainer = document.querySelector('.carousel-container');
//     if(carouselContainer){//if selected carousel container class exxists it will be assinged to carouselContainer
//         carouselContainer.style.transform = `translateX(-${presentSlide * 100}%)`;
//         carouselContainer.offsetWidth; //Force reflow
//     }
// }
// function moveSlide(n) {//parameter n represents number of slides back (-1) or foward (1)
//     showSlide(presentSlide + n);//calculates new slide by adding n to current slide
// }//showlide function is called inside the function moveSlide and given a new parameter

// function autoSlideOnce() {
//     if (presentSlide < allSlides - 1) {
//         moveSlide(1);
//         setTimeout(autoSlideOnce, 3000);
//     } else {
//         showSlide(0);//Reset first slide after loop completion
//         activateButtons();//Enable buttons for manual navigation after automation
//     }
// }
// function activateButtons() {
//     const prevButton = document.querySelector('.prev');
//     const nextButton = document.querySelector('.next');
//     if(prevButton) {//if you find the prev button then do this-event listener on click execute the arrow function
//         prevButton.addEventListener('click', () => moveSlide(-1));      
//     }
//     if(nextButton){
//         nextButton.addEventListener('click', () => moveSlide(1));
//     }
// }
// //initialize the carousel
//  showSlide(presentSlide); // this displays the first slide index 0
//  autoSlideOnce();
// }


// function autoSlide () {
//     moveSlide(1);// this makes the show slide function to moveSlide the carousel to the next slide
//     setTimeout(autoSlide, 5000);//setTimeout is a built-in javascript function used to execute code ( through autoslide function) after a specific delay which is 5000 miliseconds- AUtoslide class itself after every 5 secs
// }
//Initialize the carousel
    //showSlide(currentIndex);//calling showslide here sets up the initial state currentSlide which equals 0 of first slide
    // setTimeout( autoSlide, 5000);



   
   