function generateImage(src) {
	const img = new Image();
	img.src = src;
	return img
}

function drawHealthBar(x, y, width, height, health, maxHealth) {
	const barWidth = width;
	const barHeight = height;
	const fillWidth = (health / maxHealth) * barWidth;

	// Draw the background (empty part of the bar)
	ctx.fillStyle = "gray";
	ctx.fillRect(x, y, barWidth, barHeight);

	// Draw the filled part of the bar
	ctx.fillStyle = "red";
	ctx.fillRect(x, y, fillWidth, barHeight);

	// Draw the border of the bar
	ctx.strokeStyle = "black";
	ctx.strokeRect(x, y, barWidth, barHeight);
}

function drawLevelBar() {
	const barWidth = 200; // Total width of the level bar
	const barHeight = 20; // Height of the level bar
	const barX = (canvas.width - barWidth) / 2; // X position (centered)
	const barY = 60; // Y position (below the timer)

	// Calculate the filled width based on the current level progress
	const fillWidth = (kills / killsForLevelUp) * barWidth;

	// Draw the background (empty part of the bar)
	ctx.fillStyle = "gray";
	ctx.fillRect(barX, barY, barWidth, barHeight);

	// Draw the filled part of the bar
	ctx.fillStyle = "green";
	ctx.fillRect(barX, barY, fillWidth, barHeight);

	// Draw the border of the bar
	ctx.strokeStyle = "black";
	ctx.strokeRect(barX, barY, barWidth, barHeight);

	// Draw the level text inside the bar
	ctx.fillStyle = "white";
	ctx.font = "15px Galmuri14";
	ctx.textAlign = "center";
	ctx.fillText(`레벨: ${newPlayer.level}`, barX + barWidth / 2, barY + barHeight - 5);
}
