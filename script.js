let totalCoins = 0;
const coinElement = document.getElementById('coin');
const specialCoinButton = document.getElementById('specialCoin');
const spinButton = document.getElementById('spinButton');
const resultElement = document.getElementById('result');

// Клик по монете
coinElement.addEventListener('click', () => {
    totalCoins += 1;
    updateResult();
});

// Зажатие специальной монеты
specialCoinButton.addEventListener('mousedown', () => {
    const start = Date.now();
    const holdInterval = setInterval(() => {
        if (Date.now() - start >= 60000) {  // 1 минута
            totalCoins += 100;
            updateResult();
            clearInterval(holdInterval);
        }
    }, 100);
    specialCoinButton.addEventListener('mouseup', () => clearInterval(holdInterval));
});

// Рулетка удачи
spinButton.addEventListener('click', () => {
    const rewards = [0, 500, 1000, 2500, 5000, 7500, 10000];
    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
    totalCoins += randomReward;
    updateResult();
});

function updateResult() {
    resultElement.textContent = `Total coins: ${totalCoins}`;
}

// Лидерборд
function loadLeaderboard() {
    fetch('leaderboard.php')  // Запрос на сервер для получения данных лидерборда
        .then(response => response.json())
        .then(data => {
            const leaderboardElement = document.getElementById('leaderboard');
            leaderboardElement.innerHTML = '<h2>Leaderboard</h2>';
            data.forEach(player => {
                leaderboardElement.innerHTML += `<p>${player.name}: ${player.coins} coins</p>`;
            });
        });
}

// Загрузка лидерборда при загрузке страницы
window.onload = loadLeaderboard;
