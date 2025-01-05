const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 5;
const apiKey = 'KEY';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Display of Photos (was reading the let instead of the const)
// function displayPhotos() {
//   // console.log(photosArray);
//   // attempt 1 (is not reading the foreach method)
//   // foreach in photosArray
//   photosArray.forEach(function (photo) {
//     console.log(photo.urls.alt_description);
//     // create <a> element to link to Unsplash
//     const item = document.createElement('a');
//     item.setAttribute('href', photo.links.html);
//     item.setAttribute('target', '_blank');
//     // create img for photo
//     const img = document.createElement('img');
//     img.setAttribute('src', photo.urls.regular);
//     img.setAttribute('alt', photo.urls.alt_description);
//     img.setAttribute('title', photo.urls.alt_description);
//     // put img inside <a> and <a> inside img container
//     item.appendChild(img);
//     imageContainer.appendChild(item);
//   });
// }

// Check if images were loaded
function imageLoaded() {
  // images
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
  }
}

//Helper Setting Atributes
function setAtributes(element, atributes) {
  for (const key in atributes) {
    element.setAttribute(key, atributes[key]);
  }
}

//Get Photos Function
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const photosArray = await response.json();
    // displayPhotos();
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach(function (photo) {
      // create <a> element to link to Unsplash
      const item = document.createElement('a');
      setAtributes(item, {
        href: photo.links.html,
        target: '_blank',
      });
      // create img for photo
      const img = document.createElement('img');
      setAtributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
      });
      // Event Listener when finished loading
      img.addEventListener('load', imageLoaded);
      // put img inside <a> and <a> inside img container
      item.appendChild(img);
      imageContainer.appendChild(item);
    });
    // displayPhotos();
  } catch (error) {
    // catch error
  }
}

// Load more photos when scroll near the bottom
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
