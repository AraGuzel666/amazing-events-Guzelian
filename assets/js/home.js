import { upcomingEvents, pastEvents, renderCards, noRepeatedCategories, renderCategories, containerCards } from "./logic.js";

renderCategories(noRepeatedCategories);
renderCards(upcomingEvents, "soon", containerCards);
renderCards(pastEvents, "past", containerCards);