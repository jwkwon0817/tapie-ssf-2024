function generateImage(src) {
	const img = new Image();
	img.src = src;
	return img
}

function drawHealthBar(x, y, width, height, health, maxHealth) {
	const barWidth = width;
	const barHeight = height;
	const fillWidth = (health / maxHealth) * barWidth;

	ctx.fillStyle = "gray";
	ctx.fillRect(x, y, barWidth, barHeight);

	ctx.fillStyle = "red";
	ctx.fillRect(x, y, fillWidth, barHeight);

	ctx.strokeStyle = "black";
	ctx.strokeRect(x, y, barWidth, barHeight);
}

function drawLevelBar() {
	const barWidth = 200;
	const barHeight = 20;
	const barX = (canvas.width - barWidth) / 2; // X position (centered)
	const barY = 60;

	const fillWidth = (kills / killsForLevelUp) * barWidth;

	ctx.fillStyle = "gray";
	ctx.fillRect(barX, barY, barWidth, barHeight);

	ctx.fillStyle = "green";
	ctx.fillRect(barX, barY, fillWidth, barHeight);

	ctx.strokeStyle = "black";
	ctx.strokeRect(barX, barY, barWidth, barHeight);

	ctx.fillStyle = "white";
	ctx.font = "15px Galmuri14";
	ctx.textAlign = "center";
	ctx.fillText(`레벨: ${newPlayer.level}`, barX + barWidth / 2, barY + barHeight - 5);
}
