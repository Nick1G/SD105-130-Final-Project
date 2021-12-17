import { renderOrigins, renderDestinations } from './modules/inputs.js';
import { changeOriginClass, changeDestinationClass } from './modules/classes.js';
import getPlan from './modules/plan.js';

export const originsEl = document.querySelector('.origins');
export const destinationsEl = document.querySelector('.destinations');
export const tripList = document.querySelector('.my-trip');

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

document.querySelector('body').addEventListener('click', e => {
  if (e.target.parentElement.parentElement.className === 'origins') {
    changeOriginClass(e.target.parentElement);

  } else if (e.target.parentElement.parentElement.className === 'destinations') {
    changeDestinationClass(e.target.parentElement);
  }
});

const planButton = document.querySelector('.plan-trip');
planButton.addEventListener('click', () => {
  const selectedLocations = document.querySelectorAll('.selected');

  if (selectedLocations.length === 2) {
    tripList.innerHTML = '';
    const startLatLong = [selectedLocations[0].getAttribute('data-lat'), selectedLocations[0].getAttribute('data-long')];
    const endLatLong = [selectedLocations[1].getAttribute('data-lat'), selectedLocations[1].getAttribute('data-long')];

    if (startLatLong[0] === endLatLong[0] && startLatLong[1] === endLatLong[1]) {
      tripList.innerHTML = '';
      tripList.insertAdjacentHTML('beforeend', `
        <h2>You're already there!</h2>`);
      return;
    }

    getPlan(startLatLong, endLatLong);
    
  } else {
    tripList.innerHTML = '';
    tripList.insertAdjacentHTML('beforeend', `
      <h2>Please Select An Origin AND Destination</h2>`);
  }
});