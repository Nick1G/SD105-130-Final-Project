const transitKey = 'DUq34xxCLE290mP3lB8h';
const transitCall = 'https://api.winnipegtransit.com/v3/trip-planner.json?';
import { tripList } from '../app.js';

export default (originCoords, destCoords) => {
  return fetch(`${transitCall}origin=geo/${originCoords[0]},${originCoords[1]}&destination=geo/${destCoords[0]},${destCoords[1]}&api-key=${transitKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.plans.length === 0) {
        tripList.insertAdjacentHTML('beforeend', `
          <h2>No trips available!</h2>`);
        return;
      }

      data.plans.forEach(plan => {
        plan.segments.forEach(segment => {
          const dataObject = new Object();
          dataObject.type = segment.type;
          dataObject.time = segment.times.durations.total;
  
          if (segment.from !== undefined) {
            if (segment.from.stop !== undefined) {
              dataObject.currentStop = `${segment.from.stop.key} - ${segment.from.stop.name}`;
            }
          }
  
          if (segment.to !== undefined) {
            if (segment.to.stop !== undefined) {
              dataObject.nextStop = `${segment.to.stop.key} - ${segment.to.stop.name}`;
            }
          }
  
          if (segment.route !== undefined) {
            if (segment.route.name !== undefined) {
              dataObject.route = segment.route.name;
            } else {
              dataObject.route = segment.route.key;
            }
          }
  
          renderRoute(dataObject);
        });
      })
    });
}

const renderRoute = (object) => {
  if (tripList.querySelectorAll('h2').length === 0) {
    tripList.insertAdjacentHTML('beforeend', `
      <h2>Recommended Route</h2>`);

  } else if (tripList.querySelectorAll('h2').length === 1 && tripList.querySelectorAll('hr').length === 1) {
    tripList.insertAdjacentHTML('beforeend', `
      <h2>Alternative Routes</h2>`);
  }

  if (object.type === 'walk' && Object.keys(object).includes('nextStop')) {
    tripList.insertAdjacentHTML('beforeend', `
      <li>
        <i class="fas fa-walking" aria-hidden="true"></i>Walk for ${object.time} minutes to stop #${object.nextStop}
      </li>`);

  } else if (object.type === 'ride') {
    tripList.insertAdjacentHTML('beforeend', `
      <li>
        <i class="fas fa-bus" aria-hidden="true"></i>Ride the ${object.route} for ${object.time} minutes.
      </li>`);

  } else if (object.type === 'transfer') {
    tripList.insertAdjacentHTML('beforeend', `
      <li>
        <i class="fas fa-ticket-alt" aria-hidden="true"></i>Transfer from stop #${object.currentStop} to stop #${object.nextStop}
      </li>`);
  } else {
    tripList.insertAdjacentHTML('beforeend', `
      <li>
        <i class="fas fa-walking" aria-hidden="true"></i>Walk for ${object.time} minutes to your destination.
      </li><hr>`);
  }
}