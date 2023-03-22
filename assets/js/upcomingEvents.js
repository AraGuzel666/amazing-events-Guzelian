import { upcomingEvents, renderCards, noRepeatedCategories, renderCategories, checkDate, containerCardsUpcoming } from "./logic.js";
import { currentDate, events } from "./events.js";

renderCategories(noRepeatedCategories)
renderCards(upcomingEvents, "soon", containerCardsUpcoming);


const searchInputUpcoming = document.querySelector('#search-input-upcoming');

let filteredEventsCat = []
const categoryCheckboxes = document.querySelectorAll('.check-upcoming');
categoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        searchInputUpcoming.value = ""
        const selectedCategories = Array.from(categoryCheckboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.id);
        const filteredEvents = upcomingEvents.filter((event) => {
            return selectedCategories.includes(event.category);
        });
        const filteredUpcomingEvents = filteredEvents.filter(e => {
            return checkDate(currentDate, e.date);
        });
        filteredEventsCat = filteredEvents
        if (filteredEvents.length === 0) {
            containerCardsUpcoming.innerHTML = '';
            renderCards(upcomingEvents, 'soon', containerCardsUpcoming);
        } else {
            containerCardsUpcoming.innerHTML = '';
            renderCards(filteredUpcomingEvents, 'soon', containerCardsUpcoming);
        }
    });

});


searchInputUpcoming.addEventListener('keyup', () => {

    const searchValue = searchInputUpcoming.value.toLowerCase();

    const filteredEvents = events.filter(event => {
        const name = event.name.toLowerCase();
        const description = event.description.toLowerCase();
        return (name.includes(searchValue) || description.includes(searchValue));
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
    const filteredUpcomingEvents = filteredEvents2.filter(e => {
        return checkDate(currentDate, e.date);
    });


    if (filteredEvents2.length > 0) {
        containerCardsUpcoming.innerHTML = '';
        renderCards(filteredUpcomingEvents, 'soon', containerCardsUpcoming)
    }
    else {
        containerCardsUpcoming.innerHTML = '';
        const error = document.createElement('div')
        error.innerHTML = `
        <h2>No results Found</h2>
        <img src="assets/img/error.png" class="error">
            <p>Sorry, we couldn't find any results for "<span class="text-error">${searchInputUpcoming.value}</span>".</p>
        </div>`
        containerCardsUpcoming.appendChild(error)
    }
    if (filteredEventsCat.length === 0 && filteredEvents.length > 0) {
        containerCardsUpcoming.innerHTML = '';

        renderCards(filteredUpcomingCategory, 'soon', containerCardsUpcoming)
    }
});