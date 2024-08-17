//NAVBAR COLLAPSING
document.addEventListener('DOMContentLoaded', () =>{
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarSupportedContent'); //Tutor-please find navSupported content id in bootstrap css
//Collapse the navbar only if focus is moved outside the navbar_Tutor should break this down
document.addEventListener('click', (event) => {
    const isClickInsideNavbar = navbarCollapse.contains(event.target) || navbarToggler.contains(event.target);
    if (!isClickInsideNavbar && navbarCollapse.classList.contains('show')){
        navbarCollapse.classList.remove('show');
    }
});
    // // If you want to Collapse the navbar when the toggler loses focus
//      navbarToggler.addEventListener('blur', () => {

//       if(navbarCollapse.classList.contains('show')) {
//          navbarCollapse.classList.remove('show');
//      }

   });