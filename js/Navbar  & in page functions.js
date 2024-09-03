
document.addEventListener('DOMContentLoaded', () =>{
  //     const navbarToggler = document.querySelector('custom-toggler');
  //     const navbarCollapse = document.querySelector('navbar-content'); //Tutor-please find navSupported content id in bootstrap css
  // //Collapse the navbar only if focus is moved outside the navbar_Tutor should break this down
  // document.addEventListener('click', (event) => {
  //     const isClickInsideNavbar = navbarCollapse.contains(event.target) || navbarToggler.contains(event.target);
  //     if (!isClickInsideNavbar && navbarCollapse.classList.contains('show')){
  //         navbarCollapse.classList.remove('show');
  //     }
  // });
      // // If you want to Collapse the navbar when the toggler loses focus
  //      navbarToggler.addEventListener('blur', () => {
  
  //       if(navbarCollapse.classList.contains('show')) {
  //          navbarCollapse.classList.remove('show');
  //      }
 
     
});


  //FUNCTION intializeNavBar waits for lec 26.script to Load first( promise-resolve, reject)
function initializeNavbar() {

 //MAKING THE SEARCH BUTTON SEARCH EVERYWHERE- Tutor -I Will do  this later
 const searchBtn = document.getElementById('search-btn');
 const searchInput = document.getElementById('search-input');
 const searchContainer = document.querySelector('.search-container');
 const closeBtn = document.getElementById('close-btn');
 
 searchBtn.addEventListener('click', ()=>{
    searchContainer.classList.add('active');
    searchInput.focus();
 });
 
 closeBtn.addEventListener('click', () =>{
     searchContainer.classList.add('active');
     searchInput.focus();
 });
 
 closeBtn.addEventListener('click', () =>{
     searchContainer.classList.remove('active');
     searchInput.value ='';
 });
 
 document.addEventListener('click', (e)=>{
     if(!searchContainer.contains(e.target) && e.target !== searchBtn) {
         searchContainer.classList.remove('active');
     }
 });
 //FUNCTIONS WAITING FOR DOM CONTENT TO LOAD
 
 //TRANFORMING THE HAMBURGER BUTTON INTO AN X
 const toggler = document.getElementById('custom-toggler');
 const navbarContent = document.getElementById('navbar-content');
 
 toggler.addEventListener('click', () => {
   toggler.classList.toggle('active');
   navbarContent.classList.toggle('show');
 });
 //BACK TO TOP BUTTON
 // Add this to your JavaScript file or inside a <script> tag
 const backToTopButton = document.getElementById('back-to-top');
 
 // Show the button when scrolled down
 window.addEventListener('scroll', function() {
   if (window.scrollY > 300) { // Adjust this value as needed
     backToTopButton.classList.add('show');
   } else {
     backToTopButton.classList.remove('show');
   }
 });
 
 // Scroll to the top when the button is clicked
 backToTopButton.addEventListener('click', function() {
   window.scrollTo({ top: 0, behavior: 'smooth' });
 });
  //pointing to classes in the NavBar
 //NAVBAR REDUCE ON SCROLL DOWN
 const navShrink = document.querySelector('.navbar');
 const shrinkLogo = document.getElementById('custom-logo');
 
 window.addEventListener('scroll', () =>{
   
    if(window.scrollY >200){
      // When scrolled down more than 300px
     navShrink.id = 'navbar-properties';
     shrinkLogo.id = 'shrink-logo';
    }
    else {
     // When scrolled up less than 300px
     navShrink.id = ''; // Resetting ID or remove if no longer needed // or navShrink.removeAttribute('id');
     shrinkLogo.id = 'custom-logo';
   }
   }); 

      //TRIP ADVISOR CAROUSELS--This one is an in page function on the home page

      let nowAdvisor = 0; //Keep track of the first slide
     const advisors = document.querySelectorAll('.carousel-advisor-slide')
     const alladvisors = advisors.length; //store the number of advisors/slides here
     console.log('All Advisor Slides:', advisors);
     console.log(`Counting all advisors in slides: ${alladvisors-1}`); // if alladvisors is 3 (i.e index 0-3) which is 4 slides then -1 will be the last one (index3)

     function showAdvisors (counter) {
      if(counter >= alladvisors){
        nowAdvisor= 0;
      }else if(counter < 0){
        nowAdvisor = alladvisors-1;
      }else{
        nowAdvisor = counter;
      }

     
     console.log('nowAdvisor is: ', nowAdvisor);
     const carouselAdvisorContainer = document.querySelector('.carousel-advisor-container');
    if(carouselAdvisorContainer){//if selected carousel container class exxists it will be assinged to carouselAdvisorContainer
        carouselAdvisorContainer.style.transform = `translateX(-${nowAdvisor * 100}%)`;
        carouselAdvisorContainer.offsetWidth; //Force reflow-Tutor explain this
    }
    function slideBackground (){
       const changebackground = document.querySelector('.switch-background');
       if (!changebackground) return; // Ensure the element exists

    // Clear any existing ID
    // changebackground.id = ''; This allows for reassigning a new id without conflicts.
       if(nowAdvisor === 0){
        changebackground.id ='trip-advisor-1';
       } else if(nowAdvisor === 1){
        changebackground.id ='trip-advisor-2';
       }
      else if(nowAdvisor === 2){
      changebackground.id = 'trip-advisor-3';
      }
      }
      slideBackground ()
  }
   function moveAdvisor(n) {//parameter n represents number of slides back (-1) or foward (1)
    showAdvisors(nowAdvisor + n);//calculates new slide by adding n to current slide
  }//
  //Moving advisor prev and nxt
   function prevNxtAdvisors() {
   const findPrevAdvisor = document.querySelector('.prev-advisor');
   const findNextAdvisor = document.querySelector('.next-advisor');
   
   if(findPrevAdvisor) {//if you find the prev button then do this-event listener on click execute the arrow function
    findPrevAdvisor.addEventListener('click', () => moveAdvisor(-1));
    } 
  if(findNextAdvisor){
    findNextAdvisor.addEventListener('click', () =>moveAdvisor(1));
   }
  
 }
 //changing background
 
   
 prevNxtAdvisors();
 moveAdvisor(nowAdvisor);

 //THIS makes video mute and autoplay in all browsers
 function intializeVideoSettings(){
  //ALSO LOAD CAROUSEL when the  DOMContentLoaded event fires
const videoElement = document.querySelector('.carousel-video');
//const overlay = document.querySelector('.overlay');//tO AVOID FLICKERING I used html and css only.
 //Ensure the video starts playing especially on some browsersthat might prevent autoplay
 videoElement.play().catch(error =>{
  console.log('Autoplay prevented, trying to play video again:', error);
  videoElement.muted = true; //Ensures it's muted
  videoElement.play();
 }); 
}
intializeVideoSettings()

}

  
  
  
  
  