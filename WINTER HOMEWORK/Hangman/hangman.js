const words = {
    films: ["inception", "avatar", "gladiator", "titanic", "matrix"],
    animals: ["elephant", "giraffe", "dolphin", "kangaroo", "panther"],
  };
  
  let chosenCategory, chosenWord, guessedWord, lives;
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const maxLives = 10;
  
  function initGame() {
    lives = maxLives;
    guessedWord = [];
    chosenCategory = getRandomCategory();
    chosenWord = getRandomWord(chosenCategory);
  
    updateCategory();
    renderAlphabet();
    renderWord();
    updateLives();
    clearHint();
    clearCanvas();
  }
  
  function getRandomCategory() {
    const categories = Object.keys(words);
    return categories[Math.floor(Math.random() * categories.length)];
  }
  
  function getRandomWord(category) {
    const wordList = words[category];
    return wordList[Math.floor(Math.random() * wordList.length)];
  }
  
  function renderAlphabet() {
    const alphabetDiv = document.getElementById("alphabet");
    alphabetDiv.innerHTML = "";
    for (const letter of alphabet) {
      const button = document.createElement("button");
      button.textContent = letter;
      button.addEventListener("click", () => handleGuess(letter, button));
      alphabetDiv.appendChild(button);
    }
  }
  
  function handleGuess(letter, button) {
    button.classList.add("disabled");
    button.disabled = true;
  
    if (chosenWord.includes(letter)) {
      updateGuessedWord(letter);
      renderWord();
      if (guessedWord.join("") === chosenWord) {
        alert("You Win!");
      }
    } else {
      lives--;
      updateLives();
      drawHangman(maxLives - lives);
      if (lives <= 0) {
        alert(`Game Over! The word was "${chosenWord}".`);
      }
    }
  }
  

  function updateGuessedWord(letter) {
    for (let i = 0; i < chosenWord.length; i++) {
      if (chosenWord[i] === letter) guessedWord[i] = letter;
    }
  }
  
  
  function renderWord() {
    const wordDiv = document.getElementById("word");
    wordDiv.textContent = chosenWord
      .split("")
      .map((letter) => (guessedWord.includes(letter) ? letter : "_"))
      .join(" ");
  }
  
  
  function updateLives() {
    document.getElementById("remainingLives").textContent = lives;
  }
  
  function updateCategory() {
    document.getElementById("categoryName").textContent = chosenCategory;
  }
  
  function displayHint() {
    const hints = {
      films: "Popular movies",
      animals: "Wild creatures",
    };
    document.getElementById("hintText").textContent = hints[chosenCategory];
  }
  
  
  function clearHint() {
    document.getElementById("hintText").textContent = "";
  }
  
  function clearCanvas() {
    const canvas = document.getElementById("hangmanCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  
  function drawHangman(step) {
    const canvas = document.getElementById("hangmanCanvas");
    const ctx = canvas.getContext("2d");
  
    const parts = [
      () => ctx.fillRect(10, 240, 180, 10), 
      () => ctx.fillRect(90, 10, 10, 230), 
      () => ctx.fillRect(90, 10, 100, 10), 
      () => ctx.fillRect(180, 10, 10, 30), 
      () => ctx.arc(185, 70, 20, 0, Math.PI * 2), 
      () => ctx.fillRect(180, 90, 10, 60), 
      () => ctx.fillRect(160, 100, 20, 10), 
      () => ctx.fillRect(200, 100, 20, 10), 
      () => ctx.fillRect(160, 150, 10, 40), 
      () => ctx.fillRect(200, 150, 10, 40), 
    ];
  
    ctx.beginPath();
    parts[step]();
    ctx.stroke();
  }
  
  document.getElementById("hint").addEventListener("click", displayHint);
  document.getElementById("reset").addEventListener("click", initGame);
  
  
  initGame();
  