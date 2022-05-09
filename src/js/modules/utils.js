/* eslint-disable */
export function getQuery() {
  const vars = [];
  let max = 0;
  let hash = '' || [];
  const array = '';
  const url = window.location.search;
  if (url) {
    hash = url.slice(1).split('&');
    max = hash.length;
    for (let i = 0; i < max; i += 1) {
      const array = hash[i].split('=');
      vars.push(array[0]);
      vars[array[0]] = array[1];
    }
    return vars;
  }
}

export function getQueryName(name) {
  let response = null;
  const q = getQuery();
  if (q) {
    if (q[name]) {
      response = q[name];
    }
  }
  return response;
}

export function preloadImage(images, callback) {
  const imageLength = images.length;
  let loadCnt = 0;
  images.forEach((value, index) => {
    const image = new Image();
    image.onload = () => {
      loadComplete();
    };
    image.onerror = () => {
      loadComplete();
    };
    image.src = value.src;
  });

  function loadComplete() {
    loadCnt += 1;
    if (loadCnt >= imageLength) {
      callback();
    }
  }
}

export function preloadVideos(videos, callback) {
  const videoLength = videos.length;
  let loadCnt = 0;
  if (videoLength <= 0) {
    callback();
  } else {
    videos.forEach((value, index) => {
      value.addEventListener('loadeddata', () => {
        loadComplete();
      });
      value.addEventListener('error', () => {
        loadComplete();
      });
      value.load(); // これがないとloadeddata取得できない
    });
  }

  function loadComplete() {
    loadCnt += 1;
    if (loadCnt >= videoLength) {
      callback();
    }
  }
}

export function preloadAssets(target, callback) {
  preloadImage(document.querySelectorAll(`${target} img`), () => {
    preloadVideos(document.querySelectorAll(`${target} video`), () => {
      callback();
    });
  });
}
