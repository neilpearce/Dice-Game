// Variables
const doc = document;
let scores, roundScore, activePlayer, gamePlaying;

// Initialise game
init();

// Rolling the dice
doc.querySelector('.btn-roll').addEventListener('click', () => {
	if (gamePlaying) {
		// Create a random number
		let dice = Math.floor(Math.random() * 6) + 1;
		// Display dice
		let diceDOM = doc.querySelector('.dice');

		diceDOM.style.display = 'block';
		diceDOM.src = 'imgs/dice-' + dice + '.png';
		doc.querySelector('#rolled').textContent = 'You rolled a ' + dice;

		// Spin Dice
		diceSpin = diceDOM.classList.add('diceSpin');
		// Removes diceSpin class
		setTimeout(function() {
			diceDOM.classList.remove('diceSpin');
		}, 1000);

		// Update the round score only IF the rolled number was NOT a 1
		if (dice !== 1) {
			// Add score
			roundScore += dice;
			doc.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			//Next Player
			doc.querySelector('#rolled').innerHTML =
				'<span class="unlucky">Unlucky!</span> you rolled a <span class="unlucky">1</span>';
			nextPlayer();
		}
	}
});

// Hold score and change player
doc.querySelector('.btn-hold').addEventListener('click', () => {
	if (gamePlaying) {
		// Add current score to global score for each player
		scores[activePlayer] += roundScore;
		// Update the UI
		doc.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		// Check if player won the game?
		if (scores[activePlayer] >= 50) {
			doc.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			doc.querySelector('.dice').style.display = 'none';
			doc.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			doc.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			doc.querySelector('#rolled').innerHTML = '<span class="unlucky">Next player is up!</span>';
			nextPlayer();
		}
	}
});

// Switch over to the next player
function nextPlayer() {
	activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
	roundScore = 0;

	doc.getElementById('current-0').textContent = 0;
	doc.getElementById('current-1').textContent = 0;

	// Remove and add the active class
	doc.querySelector('.player-0-panel').classList.toggle('active');
	doc.querySelector('.player-1-panel').classList.toggle('active');

	// hides the dice when new player is active
	doc.querySelector('.dice').style.display = 'none';
}

doc.querySelector('.btn-new').addEventListener('click', init);

// Initialize function
function init() {
	scores = [ 0, 0 ];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	doc.querySelector('.dice').style.display = 'none';
	doc.getElementById('score-0').textContent = '0';
	doc.getElementById('score-1').textContent = '0';
	doc.getElementById('current-0').textContent = '0';
	doc.getElementById('current-1').textContent = '0';
	doc.querySelector('#rolled').textContent = '';
	// Get and display player number
	doc.getElementById('name-0').textContent = 'Player 1';
	doc.getElementById('name-1').textContent = 'Player 2';
	// removes the winner or active class
	doc.querySelector('.player-0-panel').classList.remove('winner');
	doc.querySelector('.player-1-panel').classList.remove('winner');
	doc.querySelector('.player-0-panel').classList.remove('active');
	doc.querySelector('.player-0-panel').classList.add('active');
	doc.querySelector('.player-1-panel').classList.remove('active');
}
