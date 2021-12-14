import { renderOrigins, renderDestinations } from './modules/inputs.js';
import { changeOriginClass, changeDestinationClass } from './modules/classes.js';
import getPlan from './modules/plan.js';

export const originsEl = document.querySelector('.origins');
export const destinationsEl = document.querySelector('.destinations');

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
    const startLatAndLong = [selectedLocations[0].getAttribute('data-lat'), selectedLocations[0].getAttribute('data-long')];
    const endLatAndLong = [selectedLocations[1].getAttribute('data-lat'), selectedLocations[1].getAttribute('data-long')];
    getPlan(startLatAndLong, endLatAndLong);
  }
});