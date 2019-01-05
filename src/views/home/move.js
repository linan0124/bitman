var newList = []
var l = 50
var long = l + 10
var width = $(window).width() * 0.9
var height = 230
function innit (list) {
  newList = []
  for (var id in list) {
    if (list.hasOwnProperty(id)) {
      var item = {text: list[id], id: id, style: {top: '0px', left: '0px'}}
      newList.push(item)
    }
  }

  for (var i = 0; i < newList.length; i++) {
    var element = newList[i]
    created(element)
  }
  return newList
}

var list = []
function created (element) {
  var x = Math.floor(Math.random() * width)
  var y = Math.floor(Math.random() * height)

  if (cash(x, y)) {
    element.style.top = y + 'px'
    element.style.left = x + 'px'
  } else {
    created(element)
  }
}

function cash (x, y) {
  var lock = false
  if (x > (width - l) || y > (height - l)) {
    return false
  }

  for (var i = 0; i < newList.length; i++) {
    var element = newList[i]
    var ex = element.style.left.split('px')[0]
    var ey = element.style.top.split('px')[0]
    var Squared = Math.abs((ex - x) * (ex - x)) + Math.abs((ey - y) * (ey - y))

    if (Squared < long * long) {
      lock = false
      break
    } else {
      lock = true
    }
  }
  return lock
}

export default innit
