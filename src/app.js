export const mapboxKey = 'pk.eyJ1Ijoibmlja28xIiwiYSI6ImNrd3o2MTU5ejBydGwybm1raXNrdzVyMTYifQ.GJ6eL_Q7ltDLLzW572Q5iA';
export const mapboxAPI = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
export const bboxCoords = '-97.325875,49.766204,-96.953987,49.99275';

import renderOrigins from './modules/origin.js';
import renderDestinations from './modules/destination.js';

const startInputEl = document.querySelector('.origin-form');
startInputEl.addEventListener('submit', e => {
  e.preventDefault();
  renderOrigins(e.target.firstElementChild.value);
});

const endInputEl = document.querySelector('.destination-form');
endInputEl.addEventListener('submit', e => {
  e.preventDefault();
  renderDestinations(e.target.firstElementChild.value);
});