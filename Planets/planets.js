let currentPageUrl = 'https://swapi.dev/api/planets/'

window.onload = async () => {
    try {
        await loadPlanets(currentPageUrl)
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards.');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};

async function loadPlanets(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; // Limpar os resultados anteriores

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((planet) => {
            const card = document.createElement("div")
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(/\D/g, "")}.jpg')`
            card.className = "cards"

            const planetNameBG = document.createElement("div")
            planetNameBG.className = "planets-name-bg"

            const planetName = document.createElement("span")
            planetName.className = "planets-name"
            planetName.innerText = `${planet.name}`

            planetNameBG.appendChild(planetName)
            card.appendChild(planetNameBG)
        
            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility ="visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''

                const planetsImage = document.createElement("div")
                planetsImage.style.backgroundImage =
                `url('https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(/\D/g, "")}.jpg')`
                planetsImage.className = "image"


                const name = document.createElement("span")
                name.className = "planets-details"
                name.innerText = `Name: ${planet.name}`

                
                const rotation = document.createElement("span")
                rotation.className = "planets-details"
                rotation.innerText = `Rotacao: ${planet.rotation_period}`
            

                
                const climate = document.createElement("span")
                climate.className = "planets-details"
                climate.innerText = `Clima: ${covertClimate(planet.climate)}`
            

                
                const terrain = document.createElement("span")
                terrain.className = "planets-details"
                terrain.innerText = `Terreno: ${covertTerrain(planet.terrain)}`
            

                
                const population = document.createElement("span")
                population.className = "planets-details"
                population.innerText = `Populacao: ${covertPopulation(planet.population)}`

                modalContent.appendChild(planetsImage)
                modalContent.appendChild(name)
                modalContent.appendChild(rotation)
                modalContent.appendChild(climate)
                modalContent.appendChild(terrain)
                modalContent.appendChild(population)


            }
            

            mainContent.appendChild(card)
        });

    const nextButton = document.getElementById('next-button');
    const backButton = document.getElementById('back-button');

    nextButton.disabled = !responseJson.next;
    backButton.disabled = !responseJson.previous;

    nextButton.style.visibility = responseJson.next ? "visible" : "hidden"
    backButton.style.visibility = responseJson.previous? "visible" : "hidden"

        
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

        await loadPlanets(responseJson.next)

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

        await loadPlanets(responseJson.previous)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a pagina anterior.')
    }
}

function hideModal (){
const modal = document.getElementById("modal")
modal.style.visibility = "hidden"
}

function covertPopulation (population){
    const populacao = {
        unknown: "Desconhecida"
    }

    return populacao [population.toLowerCase()]  || population;
};


function covertClimate (climate){
    const clima = {
        unknown: "Desconhecida",
        murky:"Obscuro",
        temperate :"Temperado",
        frozen :"Congelado",
        arid: "Arido"

    }
    return clima [climate.toLowerCase()]  || climate;
}

function covertTerrain (terrain){
    const terreno = {
        unknown: "Desconhecida",
        jungle: "Selvas",
        rainforests:"Floresta tropicais",
        desert: "Deserto",
        grasslands :"Postagens",
        mountains:"Montanhas",
        


    }

    return terreno [terrain.toLowerCase()]  || terrain;
};