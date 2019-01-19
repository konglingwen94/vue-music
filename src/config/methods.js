export function getClientTop(selector) {
  if (typeof selector == 'string') {
    selector = document.querySelector(selector)
  }

  var top = selector.getBoundingClientRect().top
  // console.log(`top is ${top}`)
  return top
}
export function findCubeScroll() {
  var name = this.$options.name;
  if (name && name.includes('cube-scroll')) {
    return this
  } else {
    // console.group(`this is ${name}`)
  }
}
export function findVerticalScroll(argument) {
  // body..

  var ret = this.findCubeScroll()
  if (ret) {
    if (ret.direction == 'vertical') {
      return this
    } else {

      // console.log(`this is ${ret.direction} scroll`)
    }
  }
}

export function setScrollWrapHeight() {
  var ret = this.findVerticalScroll();
  if (ret && !this.$attrs['self-height']) {
    var $el = ret.$el;
    if (this.isDom($el)) {
      if ($el.parentElement && $($el).index() == 0) {

        this.setElHeight({ selector: $el.parentElement })
      } else {
        this.setElHeight({ selector: $el, el: 'self' })

      }
    }
  }
}
export function setElHeight({ selector, top = 0, bottom = 0, el = 'parent' }) {
  setTimeout(() => {
    if (typeof this.$attrs['client-top'] == "number") {
      top = this.$attrs['client-top']
    } else if (typeof this.$attrs.scroll__Bot == "number") {
      bottom = this.$attrs.scroll__Bot
    } else {
      top = this.getClientTop(selector)
    }
    // console.log('mixin' + top);
    // console.log('mixin mounted')

    // this.$nextTick(() => {



    var height = innerHeight - bottom - top;
    if ($(selector)[0].__vue__) {
      $(selector)[0].__vue__.wrapHeight = height
    }
    $(selector).css({ height }).attr('data-height', `${height}`)
    // console.log(`set ${el} height ${height}`)
  }, 40)
  // })
}
export function isDom(obj) {
  if (typeof HTMLElement === 'object') {

    return obj instanceof HTMLElement;
  } else {

    return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
  }
}
export function isDir(dir = 'src') {
  // body...

}
export function setCompName(argument) {
  // body...
  var DIR_NAME = 'src';
  var __file = this.$options.__file
  var name = this.$options.name
  if (__file && !name && __file.startsWith(DIR_NAME)) {
    var fileArr = __file.split('/'),
      fileName = '';
    if (fileArr[fileArr.length - 1].startsWith('index')) {
      fileName = fileArr[fileArr.length - 2]
      this.$options.name = _.kebabCase(fileName)
    } else {
      // console.log(fileArr)

      fileName = fileArr[fileArr.length - 1];

      this.$options.name = _.kebabCase(fileName.split('.')[0])
    }
  }
}

export function setPageClass() {
  // body...
  var __file = this.$options.__file
  if (__file && __file.includes('src/pages') && __file.includes('index.vue')) {
    // console.log(__file);
    $(this.$el).addClass(this.$options.name + '-page')
  }
}
export function getElHeight(selector) {
  // body...
  var el, h = 0;
  if (isDom(selector)) {
    h = getComputedStyle(selector).height
  } else if (el = document.querySelector(selector)) {
    h = getComputedStyle(el).height

  } else {
    throw Error(selector)
  }
  return parseInt(h)
}
export function getElEvenHeight(selector) {
  // body...
  var h = this.getElHeight(selector)
  return this.getEvenNum(h)
}
export function getEvenNum(val) {
  var _n = parseFloat(val);
  if (!isNaN(_n)) {
    var float = _n - Math.floor(_n);
    if (Math.floor(_n) % 2 == 0) {
      return Math.floor(_n)
    } else if (Math.ceil(_n) % 2 == 0) {
      return Math.ceil(_n)
    } else {
      return Math.random() > 0.5 ? _n + 1 : _n - 1
    }
  } else {
    throw Error(val)
  }
}
export async function getNextTickElHeight(selector) {
  // body...
  await this.$nextTick()
  return this.getElHeight(selector)


}
