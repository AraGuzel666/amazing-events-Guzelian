import { events, currentDate } from './events.js';

const containerCards = document.querySelector('.container-cards');

export const renderCards = (array, mode) => {
    if (mode === "soon"){
        for (const data of array) {
            const card = document.createElement('div')
            card.classList.add('card')
            card.innerHTML = `
            <img src=${data.image} alt="">
            <h2>${data.name}</h2>
            <p class="description">${data.description}</p>
            <div class="extra">
                <p>
                    <i class="fa-sharp fa-solid fa-tag"></i>
                    Precio $ ${data.price}
                </p>
                <a href="./details.html">Ver más</a>
            </div>`
            containerCards.appendChild(card)
        }
    }else if (mode === "past"){
        for (const data of array) {
            const card = document.createElement('div')
            card.classList.add('card')
            card.classList.add('past')
            card.innerHTML = `
            <img src=${data.image} alt="">
            <h2>${data.name}</h2>
            <h3>Event Finished</h3>
            <p class="description">${data.description}</p>
            <div class="extra">
                <p>
                    <i class="fa-sharp fa-solid fa-tag"></i>
                    Precio $ ${data.price}
                </p>
                <a href="./details.html">Ver más</a>
            </div>`
            containerCards.appendChild(card)
        }
    }
}

const checkDate = (currentDate, comparedDate) => {
    const current = new Date(currentDate);
    const compared = new Date(comparedDate);
    
    return current <= compared
}

export const upcomingEvents = 
    events
        .filter(e => {
            return checkDate(currentDate, e.date);
})


export const pastEvents = 
    events
        .filter(e => {
            return !checkDate(currentDate, e.date);
});





