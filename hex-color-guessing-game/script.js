let targetColor;
const hexRange = '0123456789ABCDEF';
let guessCount = 0
let success = false
let score = 0

// Generate a random hex color
const generateRandomColor = () => {
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += hexRange[Math.floor(Math.random() * 16)];
    }
    return color;
};

// Set the target color and display it
const setTargetColor = () => {
    targetColor = generateRandomColor();
    document.getElementById('targetcolorDisplay').style.backgroundColor = targetColor;
};

// Start a new game
const newGame = () => {
    setTargetColor();
    score = 0
    guessCount = 0
    document.getElementById('score').textContent ="";
    document.getElementById('guessSection').textContent = ''
    document.getElementById('resultMessage').textContent = '';
    document.getElementById('colorInput').value = '';
    document.getElementById('guessColorDisplay').style.backgroundColor = '#fff';
    // disable guessing button once game is successfully complete
    const checkButton = document.getElementById("guessButton")
    checkButton.style.backgroundColor = ""
    checkButton.disabled = false
    checkButton.style.cursor = "cursor-pointer"
};

// Check the guessed color against the target color
const guessingColor = () => {
    
    guessCount +=1
    const inputGuess = document.getElementById('colorInput').value.toUpperCase();

    if (inputGuess === "") {
        alert("Please enter a guess color.");
        return;
    }

    if (inputGuess.length !== 6 || !inputGuess.match(/^[0-9A-F]+$/)) {
        alert('Invalid input. Hex codes must be exactly 6 characters long and contain only 0-9 or A-F.');
        return;
    }

    const guess = '#' + inputGuess;
    document.getElementById('guessColorDisplay').style.backgroundColor = guess;
    document.getElementById('colorInput').value = '';

    const hintText = generateHints(guess);
    
    document.getElementById('resultMessage').textContent = "Oops not correct, try again"

     // calculate score 
     score = calScore(guess)


    if (guess === targetColor) {
        success = true
        document.getElementById('score').textContent = `Your score -  ${score}/60`;

        document.getElementById('resultMessage').textContent = `Congratulations! You guessed the correct color! 🥳 in ${guessCount} attempts`;
       
        // disable guessing button once game is successfully complete
        const checkButton = document.getElementById("guessButton")
        checkButton.disabled = true
        checkButton.style.backgroundColor = "gray"
        checkButton.style.cursor = "not-allowed"
       
    }

    
      // end game condition ----
      if(guessCount === 5 ){
        document.getElementById('score').textContent = `Your score -  ${score}/60`;
        document.getElementById('resultMessage').textContent = guess == targetColor ? `Congratulations! You guessed the correct color! 🥳 in ${guessCount} attempts`: "Attempts count exceeded ☹️, Click New Game to retry "
        score=0
        const checkButton = document.getElementById("guessButton")
        checkButton.disabled = true
        checkButton.style.backgroundColor = "gray"
        checkButton.style.cursor = "not-allowed"
    }

    generateGuessItems('guessSection',1, hintText, guess, success); // Parameters: sectionId, itemCount
};

// Generate hints based on the guessed color
const generateHints = (guess) => {
    let hint = "";
   
    for (let i = 1; i < guess.length; i++) {
        const targetChar = targetColor[i]; // Skip the '#' in targetColor
        const guessChar = guess[i];

        if (guessChar === targetChar) {
            hint += '='; // Exact match
        } else {
                const guessValue = parseInt(guessChar, 16);
                const targetValue = parseInt(targetChar, 16);
                hint += (guessValue < targetValue) ? '+' : '-'; // Up or down hint
        }
    }
        
        return hint;
}
   
// Function to dynamically generate guess items
const generateGuessItems = (guessSection, guessCount, hintText, guess) => {
    const guessSection1 = document.getElementById(guessSection)

    for (let i = 0; i < guessCount; i++) {
        // Create a new <div> element for each guess item
        const guessItemDiv = document.createElement('div');
        guessItemDiv.className = ' flex gap-2 py-2'; // Set class for the guess item container


        // Create individual guess items (six in each guess item container)
        for (let j = 0; j < 6; j++) {
            const guessDiv = document.createElement('div');
            guessDiv.className = 'w-14 h-12 py-3 border text-center font-bold rounded-md border gap-2';

            let emoji = ""
            
            if(hintText[j] == "=") {
                emoji = "⏹️"
            } else if (hintText[j] == "+") {
                emoji = "⏫"
            } else {
                emoji = "⏬"
            }

            guessDiv.textContent = guess[j+1]  + emoji

            // Append the guess item <div> to the guessItemDiv container
            guessItemDiv.appendChild(guessDiv);
        }

        // Append the guessItemDiv to the guessSection
        guessSection1.appendChild(guessItemDiv);
    }
};


// calculate score -
const calScore = (guess) => {
    let points = 0;
    let matchedIndices = new Set(); // Set to track indices of matched characters

    // Loop through characters of guess and targetColor starting from index 1 (skipping the '#')
    for (let i = 1; i < guess.length; i++) {
        if (guess[i] === targetColor[i] && !matchedIndices.has(i)) {
            points += 10; // Add 10 points for each unique matching character
            matchedIndices.add(i); // Mark the index as matched
        }
    }

    return points;
};


// Initialize the game
setTargetColor();
