let currentPageUrl = 'https://swapi.dev/api/starships/'

window.onload = async () => {
    try {
        await loadShips(currentPageUrl)
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards.');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};

async function loadShips(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; // Limpar os resultados anteriores

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((ship) => {
            const card = document.createElement("div")
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/starships/${ship.url.replace(/\D/g, "")}.jpg')`
            card.className = "ship-cards"

            const shipNameBG = document.createElement("div")
            shipNameBG.className = "name-bg"

            const shipName = document.createElement("span")
            shipName.className = "name"
            shipName.innerText = `${ship.name}`

            shipNameBG.appendChild(shipName)
            card.appendChild(shipNameBG)

            card.onclick = () => {
                const modal = document.getElementById('modal')
                modal.style.visibility = "visible"

                const modalContent = document.getElementById('modal-content')
                modalContent.innerHTML = ``

                const shipImage = document.createElement('div')
                shipImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/starships/${ship.url.replace(/\D/g, "")}.jpg')`
                shipImage.className = "image"

                const name = document.createElement("span")
                name.className = "details"
                name.innerText = `Nome: ${ship.name}`

                const shipSize = document.createElement("span")
                shipSize.className = "details"
                shipSize.innerText = `Tamanho: ${ship.length}m`

                const shipSpeed = document.createElement("span")
                shipSpeed.className = "details"
                shipSpeed.innerText = `velocidade: ${speedCheck(ship.max_atmosphering_speed)}`
                
                const crew = document.createElement("span")
                crew.className = "details"
                crew.innerText = `Tripulacao: ${ship.crew}`

                const passengers = document.createElement("span")
                passengers.className = "details"
                passengers.innerText = `Passageiros: ${passengerCheck(ship.passengers)}`
                
                modalContent.appendChild(shipImage)
                modalContent.appendChild(name)
                modalContent.appendChild(shipSize)
                modalContent.appendChild(shipSpeed)                
                modalContent.appendChild(crew)
                modalContent.appendChild(passengers)



            }

            mainContent.appendChild(card)
        })

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous? "visible" : "hidden"

        nextButton.style.visibility = responseJson.next? "visible" : "hidden"

        currentPageUrl = url

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar os personagens.')
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadShips(responseJson.next)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a proxima pagina.')
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadShips(responseJson.previous)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a pagina anterior.')
    }
}

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

function speedCheck(speed) {
    if (speed === "n/a") {
        return "desconhecida"
    }
    return `${speed} km/h`
}
function passengerCheck(passenger) {
    if (passenger === "n/a") {
        return "desconhecida"
    }
    return passenger
}