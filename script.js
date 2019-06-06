var disableClick = false

setTimeout(() => {
	document.querySelector('.tha-machine').classList.add('active')
	document.querySelector('.nav').classList.add('active')
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
	// var url = "http://github.com/miodragvukovic/newstuff/blob/master/"+page+".html"
	var url = "https://cdn.jsdelivr.net/gh/miodragvukovic/newstuff/"+page+".html"
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
request("homepage")
function homeMovement() {
	var corrnerWheel = document.querySelector('.top-corrner-wheels')
	var showcase = document.querySelector('.homepage-showcase')
	var move = 0
	var moveLetters = 0
	var truth = true
	document.querySelector('.homepage').addEventListener('mousemove', function(e){
		const x = e.clientX
		move++
		corrnerWheel.children[0].style.transform = matrixRotate(move * 0.3)
		corrnerWheel.children[1].style.transform = "translate(90%, -25%) scale(.9) rotate3d(0, 0, 1, -"+move * 0.3+"deg)"
		corrnerWheel.children[2].style.transform = "translate(-35%, 90%) scale(.9) rotate3d(0, 0, 1, -"+move * 0.3+"deg)"
		// if ( moveLetters >= 200 ) {
		// 	truth = false
		// } else if ( moveLetters == 0 ) {
		// 	truth = true
		// }
		// if ( truth ) {
		// 	moveLetters++
		// } else {
		// 	moveLetters--
		// }
		// console.log(moveLetters)
		// for ( show of showcase.children ) {
		// 	show.style.color = "rgb("+ moveLetters / 2 +", "+ moveLetters / 2 +", "+ moveLetters / 2 +")"
		// }
		// for ( show of showcase.getElementsByClassName('go-left') ) {
		// 	show.style.transform = "translate3d(-"+ moveLetters * 0.1 +"px, 0, 0)"
		// }
		// for ( show of showcase.getElementsByClassName('go-right') ) {
		// 	show.style.transform = "translate3d("+ moveLetters * 0.1 +"px, 0, 0)"
		// }
	})
}

function check() {
	if ( document.getElementsByClassName('section')[1].classList.contains('homepage') ) {
		homeMovement()
	}
	let container = document.getElementsByClassName('page-content')[1]
	if ( container.offsetHeight > window.innerHeight ) {
		container.parentElement.addEventListener('scroll', () => {
			var scrolledFromTop = container.parentElement.scrollTop
			// console.log(scrolledFromTop)
		})
	} else {
		return false
	}
}



