import { mapboxAPI, mapboxKey, bboxCoords } from '../app.js';
const destinationsEl = document.querySelector('.destinations');

export default (input) => {
  if (!input) {
    return;
  }

  return fetch(`${mapboxAPI}${input}.json?bbox=${bboxCoords}&limit=10&access_token=${mapboxKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.features.length !== 0) {
        destinationsEl.innerHTML = '';

        data.features.forEach(location => {
          destinationsEl.insertAdjacentHTML('beforeend', `
          <li data-long="${location.center[0]}" data-lat="${location.center[1]}">
            <div class="name">${location.text}</div>
            <div>${location.properties.address}</div>
          </li>`);
        });
      }
    });
}