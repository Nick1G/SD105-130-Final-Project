const mapboxKey = 'pk.eyJ1Ijoibmlja28xIiwiYSI6ImNrd3o2MTU5ejBydGwybm1raXNrdzVyMTYifQ.GJ6eL_Q7ltDLLzW572Q5iA';
const mapboxAPI = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const bboxCoords = '-97.325875,49.766204,-96.953987,49.99275';

import { originsEl, destinationsEl } from '../app.js';

export const renderOrigins = (input) => {
  if (!input) {
    return;
  }

  return fetch(`${mapboxAPI}${input}.json?bbox=${bboxCoords}&limit=10&access_token=${mapboxKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.features.length !== 0) {
        originsEl.innerHTML = '';

        data.features.forEach(location => {
          let address = location.properties.address;

          if (location.properties.address === undefined) {
            address = 'Winnipeg';
          }

          originsEl.insertAdjacentHTML('beforeend', `
            <li data-long="${location.center[0]}" data-lat="${location.center[1]}">
              <div class="name">${location.text}</div>
              <div>${address}</div>
            </li>`);
        });
      }
    });
}

export const renderDestinations = (input) => {
  if (!input) {
    return;
  }

  return fetch(`${mapboxAPI}${input}.json?bbox=${bboxCoords}&limit=10&access_token=${mapboxKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.features.length !== 0) {
        destinationsEl.innerHTML = '';

        data.features.forEach(location => {
          let address = location.properties.address;

          if (location.properties.address === undefined) {
            address = 'Winnipeg';
          }

          destinationsEl.insertAdjacentHTML('beforeend', `
            <li data-long="${location.center[0]}" data-lat="${location.center[1]}">
              <div class="name">${location.text}</div>
              <div>${address}</div>
            </li>`);
        });
      }
    });
}