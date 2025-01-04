const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = 'KEY';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Display of Photos
function displayPhotos() {
  console.log('array displayed');
  // attempt 1 (is not reading the foreach method)
  // foreach in photosArray
  photosArray.forEach(function (photo) {
    console.log(photo.urls.alt_description);
    // create <a> element to link to Unsplash
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');
    // create img for photo
    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.urls.alt_description);
    img.setAttribute('title', photo.urls.alt_description);
    // put img inside <a> and <a> inside img container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//Get Photos Function
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const photosArray = await response.json();
    // console.log('array filled');
    displayPhotos();
  } catch (error) {
    // catch error
  }
}

// On Load
getPhotos();
