import { upcomingEvents, renderCards, noRepeatedCategories, renderCategories, checkDate, containerCardsUpcoming } from "./logic.js";
import { currentDate } from "./events.js";

renderCategories(noRepeatedCategories)
renderCards(upcomingEvents, "soon", containerCardsUpcoming);

const categoryCheckboxes = document.querySelectorAll('.check-upcoming');
categoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        const selectedCategories = Array.from(categoryCheckboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.id);
        const filteredEvents = upcomingEvents.filter((event) => {
            return selectedCategories.includes(event.category);
        });
        const filteredUpcomingEvents = filteredEvents.filter(e => {
            return checkDate(currentDate, e.date);
        });
        if (filteredEvents.length === 0) {
            containerCardsUpcoming.innerHTML = '';
            renderCards(upcomingEvents, 'soon', containerCardsUpcoming);
        } else {
            containerCardsUpcoming.innerHTML = '';
            renderCards(filteredUpcomingEvents, 'soon', containerCardsUpcoming);
        }
    });

});