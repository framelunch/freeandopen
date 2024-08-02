import $ from 'jquery';
import notice from 'libraries-frontend-framelunch/js/notice';

import { Loader } from '@googlemaps/js-api-loader';

const embedMap = () => {
  const mapArea = document.getElementById('maps');
  const loader = new Loader({
    apiKey: 'AIzaSyABHu-tc2_2rbh4rIFc9eWP0Dzdjm6vyjI',
    version: 'weekly',
    libraries: ['places'],
  });

  const mapOptions = {
    center: {
      lat: 35.65853708026859,
      lng: 139.70220304684628,
    },
    zoom: 16,
    styles: [
      {
        stylers: [
          {
            saturation: -100,
          },
        ],
      },
    ],
  };

  loader
    .load()
    .then(google => {
      const map = new google.maps.Map(mapArea, mapOptions);

      const markerOptions = {
        map,
        position: mapOptions.center,
        icon: '/top/image/map-pin.png',
      };

      const marker = new google.maps.Marker(markerOptions);
    })
    .catch(e => {
      // do something
    });
};

notice.listen('init', () => {
  const target = document.querySelector('.access');

  const options = {
    root: null,
    rootMargin: '0px 0px',
    threshold: 0,
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        embedMap();
        observer.unobserve(target);
      }
    });
  }, options);

  observer.observe(target);
});
