var disableClick = false
var containerIncrement = 0

setTimeout(() => {
	document.querySelector('.tha-machine').classList.add('active')
	document.querySelector('.nav').classList.add('active')
	request("homepage")
}, 100)

const degToRad = Math.PI * 2 / 360

function matrixRotate(num) {
	radian = num * degToRad
	sin = Math.sin(radian)
	cos = Math.cos(radian)
	a = parseFloat(cos).toFixed(8)
	b = parseFloat(sin).toFixed(8)
	c = parseFloat(-sin).toFixed(8)
	d = parseFloat(cos).toFixed(8)
	return "matrix("+ a +", "+ b +", "+ c +", "+ d +", 0, 0)"
}

for ( let i = 0; i < document.getElementsByClassName('trigger').length; i++ ) {
	var trigger = document.getElementsByClassName('trigger')[i]
	trigger.addEventListener('click', function(){
		containerIncrement = 1
		let selected = this.getAttribute('data-target')
		let selectedAnchorValue = ((i + 1) * 16.666) - 8.333
		let matrixParse = (window.innerHeight / 100) *  selectedAnchorValue
		if ( disableClick == false ) {
			disableClick = true
			if ( this.classList.contains('active') ) {
				disableClick = false
				return false
			} else {
				for ( var trigger1 of document.getElementsByClassName('trigger') ) {
					trigger1.classList.remove('active')
				}
				this.classList.add('active')
				request(selected)
				document.querySelector('.anchor-pointer').style.transform = "translate3d(0, "+(window.innerHeight / 100) * ((i) * 16.666)+"px, 0)"
				for ( let chains of document.getElementsByClassName('links') ) {
					chains.children[0].style.transform = "translate3d(-"+matrixParse+"px, 0, 0)"
				}
				for ( let spinIt of document.getElementsByClassName('spin-it') ) {
					spinIt.style.transform = "rotate3d(0, 0, 1, "+ (53.241 * (i+1)) * 3.6 +"deg)"
				}
			}
		}
	})
}

function request(page) {
	const request = new XMLHttpRequest()
	var url = "https://raw.githubusercontent.com/miodragvukovic/newstuff/master/"+page+".html"
	// var url = "https://cdn.jsdelivr.net/gh/miodragvukovic/newstuff/"+page+".html"
	request.open('get', url, true)
	request.onreadystatechange = function() {
		if ( request.readyState == 3 ) {
			document.querySelector('.loading-line').classList.add('active')
		}
		if ( request.readyState == 4 && request.status == 200 ) {
			var data = request.responseText
			var string = ''
			var el = document.getElementsByClassName('section')[0]
			var addedEl = document.getElementsByClassName('section')[1]
			string += "<div class='section "+page+"'>"
			string += "</div>"
			document.querySelector('#main').insertAdjacentHTML('beforeend', string)
			el.classList.add('passive')
			document.getElementsByClassName('section')[1].innerHTML = data
			setTimeout(() => {
				document.getElementsByClassName('section')[1].classList.add('active')
			}, 50)
			
			setTimeout(() => {
				el.parentNode.removeChild(el)
				disableClick = false
				document.querySelector('.loading-line').classList.remove('active')
			}, 800)
			check()
		}
	}
	request.send()
}

function homeMovement() {
	var corrnerWheel = document.querySelector('.top-corrner-wheels')
	var logo = document.querySelector('.logo')
	var move = 0
	var colorMove = 0
	var colorMoveBool = true
	var moveLetters = 0
	var truth = true
	document.querySelector('.homepage').addEventListener('mousemove', function(e){
		const x = e.clientX
		move++
		corrnerWheel.children[0].style.transform = matrixRotate(move * 0.3)
		corrnerWheel.children[1].style.transform = "translate(90%, -25%) scale(.9) rotate3d(0, 0, 1, -"+move * 0.3+"deg)"
		corrnerWheel.children[2].style.transform = "translate(-12%, 95%) scale(.9) rotate3d(0, 0, 1, -"+move * 0.3+"deg)"
		if ( colorMoveBool ) {
			colorMove++
		} else {
			colorMove--
		}
		if (colorMove >= 255) {
			colorMoveBool = false
		} else if ( colorMove <= 0 ) {
			colorMoveBool = true
		}
		logo.style.background = "rgb("+ colorMove +", "+ colorMove +", "+ colorMove +")"
		logo.style.color = "rgb("+ (255 - colorMove) +", "+ (255 - colorMove) +", "+ (255 - colorMove) +")"
	})
}

