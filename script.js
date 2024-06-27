let score = 0;
let level = 1;
let timeLeft = 30;
let interval;
let sequence = [];
let userSequence = [];

const scoreSpan = document.getElementById('score');
const levelSpan = document.getElementById('level');
const timeLeftSpan = document.getElementById('time-left');
const boxesContainer = document.getElementById('boxes-container');

function createBoxes() {
    boxesContainer.innerHTML = '';
    sequence = [];
    userSequence = [];
    const container = document.getElementById('game-container');
    for (let i = 0; i < level; i++) {
        const box = document.createElement('div');
        box.className = 'box';
        let randomX, randomY;
        let overlap;
        do {
            overlap = false;
            const maxX = container.clientWidth - 50; // 50 is the width/height of the box
            const maxY = container.clientHeight - 50;
            randomX = Math.floor(Math.random() * maxX);
            randomY = Math.floor(Math.random() * maxY);
            
            // Check for overlap
            const boxes = document.querySelectorAll('.box');
            boxes.forEach(existingBox => {
                const exX = parseInt(existingBox.style.left, 10);
                const exY = parseInt(existingBox.style.top, 10);
                if (Math.abs(randomX - exX) < 50 && Math.abs(randomY - exY) < 50) {
                    overlap = true;
                }
            });
        } while (overlap);

        box.style.left = `${randomX}px`;
        box.style.top = `${randomY}px`;
        box.textContent = i + 1;
        box.addEventListener('click', () => handleBoxClick(i + 1));
        boxesContainer.appendChild(box);
        sequence.push(i + 1);
    }
    showBoxes();
}

function showBoxes() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => box.style.display = 'flex');
}

function handleBoxClick(num) {
    userSequence.push(num);
    if (userSequence.length === sequence.length) {
        if (JSON.stringify(userSequence) === JSON.stringify(sequence)) {
            score += level;
            scoreSpan.textContent = score;
            levelUp();
        } else {
            alert('Incorrect sequence! Game over.');
            clearInterval(interval);
        }
    }
}

function levelUp() {
    level++;
    levelSpan.textContent = level;
    timeLeft += 10; // Give extra time for each level
    createBoxes();
}

function startGame() {
    interval = setInterval(() => {
        timeLeft--;
        timeLeftSpan.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(interval);
            alert(`Game Over! Your score is ${score}`);
        }
    }, 1000);
    createBoxes();
}

startGame();
