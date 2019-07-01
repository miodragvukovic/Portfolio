var disableClick = false
var containerIncrement = 0

window.onload = function(){
	document.querySelector('.tha-machine').classList.add('active')
	document.querySelector('.nav').classList.add('active')
	request("homepage")
}

document.querySelector('.dropdown-trigger').addEventListener('click', function(){
	if ( this.classList.contains('active') ) {
		this.classList.remove('active')
		document.querySelector('.nav').classList.remove('expand')
	} else {
		this.classList.add('active')
		document.querySelector('.nav').classList.add('expand')
	}
})

for ( let i = 0; i < document.getElementsByClassName('trigger').length; i++ ) {
	var trigger = document.getElementsByClassName('trigger')[i]
	trigger.addEventListener('click', function(e) {
		e.preventDefault()
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
					document.querySelector('.nav').classList.remove('expand')
					document.querySelector('.dropdown-trigger').classList.remove('active')
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
			Brain[page + "Func"]()
			// check(page)
		}
	}
	request.send()
}

const Brain = {
	container: document.getElementsByClassName('page-content'),
	count: document.getElementsByClassName('count'),
	scroll(containerElement, targets, doSomething) {
		let container = containerElement[containerIncrement]
		container.addEventListener('scroll', () => {
			var scrolledFromTop = container.scrollTop
			for ( let el of targets ) {
				scrolledFromTop + window.innerHeight * 0.77 > el.offsetTop ? el.classList.add('active') : el.classList.remove('active')
			}
			typeof doSomething === 'function' ? doSomething(scrolledFromTop) : false
		})
	},
	proffesionalAnim(x) {
		document.querySelector('.big-bad-wheel').style.transform = "rotate3d(0, 0, 1, "+ x / 20 +"deg)"
	},
	personalAnim(x) {
		document.querySelector('.dot').style.transform = "translate3d(-"+x / 50+"vw,0, 0) scale("+ (0.5 + x / 1000) +")"
	},
	homepageFunc() {
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
			corrnerWheel.children[0].style.transform = "rotate3d(0, 0, 1, "+move * 0.3+"deg)"
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
	},
	professionalFunc() {
		this.scroll(this.container, this.count, this.proffesionalAnim)
	},
	personalFunc() {
		document.getElementsByClassName('section')[1].addEventListener('mousemove', (e) => {
			document.querySelector('.inner-dot').style.transform = "rotateX("+e.pageX / 10+"deg) rotateY("+e.pageY / 10+"deg)"
		})
		this.scroll(this.container, this.count, this.personalAnim)
	},
	skillsFunc() {
		if ( window.innerWidth > 1024 ) {
			var scTop = 0
			document.querySelector('.skills-container').addEventListener('wheel', function(e) {
				if ( e.deltaY > 2 || e.deltaY < -2 ) {
					document.querySelector('.scroll-me').style.color = 'red'
				} else {
					document.querySelector('.scroll-me').style.color = 'white'
				}
				var parent = document.querySelector('.skills-container')
				var child = document.querySelector('.scrolling-area')
				if ( scTop < 0 ) {
					scTop = 0
				} else if ( scTop > child.offsetWidth - parent.offsetWidth) {
					scTop = child.offsetWidth - parent.offsetWidth
				} else {
					scTop = Number((scTop + e.deltaY / 7).toFixed(0))
					document.querySelector('.scrolling-area').style.transform = "translate3d(-"+scTop+"px, 0, 0)"
					document.querySelector('.progress-line').style.height = (scTop / (child.offsetWidth - parent.offsetWidth)) * 100 + "%"
				}
				for ( let span of document.getElementsByClassName('skill-span') ) {
					let spanLeftDistance = Number((span.getBoundingClientRect().left).toFixed(0))
					let triggerPoint = spanLeftDistance + scTop - parent.offsetWidth / 2
					if ( scTop > triggerPoint ) {
						if ( scTop - triggerPoint < parent.offsetWidth / 4 && scTop - triggerPoint > 20 ) {
							span.style.letterSpacing = 50 - ((scTop - triggerPoint) / (parent.offsetWidth / 4)) * 50 + "px"
							span.classList.add('fade')
						} else {
							span.classList.remove('fade')
						}
					}
				} 
			})
		}
	},
	aboutFunc() {
	},
	projectsFunc() {
		var sliderIndex = 0
		var istina = false
		var hover = false
		var start, end, result
		var slides = document.getElementsByClassName('slide')
		var slider = document.querySelector('.slider')
		function doTheJob() {
		  document.querySelector('.inner').style.left = "-"+ sliderIndex +"00%"
		  for ( let slide of slides ) {
		    slide.classList.remove('active')
		  }
		  document.querySelector('.slide'+ (sliderIndex+1) +'').classList.add('active')
		}
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
}
