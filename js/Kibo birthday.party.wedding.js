//NAVBAR COLLAPSING
function loadExternaljsonBirthday() {
  return new Promise((resolve, reject) => {
     //Show the loading gif
     document.getElementById('loading').style.display ='block';
     fetch('snippets/birthday.wedding.party.json')
     //.then(response => response.json ())
     .then(response => {
         if(!response.ok) {//Handles the response
             if(response.status >= 400 && response.status < 500){
                 throw new Error(`Client error: ${response.status} ${response.statusText}`);
             } else if (response.status >= 500){
                 throw new Error (`Server error: ${response.status} ${response.statusText}`);
             } else{
                 throw new Error (`Unknown error`);
             } 
         }
         return response.json();// parse the response as a json
     }) 
 
     .then(data => {
         console.log(data);
         if (!data["events-items"]) {
             throw new Error('JSON does not contain events-items property');
         }
          //Hide the loading gif
          document.getElementById('loading').style.display = 'none';
          //Show footer
          document.getElementById('hide-footer').style.display ='block';
          const container = document.getElementById('events-content-container');
          //Loop through the JSON data
          for (let i = 0; i < data['events-items'].length; i++) {
            const eventItem = data['events-items'][i];
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('row', 'mt-3');
          
            switch (eventItem.rowId) {
              case 'row1':
                for (let j = 0; j < eventItem.columns.length; j++) {
                  const column = eventItem.columns[j];
                  const colDiv = document.createElement('div');
                  colDiv.classList.add('col-12', 'col-md-4');
          
                  const imgRow = document.createElement('div');
                  imgRow.classList.add('row');
                  const img = document.createElement('img');
                  img.classList.add('img-fluid','slow-load');
                  img.id = ('events-images');
                  //Example-to ensure slowloading works
                   // img.src = menu.tileImage; -before set Attribute-data-src--at first it src was set like this
                  //img.setAttribute('data-src', menu.tileImage); //Set the actual image source in data src
                  img.src = 'Kibo test images/736 light grey placeholder.png';
                  img.setAttribute('data-src', column.media.src);
                  img.alt = column.media.alt;
                  imgRow.appendChild(img);
          
                  const textRow = document.createElement('div');
                  textRow.classList.add('row');
                  for (let k = 0; k < column.text.length; k++) {
                    const p = document.createElement('p');
                    p.innerHTML = column.text[k];
                    textRow.appendChild(p);
                  }
          
                  colDiv.appendChild(imgRow);
                  colDiv.appendChild(textRow);
                  rowDiv.appendChild(colDiv);
                }
                break;
          
              case 'row2':
                // const videoWrapper = document.createElement('div');
                // videoWrapper.classList.add('video-carousel-wrapper');
                // const video = document.createElement('video');
                // video.classList.add('carousel-video','slow-load');
                // video.id = ('events-videos');
                // // video.poster = '/Kibo test images/16-9 Light grey placeholder.png';
                // video.setAttribute('data-src',eventItem.video.src); 
                // video.autoplay = true;
                // video.muted = true;
                // video.loop = true;
                // video.playsInline = true;
          
                // videoWrapper.appendChild(video);
                // if (eventItem.video.overlay) {
                //   const overlay = document.createElement('div');
                //   overlay.classList.add('overlay');
                //   videoWrapper.appendChild(overlay);
                // }
                // rowDiv.appendChild(videoWrapper);
                break;
          
              case 'row3':
                for (let j = 0; j < eventItem.images.length; j++) {
                  const colDiv = document.createElement('div');
                  colDiv.classList.add('col-md-3', 'mb-1', 'p-1');
                  const img = document.createElement('img');
                  img.classList.add('img-fluid', 'slow-load');
                  img.id = ('events-images');
                  img.src = 'Kibo test images/16-9 Light grey placeholder.png';
                  img.setAttribute('data-src', eventItem.images[j]);
                  img.alt = "star fish";
                  colDiv.appendChild(img);
                  rowDiv.appendChild(colDiv);
                }
                break;
          
              default:
                console.log('Unknown rowId: ', eventItem.rowId);
            }
          
            container.appendChild(rowDiv);
            resolve(); // Resolve the promise when content is successfully loaded
          }
     })
     //.catch(error => console.error( 'Error loading the JSON file:', error)); --a simple way of dispaly an error message on the console
     .catch(error => {
          //Hide the loading gif
          document.getElementById('loading').style.display = 'none'
          
         //Handles any errors that occur during the fetch or subsequent operations
         console.error('There was a problem with the fetch operation:', error);
         displayErrorInfo(error.message); //Display a user-friendly error message
         reject(error); // Reject the promise if there's an error
     })
     //Function to display an error message to the user
         function displayErrorInfo(message) {
        const errorInfoELement = document.getElementById('error-message');
        errorInfoELement.textContent =`An error occured while loading the content: ${message}`;
        errorInfoELement.style.display ='block'; //Make the error message visible
 }
  });


}

//WAIT UNTIL FETCHING OPERATION IS COMPLETE THEN RUN THIS CODE Load the content when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  loadExternaljsonBirthday()
  .then(() => {
       //Show footer
       document.getElementById('hide-footer').style.display ='block';
      // Initialize carousel and navbar scripts only after content is fully loaded
      initializeNavbar();
      slowLoadMedia();
      intializeVideoSettings()
      //Show footer
      document.getElementById('hide-video').style.display ='block';
      
  })
  .catch(error => {
      console.error('Error loading content:', error);
  });
  // Call slowLoadMedia initially and set an event listener for scroll and resize
  window.addEventListener('scroll', slowLoadMedia);
  window.addEventListener('resize', slowLoadMedia);
});

function intializeVideoSettings(){
  const videoElement = document.querySelector('.carousel-video');
      //const overlay = document.querySelector('.overlay');//tO AVOID FLICKERING I used html and css only.
     //Ensure the video starts playing especially on some browsersthat might prevent autoplay
     videoElement.play().catch(error =>{
     console.log('Autoplay prevented, trying to play video again:', error);
     videoElement.muted = true; //Ensures it's muted
     videoElement.play();
     }); 
}
