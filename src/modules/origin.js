import { mapboxKey, mapboxAPI, bboxCoords } from '../app.js';
const originPlaces = document.querySelector('.origins');

export default (name) => {
  if (!name) {
    return;
  }

  return fetch(`${mapboxAPI}${name}.json?bbox=${bboxCoords}&limit=10&access_token=${mapboxKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.features.length !== 0) {
        originPlaces.innerHTML = '';

        data.features.forEach(location => {
          originPlaces.insertAdjacentHTML('beforeend', `
          <li data-long="${location.center[0]}" data-lat="${location.center[1]}">
            <div class="name">${location.text}</div>
            <div>${location.properties.address}</div>
          </li>`);
        });
      }
    });
}