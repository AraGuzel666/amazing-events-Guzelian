import { pastEvents, renderCards, noRepeatedCategories, renderCategories, checkDate, containerCardsPast } from "./logic.js";
import { currentDate, events } from "./events.js";

renderCategories(noRepeatedCategories);
renderCards(pastEvents, "past", containerCardsPast);


const searchInputPast = document.querySelector('#search-input-past');



let filteredEventsCat = []
const categoryCheckboxes = document.querySelectorAll('.check-past');
categoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        searchInputPast.value = ""
        const selectedCategories = Array.from(categoryCheckboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.id);
        const filteredEvents = pastEvents.filter((event) => {
            return selectedCategories.includes(event.category);
        });
        const filteredPastEvents = filteredEvents.filter(e => {
            return !checkDate(currentDate, e.date);
        });
        filteredEventsCat = filteredEvents
        if (filteredEvents.length === 0) {
            containerCardsPast.innerHTML = '';
            renderCards(pastEvents, 'past', containerCardsPast);
        } else {
            containerCardsPast.innerHTML = '';
            renderCards(filteredPastEvents, 'past', containerCardsPast);
        }
    });
});


searchInputPast.addEventListener('keyup', () => {

    const searchValue = searchInputPast.value.toLowerCase();

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
        containerCardsPast.innerHTML = '';
        renderCards(filteredPastEvents, 'past', containerCardsPast)
    }
    else {
        containerCardsPast.innerHTML = '';
        const error = document.createElement('div')
        error.innerHTML = `
        <h2>No results Found</h2>
        <img src="assets/img/error.png" class="error">
            <p>Sorry, we couldn't find any results for "<span class="text-error">${searchInputPast.value}</span>".</p>
        </div>`
        containerCardsPast.appendChild(error)
    }
    if (filteredEventsCat.length === 0 && filteredEvents.length > 0) {
        containerCardsPast.innerHTML = '';

        renderCards(filteredPastCategory, 'past', containerCardsPast)
    }
});
