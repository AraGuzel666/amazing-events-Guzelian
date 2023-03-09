import { events, currentDate } from './events.js';

export const containerCards = document.querySelector('.container-cards');
export const containerCardsPast = document.querySelector('.container-cards-past');
export const containerCardsUpcoming = document.querySelector('.container-cards-upcoming');
const searchInput = document.querySelector('#search-input');

const categoryContainer = document.querySelector('#category-container');

export const renderCards = (array, mode, container) => {
    if (mode === "soon") {
        for (const data of array) {
            const card = document.createElement('div')
            card.classList.add('card')
            card.innerHTML = `
            <img src=${data.image} alt="">
            <h2>${data.name}</h2>
            <span class="hide">${data.category}</span>
            <p class="description">${data.description}</p>
            <div class="extra">
                <p>
                    <i class="fa-sharp fa-solid fa-tag"></i>
                    Precio $ ${data.price}
                </p>
                <a href="./details.html">Ver más</a>
            </div>`
            container.appendChild(card)
        }
    } else if (mode === "past") {
        for (const data of array) {
            const card = document.createElement('div')
            card.classList.add('card')
            card.classList.add('past')
            card.innerHTML = `
            <img src=${data.image} alt="">
            <h2>${data.name}</h2>
            <span class="hide">${data.category}</span>
            <h3>Event Finished</h3>
            <p class="description">${data.description}</p>
            <div class="extra">
                <p>
                    <i class="fa-sharp fa-solid fa-tag"></i>
                    Precio $ ${data.price}
                </p>
                <a href="./details.html">Ver más</a>
            </div>`
            container.appendChild(card)
        }
    }
}
export const renderCategories = (arrCategories) => {
    arrCategories.forEach((cat) => {
        const checkboxes = `
            <label for="${cat}">
                <input class="check check-past check-upcoming" type="checkbox" name="category" id="${cat}">
                ${cat}
            </label>`
        categoryContainer.innerHTML += checkboxes;
    });
}
export const checkDate = (currentDate, comparedDate) => {
    const current = new Date(currentDate);
    const compared = new Date(comparedDate);

    return current <= compared
}

export const noRepeatedCategories =
    events
        .map(cat => {
            return cat.category;
        }).filter((elem, index, arr) => {
            return arr.indexOf(elem) === index;
        }).sort();
export const upcomingEvents =
    events
        .filter(e => {
            return checkDate(currentDate, e.date);
        });
export const pastEvents =
    events
        .filter(e => {
            return !checkDate(currentDate, e.date);
        });


let filteredEventsCat = []
document.addEventListener("DOMContentLoaded", () => {
    const categoryCheckboxes = document.querySelectorAll('.check');
    categoryCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            searchInput.value = ""
            const selectedCategories = Array.from(categoryCheckboxes)
                .filter((checkbox) => checkbox.checked)
                .map((checkbox) => checkbox.id);

            const filteredEvents = events.filter((event) => {
                return selectedCategories.includes(event.category);
            });
            const filteredPastEvents = filteredEvents.filter(e => {
                return !checkDate(currentDate, e.date);
            });
            const filteredUpcomingEvents = filteredEvents.filter(e => {
                return checkDate(currentDate, e.date);
            });
            filteredEventsCat = filteredEvents
            if (filteredEvents.length === 0) {
                containerCards.innerHTML = '';
                renderCards(upcomingEvents, 'soon', containerCards);
                renderCards(pastEvents, 'past', containerCards);
            } else {
                containerCards.innerHTML = '';
                renderCards(filteredUpcomingEvents, 'soon', containerCards);
                renderCards(filteredPastEvents, 'past', containerCards);
            }
        });
    });


    searchInput.addEventListener('keyup', () => {

        const searchValue = searchInput.value.toLowerCase();

        const filteredEvents = events.filter(event => {
            const name = event.name.toLowerCase();
            const description = event.description.toLowerCase();
            return (name.includes(searchValue) || description.includes(searchValue));
        });
        const filteredPastCategory = filteredEvents.filter(e => {
            return !checkDate(currentDate, e.date);
        });
        const filteredUpcomingCategory = filteredEvents.filter(e => {
            return checkDate(currentDate, e.date);
        });

        ////////////////////////////////////////////////////////////////////

        const filteredEvents2 = filteredEventsCat.filter(event => {
            const name = event.name.toLowerCase();
            const description = event.description.toLowerCase();
            return (name.includes(searchValue) || description.includes(searchValue));
        });
        const filteredPastEvents = filteredEvents2.filter(e => {
            return !checkDate(currentDate, e.date);
        });
        const filteredUpcomingEvents = filteredEvents2.filter(e => {
            return checkDate(currentDate, e.date);
        });


        if (filteredEvents2.length > 0) {
            containerCards.innerHTML = '';
            renderCards(filteredUpcomingEvents, 'soon', containerCards)
            renderCards(filteredPastEvents, 'past', containerCards)
        }
        else {
            containerCards.innerHTML = '';
            const card = document.createElement('div')
            card.classList.add('card')
            card.innerHTML = `
            <h2>No results Found</h2>
            <img src="assets/img/error.png">
                <a href="./index.html">Home</a>
            </div>`
            containerCards.appendChild(card)
        }
        if (filteredEventsCat.length === 0 && filteredEvents.length > 0) {
            containerCards.innerHTML = '';
            renderCards(filteredUpcomingCategory, 'soon', containerCards)
            renderCards(filteredPastCategory, 'past', containerCards)
        }
    });
})



