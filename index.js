const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const resultText = document.getElementById("resultText");

const handleEnterKey = (event) => {
  if (event.key === "Enter") {
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
        generateBtn.disabled = false;
        generateBtn.innerText = "Generate";
      })
      .catch(error => {
        console.error('Error:', error);
        resultText.innerText = 'Error occurred while generating.';
        generateBtn.disabled = false;
        generateBtn.innerText = "Generate";
      });
  }
};

promptInput.addEventListener("keyup", handleEnterKey);
