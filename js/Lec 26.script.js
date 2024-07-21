document.addEventListener('DOMContentLoaded', function(){
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarSupportedContent');
//Collapse the navbar when the toggler loses focus
     navbarToggler.addEventListener('blur',function() {
      if(navbarCollapse.classList.contains('show')) {
         navbarCollapse.classList.remove('show');
     }

   });
});