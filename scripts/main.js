const canvas = document.getElementById('canvas')
const ctx = canvas.getContext("2d");

ctx.canvas.width  = window.innerWidth / 2;
ctx.canvas.height = window.innerHeight - 5;

const backgroundImage = generateImage("../images/bg.jpg")

const missileImage = generateImage("../images/player/missle.png")

const moveLeftImage = generateImage("../images/player/walk_left.png")
const moveRightImage = generateImage("../images/player/walk_right.png")

const enemyLeft = generateImage("../images/enemy/dwarf_left.png")
const enemyRight = generateImage("../images/enemy/dwarf_right.png")

const tenAll = generateImage("../images/skills/10all.png")

setInterval(()=>{
	enemies.map((enemy, i) => {
		enemy.health -= newPlayer.tenAllNumber * 5
		if (enemy.health <= 0) {
			kills += 1
			enemies.splice(i,1)
		}
	})

	if (newPlayer.tenAllNumber > 0) {
		tenAllDelay = true
		let zap = new Audio;
		zap.src = '../sounds/zap.mp3'
		zap.volume = 0.1
		zap.play()
	}

}, 5000)

let tenAllDelay = false
let tenAllCounter = 0



const newPlayer = new Player()

const music = new Audio;
music.src = '../sounds/music.mp3'
music.volume = 0.2

window.requestAnimationFrame(gameLoop)


function generateRandom(min = 0, max = canvas.width) {
	let difference = max - min;
	let rand = Math.random();
	rand = Math.floor( rand * difference);
	rand += min;
	return rand;
}

function generateRandomSkill(min = 0, max = newPlayer.availableUpgrades.length) {
	let difference = max - min;
	let rand = Math.random();
	rand = Math.floor( rand * difference);
	rand += min;
	return rand;
}

function randomPushback(min = -3, max = 3) {
	let difference = max - min;
	let rand = Math.random();
	rand = Math.floor( rand * difference);
	rand += min;
	return rand;
}

function findDistance(missleX, missleY, enemyX, enemyY) {
	let y = missleY - enemyY
	let x = missleX - enemyX

	const distance = Math.sqrt((x * x) + (y * y))
	return distance
}

const findDiff = (missleP, enemyP, distance) => (enemyP - missleP) / distance

const keys = []

const moveLeft = () => playerPos.x -= newPlayer.ms
const moveRight = () => playerPos.x += newPlayer.ms
const moveUp = () => playerPos.y -= newPlayer.ms
const moveDown = () => playerPos.y += newPlayer.ms

document.addEventListener("keydown", (event)=>{
	music.play()
	if (event.key === 'a' && !keys.includes(event.key)) {
		keys.push(event.key)
		isPlayerLeft = true
	} else   if (event.key === 'd' && !keys.includes(event.key)) {
		keys.push(event.key)
		isPlayerLeft = false
	} else if (event.key === 'w' && !keys.includes(event.key)) {
		keys.push(event.key)
	} else if (event.key=== 's' && !keys.includes(event.key)) {
		keys.push(event.key)
	}
})


document.addEventListener('keyup', (event) => {
	keys.splice(keys.indexOf(event.key), 1)
});

const playerPos = {
	x: canvas.width / 2,
	y: canvas.height / 2
}

const missles = []
let missleDelay = 0
let enemyDelay = 0

const enemies = []

let isPlayerLeft = false
let playerSpriteDelay = 0
let isPlayerInvincible = false
let isPlayerInvincibleTimer = 0
let isPlayerInvincibleConst = 100

let enemySpriteDelay = 0

//time

let kills = 0
let killsForLevelUp = 2 * newPlayer.level
let isChoosingUpgrade = false


function resetGenerated() {
	for (let i = 0; i < 3; i++) {
		document.getElementsByClassName("upgradeSelect")[0].removeChild(document.getElementsByClassName("upgradeSelect")[0].lastChild)
	}
	isChoosingUpgrade = false
	newPlayer.skillpoints -= 1
}

