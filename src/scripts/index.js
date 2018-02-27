function openPopupWindow(url) {
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

function shareLinks() {
  var links = Array.prototype.slice.call(document.getElementsByClassName('js-share'));
  links.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      openPopupWindow(link.href);
    });
  });
};

document.addEventListener('DOMContentLoaded', function() {
  var flkty = new Flickity('.js-carousel');
  shareLinks();
  svg4everybody();
});
