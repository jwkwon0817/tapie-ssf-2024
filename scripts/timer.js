let minutes = 2
let seconds = 59

setInterval(() => {
	seconds -= 1
	if (seconds < 0) {
		seconds = 59
		minutes -= 1
	}
}, 1000)
