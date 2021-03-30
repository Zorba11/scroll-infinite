const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = '522TdOcUPNj_kwqNl-YGs6sOLSNTRixIOjUZbmPhN1M';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}
// helper function to set attributes on DOM elements

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


// Create elements for links and photos, add to DOM

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank'); //opens in a new tab

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        //create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        
        
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        // event listener to check when each image is finished loading

        img.addEventListener('load', imageLoaded);


//put <img> inside <a>, then put both inside image container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API

async function getPhotos() {
    try {
       const response = await fetch(apiUrl)     ;
       photosArray = await response.json();
       displayPhotos();
    } catch (error) {
        console.log(error);
    }
}

// Check to see if scrolling reached bottom of the page, then load more photos

window.addEventListener('scroll', () => {
    // 1000 (or any pixel value) is subtracted from offsetHeight, to trigger event before bottom is reached
   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
       ready = false;
       getPhotos();
   }
});

// On load
getPhotos();

