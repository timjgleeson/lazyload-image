module.exports = lazyLoadImages
module.exports.lazyLoadImagesManager = lazyLoadImagesManager

var Emitter = require('events').EventEmitter

function lazyLoadImagesManager() {
  Emitter.call(this)
  this.images = $('.js-lazy-image')
}

function lazyLoadImages() {
  var lli = new lazyLoadImagesManager()
  lli.start()
  return lli
}

lazyLoadImagesManager.prototype.start = function () {
  this.processScroll()
  window.addEventListener('scroll', this.processScroll)
}

lazyLoadImagesManager.prototype.processScroll = function () {
  for (var i = 0; i < this.images.length; i++) {
    if (this.elementInViewport(this.images[i])) {
      this.loadImage(this.images[i], i)
    }
  }
}

lazyLoadImagesManager.prototype.loadImage = function (el, i) {
  var img = new Image()
    , src = el.getAttribute('data-src')

  img.onload = function() {
    $(el).find('.js-image').attr('src', src)
    $(el).removeClass('is-loading')

    this.images.splice(i, i)
  }

  img.src = src
}

lazyLoadImagesManager.prototype.elementInViewport = function (el) {
  var rect = el.getBoundingClientRect()

  return (
     rect.top    >= (0 - (el.offsetHeight - (el.offsetHeight * 0.1)))
  && rect.left   >= 0
  && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
  )
}
