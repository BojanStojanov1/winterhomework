document.getElementById("numberInput").addEventListener("input", function () {
    const input = this.value.trim();
    const output = document.getElementById("wordOutput");
    const error = document.getElementById("error");
  
    if (input === "") {
      output.value = "";
      error.textContent = "";
      return;
    }
  
    if (!/^\d+$/.test(input)) {
      output.value = "";
      error.textContent = "Please enter a valid number (0-1,000,000).";
      return;
    }
  
    const number = parseInt(input, 10);
    if (number < 0 || number > 1000000) {
      output.value = "";
      error.textContent = "Number out of range. Please enter a number between 0 and 1,000,000.";
      return;
    }
  
    error.textContent = "";
    output.value = numberToWords(number);
  });
  
  function numberToWords(num) {
    if (num === 0) return "zero";
    if (num === 1000000) return "one million";
  
    const belowTwenty = [
      "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
      "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
    ];
    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  
    function convertToWords(n) {
      if (n < 20) return belowTwenty[n];
      if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? "-" + belowTwenty[n % 10] : "");
      if (n < 1000) return belowTwenty[Math.floor(n / 100)] + " hundred" + (n % 100 ? " " + convertToWords(n % 100) : "");
      if (n < 1000000) {
        return convertToWords(Math.floor(n / 1000)) + " thousand" + (n % 1000 ? " " + convertToWords(n % 1000) : "");
      }
      return "";
    }
  
    return convertToWords(num).trim();
  }
  