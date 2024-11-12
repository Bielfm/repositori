document.addEventListener("DOMContentLoaded", () => {
    fetch('https://raw.githubusercontent.com/bielfm/repositori/main/data.xml')
        .then(response => response.text())
        .then(data => parseXML(data))
        .catch(error => console.error("Error carregant el XML:", error));
});

function parseXML(data) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "application/xml");
    const cartaContainer = document.getElementById("carta");

    const grups = xmlDoc.getElementsByTagName("GRUP");

    Array.from(grups).forEach(grup => {
        const grupDiv = document.createElement("div");
        grupDiv.classList.add("grup");

        const grupName = grup.getElementsByTagName("NOM")[0].textContent;
        const grupTitle = document.createElement("h2");
        grupTitle.textContent = grupName;
        grupDiv.appendChild(grupTitle);

        const plats = grup.getElementsByTagName("PLAT");
        Array.from(plats).forEach(plat => {
            const platDiv = document.createElement("div");
            platDiv.classList.add("plat");

            const platName = plat.getElementsByTagName("NOM")[0].textContent;
            const platDesc = plat.getElementsByTagName("DESCRIPCIO")[0].textContent;
            const platPreu = plat.getElementsByTagName("PREU")[0].textContent;

            const platTitle = document.createElement("h3");
            platTitle.textContent = platName;
            platDiv.appendChild(platTitle);

            const platDescription = document.createElement("p");
            platDescription.textContent = platDesc;
            platDiv.appendChild(platDescription);

            const platPrice = document.createElement("p");
            platPrice.classList.add("preu");
            platPrice.textContent = `Preu: ${platPreu} €`;
            platDiv.appendChild(platPrice);

            grupDiv.appendChild(platDiv);
        });

        cartaContainer.appendChild(grupDiv);
    });
}
