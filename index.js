const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const resultText = document.getElementById("resultText");

// Function to handle the API request
const handleGenerate = () => {
  // Disable the "Generate" button
  generateBtn.disabled = true;
  generateBtn.innerText = "Generating...";

  fetch('generate.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'promptInput=' + encodeURIComponent(promptInput.value)
  })
    .then(response => response.text())
    .then(data => {
      resultText.innerText = data;
      // Enable the "Generate" button
      generateBtn.disabled = false;
      generateBtn.innerText = "Generate";
    })
    .catch(error => {
      console.error('Error:', error);
      resultText.innerText = 'Error occurred while generating.';
      // Enable the "Generate" button
      generateBtn.disabled = false;
      generateBtn.innerText = "Generate";
    });
};

// Trigger the API request on Enter key press
promptInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    handleGenerate();
  }
});

// Trigger the API request on "Generate" button click
generateBtn.addEventListener("click", handleGenerate);
