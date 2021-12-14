import { originsEl, destinationsEl } from '../app.js';

export const changeOriginClass = (target) => {
  if (!target.classList.contains('selected')) {
    const selectedEl = originsEl.querySelector('.selected');
    
    if (selectedEl !== null) {
      selectedEl.classList.toggle('selected');
    }

    target.classList.toggle('selected');
  }
}

export const changeDestinationClass = (target) => {
  if (!target.classList.contains('selected')) {
    const selectedEl = destinationsEl.querySelector('.selected');

    if (selectedEl !== null) {
      selectedEl.classList.toggle('selected');
    }
    
    target.classList.toggle('selected');
  }
}