function personalMovement() {
	document.querySelector('.sc').addEventListener('mousemove', (e) => {
	  document.querySelector('.dot').style.transform = "rotateX("+e.pageX / 10+"deg) rotateY("+e.pageY / 10+"deg)"
	})
}

function check() {
	var section = document.getElementsByClassName('section')[1]
	section.classList.contains('homepage') ? homeMovement() : false
	section.classList.contains('personal') ? personalMovement() : false
	section.classList.contains('skills') ? initSlider() : false
	// if ( document.getElementsByClassName('section')[1].classList.contains('homepage') ) {
	// 	homeMovement()
	// }
	let container = document.getElementsByClassName('page-content')[containerIncrement]
	let els = document.getElementsByClassName('count')
	if ( container.offsetHeight > window.innerHeight ) {
		container.parentElement.addEventListener('scroll', () => {
			var scrolledFromTop = container.parentElement.scrollTop
			for ( let el of els ) {
				scrolledFromTop + window.innerHeight * 0.77 > el.offsetTop ? el.classList.add('active') : el.classList.remove('active')
			}
			if ( scrolledFromTop <=  container.offsetHeight - window.innerHeight + (window.innerHeight / 10) + (window.innerHeight / 20) + 30) {
				document.querySelector('.square-overlay').style.transform = "translate3d(0, "+scrolledFromTop+"px, 0)"
			}
		})
	} else {
		return false
	}
}

function initSlider() {
	var sliderIndex = 0
	var istina = false
	var hover = false
	var start, end, result
	var slides = document.getElementsByClassName('slide')
	var slider = document.querySelector('.slider')
	// document.querySelector('.inner').style.width = ""+slider.length+"00%";
	function doTheJob() {
	  document.querySelector('.inner').style.left = "-"+ sliderIndex +"00%"
	  for ( let slide of slides ) {
	    slide.classList.remove('active')
	  }
	  document.querySelector('.slide'+ (sliderIndex+1) +'').classList.add('active')
	}
	var interval = setInterval(function(){
	  if ( hover == false ) {
	    if ( sliderIndex == slides.length - 1) {
	      istina = true
	    } else if ( sliderIndex == 0 ) {
	      istina = false
	    }
	    if ( istina == false ) {
	      sliderIndex++
	      doTheJob()
	    } else {
	      sliderIndex--
	      doTheJob()
	    }
	  }
	}, 5000)
	slider.addEventListener('mouseenter', () => hover = true)
	slider.addEventListener('mouseleave', () => hover = false)
	document.querySelector('.left-arrow').addEventListener('click', function() {
	  if ( sliderIndex < 1 ) {
	    return false
	  } else {
	    var orient = Number(this.getAttribute('data-value'))
	    sliderIndex = sliderIndex + orient
	    doTheJob()
	  }
	})
	document.querySelector('.right-arrow').addEventListener('click', function() {
	  if ( sliderIndex + 1 >= slides.length ) {
	    return false
	  } else {
	    var orient = Number(this.getAttribute('data-value'))
	    sliderIndex = sliderIndex + orient
	    doTheJob()
	  }
	})
	slider.addEventListener('mousedown', function(e){
	  start = e.pageX
	})
	slider.addEventListener('mouseup', function(e){
	  end = e.pageX
	  result = start - end
	  if ( result >= 20 ) {
	    if ( sliderIndex + 1 >= slides.length ) {
	      return false
	    } else {
	      sliderIndex = sliderIndex + 1
	      doTheJob()
	    }
	  } else if ( result < -20 ) {
	    if ( sliderIndex < 1 ) {
	      return false
	    } else {
	      sliderIndex = sliderIndex - 1
	      doTheJob()
	    }
	  }
	})
}
