document.addEventListener("DOMContentLoaded", () => {
    const verbSelect = document.getElementById("verb-select");
    const display = document.getElementById("conjugation-display");

    async function fetchVerbs() {
        try {
            const response = await fetch("data.json");
            return await response.json();
        } catch (error) {
            console.error("Error fetching verb data.", error);
            return {};
        }
    }

    fetchVerbs().then((verbData) => {

        Object.keys(verbData).forEach((verb) => {
            let option = document.createElement("option");
            option.value = verb;
            option.textContent = verb;
            verbSelect.appendChild(option);
        });

        verbSelect.addEventListener("change", async () => {
            const selectedVerb = verbSelect.value;
            display.innerHTML = "";

            if (selectedVerb) {
                const verbDetails = verbData[selectedVerb];

                for (const tense in verbDetails) {
                    let tenseDiv = document.createElement("div");
                    tenseDiv.innerHTML = `<h3>${tense}</h3><p>${verbDetails[tense].join(", ")}</p>`;
                    display.appendChild(tenseDiv);
                }
            }
        });
    });
});