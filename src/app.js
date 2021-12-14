import { renderOrigins, renderDestinations } from './modules/inputs.js';
import { changeOriginClass, changeDestinationClass } from './modules/classes.js';

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