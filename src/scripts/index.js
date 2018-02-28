function carousel() {
  var flkty = new Flickity('.js-carousel');
};


function interactiveMap() {
  var elements = Array.prototype.slice.call(document.getElementsByClassName('js-interactiveMap'));

  elements.forEach(function(element, index) {
    element.addEventListener('click', function() {
      this.closest('.c-map').setAttribute('data-mapitem', index);
    });
  });
};


function popupWindow(url) {
  var width = 575;
  var height = 400;
  var multiScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screen.left;
  var multiScreenTop = window.screenTop !== undefined ? window.screenTop : window.screen.top;
  var options = [
    'status=1',
    'width=' + width,
    'height=' + height,
    'left=' + Math.ceil((window.innerWidth / 2 - width / 2) + multiScreenLeft),
    'top=' + Math.ceil((window.innerHeight / 2 - height / 2) + multiScreenTop)
  ].join(',');

  window.open(url, '_blank', options);
};


function sharingLinks() {
  var elements = Array.prototype.slice.call(document.getElementsByClassName('js-sharingLinks'));

  elements.forEach(function(element) {
    element.addEventListener('click', function(event) {
      event.preventDefault();
      popupWindow(element.href);
    });
  });
};


function viewportMonitor() {
  var elements = Array.prototype.slice.call(document.getElementsByClassName('js-viewportMonitor'));

  elements.forEach(function(element) {
    new WhenInViewport(element, function(elementInViewport) {
      elementInViewport.classList.add('in-viewport');
    });
  });
};


document.addEventListener('DOMContentLoaded', function() {
  carousel();
  interactiveMap();
  sharingLinks();
  svg4everybody();
  viewportMonitor();
});