let isPlaying = true

function gameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)


	console.log(tenAllCounter)
	ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)

	drawLevelBar()
	drawHealthBar(playerPos.x, playerPos.y - 10, 50, 8 ,newPlayer.health, newPlayer.maxHealth)

	if (newPlayer.tenAllNumber > 0 && tenAllDelay) {
		ctx.drawImage(tenAll, -300, -300, canvas.width * 2, canvas.height * 2)
		tenAllCounter += 1
		if (tenAllCounter === 100) {
			tenAllCounter = 0
			tenAllDelay = false
		}
	}

	ctx.fillStyle = "red";
	ctx.textAlign = "center";
	ctx.font = "50px Galmuri7";
	if (seconds < 10) {
		ctx.fillText(`${minutes}:0${seconds}`, canvas.width /2 , 50);
	} else  {
		ctx.fillText(`${minutes}:${seconds}`, canvas.width /2 , 50);
	}

	//spawn player
	if (playerPos.x > canvas.width - 50) {
		playerPos.x = canvas.width - 50
	} else if (playerPos.x < 0) {
		playerPos.x = 0
	} else if (playerPos.y > canvas.height - 50) {
		playerPos.y = canvas.height - 50
	} else if (playerPos.y < 0) {
		playerPos.y = 0
	}

	if (isPlayerLeft) {
		ctx.drawImage(moveLeftImage, playerPos.x, playerPos.y, 50, 60)
	} else {
		ctx.drawImage(moveRightImage, playerPos.x, playerPos.y, 50, 60)
	}

	//move player
	keys.forEach((key) => {
		if (key === 'a') moveLeft();
		if (key === 'd') moveRight();
		if (key === 'w') moveUp();
		if (key === 's') moveDown();
	});

	//spawn missle
	if (missleDelay === 0) {
		if (enemies.length > 0) {
			let closestEnemyDistance = 1000000
			let enemyX = null
			let enemyY = null
			enemies.map((enemy) => {
				let distance = findDistance(playerPos.x, playerPos.y, enemy.x + 15, enemy.y + 15)
				if (distance < closestEnemyDistance) {
					closestEnemyDistance = distance
					enemyX = enemy.x + 15
					enemyY = enemy.y + 15
				}
			})

			let xDiff = findDiff(playerPos.x, enemyX, closestEnemyDistance)
			let yDiff = findDiff(playerPos.y, enemyY, closestEnemyDistance)

			missles.push({x:playerPos.x, y:playerPos.y, xDiff: xDiff, yDiff: yDiff})
			let fire = new Audio;
			fire.src = 'sounds/missle.mp3'
			fire.volume = 0.1
			fire.play()
		}

	}

	//move missles
	missles.map((missle, i) => {
		missle.x += missle.xDiff * 10
		missle.y += missle.yDiff * 10
		ctx.drawImage(missileImage, missle.x, missle.y, 35, 35);
		if (missle.x > canvas.width || missle.x < 0 || missle.y > canvas.height || missle.y < 0) {
			missles.splice(i, 1)
		}
	})

	//check for collision
	missles.map((missle, missleI) => {
		enemies.map((enemy, enemyI) => {
			if (findDistance(missle.x, missle.y, enemy.x + 15, enemy.y + 15) < 25) {
				if (!newPlayer.gameplayUpgrades.includes("piercingShots")) {
					missles.splice(missleI,1)
				}
				enemy.health -= newPlayer.attack
				if (enemy.health <= 0) {
					kills += 1
					enemies.splice(enemyI,1)
				}
			}
		})
	})

	//move enemies

	enemies.map((enemy) => {
		let distance = findDistance(enemy.x, enemy.y, playerPos.x + 25, playerPos.y + 25)
		let xEnemyDiff = findDiff(enemy.x , playerPos.x + 15, distance)
		let yEnemyDiff = findDiff(enemy.y, playerPos.y + 25, distance)
		enemy.x += xEnemyDiff * 2
		enemy.y += yEnemyDiff * 2

		if (findDistance(playerPos.x + 25, playerPos.y + 25, enemy.x, enemy.y) < 25) {
			playerPos.x += randomPushback() + 1
			playerPos.y += randomPushback() + 1
			if (!isPlayerInvincible) {
				newPlayer.health -= 1
				isPlayerInvincible = true
			}
		}

		if (newPlayer.health === 0) {
			isPlaying = false
			document.getElementsByClassName("gameCanvas")[0].style.display = "none"
			document.getElementsByClassName("gameInfo")[0].style.display = "none"
			document.getElementsByClassName("endScreenDefeat")[0].style.display = "flex"

		}


		enemies.map((enemy) => {
			drawHealthBar(enemy.x, enemy.y - 10,50, 5, enemy.health, enemy.maxHealth)
			if (enemy.x > playerPos.x + 25) {
				ctx.drawImage(enemyLeft, enemy.x, enemy.y, 50, 50)
			} else (
				ctx.drawImage(enemyRight, enemy.x, enemy.y, 50, 50)
			)
		})
	})

	missleDelay += 1
	if (missleDelay > newPlayer.fireRate) {
		missleDelay = 0
	}

	if (enemyDelay === 0 && enemies.length < 70) {
		if (minutes === 2) {
			enemies.push(new Enemy(generateRandom(), generateRandom(), 30))
		} else if (minutes === 1) {
			enemies.push(new Enemy(generateRandom(), generateRandom(), 50))
		}else  if (minutes === 0) {
			enemies.push(new Enemy(generateRandom(), generateRandom(), 65))
		}

	}

	enemyDelay += 1
	if (enemyDelay > minutes * 25 + 15) {
		enemyDelay = 0
	}

	playerSpriteDelay += 1
	if (playerSpriteDelay === 41) {
		playerSpriteDelay = 0
	}

	enemies.map((enemy)=>{
		enemy.spriteDelay += 1
		if (enemy.spriteDelay === 11) {
			enemy.spriteDelay = 0
		}
	})

	if (isPlayerInvincible) {
		isPlayerInvincibleTimer += 1
		if (isPlayerInvincibleTimer === isPlayerInvincibleConst) {
			isPlayerInvincibleTimer = 0
			isPlayerInvincible = false
		}
	}

	if (kills >= killsForLevelUp) {
		kills = 0
		newPlayer.level += 1
		killsForLevelUp = 2 * newPlayer.level
		newPlayer.skillpoints += 1
	}

	if (newPlayer.skillpoints > 0 && isChoosingUpgrade === false) {
		isChoosingUpgrade = true
		for (let i = 0; i < 3; i++) {
			const generatedSkill = generateRandomSkill()
			const skillName = newPlayer.availableUpgrades[generatedSkill].name
			const skillFunc = newPlayer.availableUpgrades[generatedSkill].function
			const icon = newPlayer.availableUpgrades[generatedSkill].icon
			const skill = document.createElement("h1")
			skill.style.textAlign = 'center'
			skill.style.padding = '5%'
			skill.style.margin = "5px"
			skill.style.border = '5px solid white'

			const span = document.createElement("span")
			span.style.backgroundImage = `url(${icon})`
			span.style.backgroundSize = 'cover'
			span.style.width = '50px'
			span.style.height = '50px'
			span.style.displa = 'inline-block'
			skill.appendChild(span)
			skill.appendChild(document.createTextNode(skillName))

			skill.onclick = skillFunc
			document.getElementsByClassName("upgradeSelect")[0].appendChild(skill)
		}
	}

	if (minutes === 0 && seconds === 0 ) {
		isPlaying = false
		document.getElementsByClassName("gameCanvas")[0].style.display = "none"
		document.getElementsByClassName("gameInfo")[0].style.display = "none"
		document.getElementsByClassName("endScreenVictory")[0].style.display = "flex"
	}



	if (isPlaying) {
		window.requestAnimationFrame(gameLoop)
	}
}


