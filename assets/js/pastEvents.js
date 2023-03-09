import { pastEvents, renderCards, noRepeatedCategories, renderCategories, checkDate, containerCardsPast } from "./logic.js";
import { currentDate } from "./events.js";

renderCategories(noRepeatedCategories);
renderCards(pastEvents, "past", containerCardsPast);

const categoryCheckboxes = document.querySelectorAll('.check-past');
categoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        const selectedCategories = Array.from(categoryCheckboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.id);
        const filteredEvents = pastEvents.filter((event) => {
            return selectedCategories.includes(event.category);
        });
        const filteredPastEvents = filteredEvents.filter(e => {
            return !checkDate(currentDate, e.date);
        });
        if (filteredEvents.length === 0) {
            containerCardsPast.innerHTML = '';
            renderCards(pastEvents, 'past', containerCardsPast);
        } else {
            containerCardsPast.innerHTML = '';
            renderCards(filteredPastEvents, 'past', containerCardsPast);
        }
    });
});
