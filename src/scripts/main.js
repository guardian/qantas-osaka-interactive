function carousel() {
  var carousel = document.querySelector('.js-carousel');

  if (document.body.contains(carousel)) {
    var flkty = new Flickity(carousel, {
      adaptiveHeight: true
    });
  }
}


function map() {
  var mapLegendItems = Array.prototype.slice.call(document.querySelectorAll('.js-map-legend li'));

  mapLegendItems.forEach(function(mapLegendItem, index) {
    mapLegendItem.addEventListener('click', function() {
      this.closest('.c-map').setAttribute('data-map-item', index);
    });
  });
}


function popup(url) {
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
}


function share() {
  var shareLinks = Array.prototype.slice.call(document.querySelectorAll('.js-share-menu a'));

  shareLinks.forEach(function(shareLink) {
    shareLink.addEventListener('click', function(event) {
      event.preventDefault();
      popup(shareLink.href);
    });
  });
}


function viewport() {
  var elements = Array.prototype.slice.call(document.getElementsByClassName('js-viewport'));

  elements.forEach(function(element) {
    new WhenInViewport(element, function(elementInViewport) {
      elementInViewport.classList.add('in-viewport');
    });
  });
}


document.addEventListener('DOMContentLoaded', function() {
  carousel();
  map();
  share();
  viewport();
});
