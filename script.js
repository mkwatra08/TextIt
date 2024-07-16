const token = "";
const sentenceElement = document.getElementById("sentence");
const image = document.getElementById("resultImage");
const button = document.getElementById("generateBtn");
const options = document.querySelectorAll(".option");

options.forEach(option => {
    option.addEventListener('click', () => {
        sentenceElement.textContent += ' ' + option.dataset.word;
        option.classList.add('selected');
    });
});

async function query() {
    image.src = "/loading.gif";
    const response = await fetch(
        "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ "inputs": sentenceElement.textContent.trim() }),
        }
    );
    const result = await response.blob();
    return result;
}

button.addEventListener('click', async function () {
    if (sentenceElement.textContent.trim() === 'A photo of a') {
        alert('Please complete the sentence.');
        return;
    }
    query().then((response) => {
        const objectURL = URL.createObjectURL(response);
        image.src = objectURL;
    });
});
