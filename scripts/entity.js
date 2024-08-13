class Player {
	constructor() {
		this.level = 1
		this.attack = 20
		this.maxHealth = 5
		this.health = 5
		this.ms = 3
		this.fireRate = 70
		this.skillpoints = 0
		this.gameplayUpgrades = []
		this.tenAllNumber = 0
	}

	availableUpgrades = [
		{
			id: 0,
			name: '공격력 증가 + 5',
			icon: '../images/skills/attack.png',
			function: () => {
				if (!this.gameplayUpgrades.includes("piercingShots")) {
					this.attack += 5
				} else {
					this.attack += 0.5
				}
				resetGenerated()
			}
		},
		{
			id: 1,
			name: '이동속도 증가 + 1',
			icon: '../images/skills/ms.png',
			function: () => {
				this.ms += 1
				resetGenerated()
			}
		},{
			id: 2,
			name: '공격 속도 + 10',
			icon: '../images/skills/fireRate.png',
			function: () => {
				if (this.fireRate > 10) {
					this.fireRate -= 10
				}
				resetGenerated()
			}
		},
		{
			id: 3,
			name: "관통 추가 및 공격력 50% 감소",
			icon: '../images/skills/piercingShots.png',
			function: () => {
				this.gameplayUpgrades.push("piercingShots")
				resetGenerated()
				this.attack *= 0.5
				this.availableUpgrades.splice(3, 1)
			}
		},
		{
			id: 4,
			name:"5초당 모든 적에게 피해",
			icon: '../images/skills/10all_image.png',
			function: () => {
				this.tenAllNumber += 1
				this.gameplayUpgrades.push("10all")
				resetGenerated()
			}
		}

	]
}

class Enemy {
	constructor(x, y, health) {
		if (x < canvas.width / 2) {
			this.x = x - 700
		} else (
			this.x = x + 700
		)
		this.maxHealth = health
		this.health = health
		this.y = y
		this.spriteDelay = enemySpriteDelay
	}
}
