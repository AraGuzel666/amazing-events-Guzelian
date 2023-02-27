import { upcomingEvents, pastEvents, renderCards } from "./logic.js";

renderCards(upcomingEvents, "soon");
renderCards(pastEvents, "past");