// 







// Elements
let Btn = document.querySelector(".check-button");
let try_again = document.querySelector(".try");
let Result = document.querySelector(".result");
let attemptsText = document.querySelector(".Attempts");
let Previous = document.querySelector(".Previous");
let input = document.querySelector("#inp");

// Game variables
let guessNumber = Math.floor(Math.random() * 10) + 1;
let attempts = 10;
let previous = [];

// Initialize display
attemptsText.innerHTML = "Attempts: " + attempts;
Previous.innerHTML = "";

// --- Function to handle a guess ---
function handleGuess() {
  let userGuess = Number(input.value);

  // Input validation
  if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
    Result.innerHTML = "Enter a number between 1 and 10!";
    input.value = "";
    return;
  }

  // Decrease attempts
  attempts--;
  attemptsText.innerHTML = "Attempts: " + attempts;

  // Add to previous guesses if not duplicate
  if (!previous.includes(userGuess)) {
    previous.push(userGuess);
  }
  Previous.innerHTML = "Your Previous Guesses: " + previous.join(", ");

  // Check guess
  if (userGuess === guessNumber) {
    Result.innerHTML = "🎉 Correct!";
    Btn.disabled = true;
    Btn.style.background = "green";
  } else if (userGuess > guessNumber) {
    Result.innerHTML = "Number is Greater";
  } else {
    Result.innerHTML = "Number is Smaller";
  }

  // Check game over
  if (attempts === 0 && userGuess !== guessNumber) {
    Result.innerHTML = "Game Over! Number was " + guessNumber;
    Btn.disabled = true;
    Btn.style.background = "red";
  }

  // Clear input and focus
  input.value = "";
  input.focus();
}

// --- Check Guess Button ---
Btn.addEventListener("click", handleGuess);

// --- Enter key support ---
input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    if (!Btn.disabled) {
      handleGuess();
    } else {
      try_again.click();
    }
  }
});

// --- Try Again Button ---
try_again.addEventListener("click", () => {
  // Reset game variables
  guessNumber = Math.floor(Math.random() * 10) + 1;
  attempts = 10;
  previous = [];

  // Reset display
  attemptsText.innerHTML = "Attempts: " + attempts;
  Previous.innerHTML = "";
  Result.innerHTML = "Result will appear here";

  // Reset button
  Btn.disabled = false;
  Btn.style.background = "orange";

  // Clear and focus input
  input.value = ""; 
  input.focus();
});
