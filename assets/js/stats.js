const table = document.querySelector("#table-stats");
const filterArrayCat = (dataArray) => {
  let aECategoriesArray = [];
  dataArray.forEach((event) => {
    if (!aECategoriesArray.includes(event.category)) {
      aECategoriesArray.push(event.category);
    }
  });
  return aECategoriesArray.sort();
};
const orderLowAtt = (a, b) => {
  if (a.percentageOfAtt < b.percentageOfAtt) {
    return -1;
  }
  if (a.percentageOfAtt > b.percentageOfAtt) {
    return 1;
  }
  return 0;
};
const orderHiAtt = (a, b) => {
  if (a.percentageOfAtt > b.percentageOfAtt) {
    return -1;
  }
  if (a.percentageOfAtt < b.percentageOfAtt) {
    return 1;
  }
  return 0;
};
const orderCapacity = (a, b) => {
  if (a.capacity > b.capacity) {
    return -1;
  }
  if (a.capacity < b.capacity) {
    return 1;
  }
  return 0;
};
fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json())
  .then((data) => {
    let categories = filterArrayCat(data.events);
    let pastEvents = data.events.filter(
      (event) => event.date < data.currentDate
    );
    let futureEvents = data.events.filter(
      (event) => event.date >= data.currentDate
    );
    pastEvents.forEach((event) => {
      event.percentageOfAtt = parseFloat(
        ((event.assistance * 100) / event.capacity).toFixed(2)
      );
    });
    futureEvents.forEach((event) => {
      event.percentageEst = parseFloat(
        ((event.estimate * 100) / event.capacity).toFixed(2)
      );
    });
    const eventsOrderHigh = pastEvents.map((event) => event);
    eventsOrderHigh.sort(orderHiAtt);
    const eventsOrderLow = pastEvents.map((event) => event);
    eventsOrderLow.sort(orderLowAtt);
    const eventsOrderCapacity = pastEvents.map((event) => event);
    eventsOrderCapacity.sort(orderCapacity);

    let futureEventsByCat = [];
    for (let cat of categories) {
      let totalRevenues = 0;
      let percentageSum = 0;
      let eventCount = 0;
      let eventObj = {};
      eventObj.category = cat;
      for (let event of futureEvents) {
        if (event.category.toLowerCase() == cat.toLowerCase()) {
          totalRevenues += event.price * event.estimate;
          percentageSum += event.percentageEst;
          eventCount++;
        }
      }
      eventObj.totalRevenues = totalRevenues;
      if (percentageSum != 0) {
        eventObj.mediaPercentage = (percentageSum / eventCount).toFixed(2);
      } else {
        eventObj.mediaPercentage = 0;
      }
      futureEventsByCat.push(eventObj);
    }
    let pastEventsByCat = [];
    for (let cat of categories) {
      let totalRevenues = 0;
      let percentageSum = 0;
      let eventCount = 0;
      let eventObj = {};
      eventObj.category = cat;
      for (let event of pastEvents) {
        if (event.category.toLowerCase() == cat.toLowerCase()) {
          totalRevenues += event.price * event.assistance;
          percentageSum += event.percentageOfAtt;
          eventCount++;
        }
      }
      eventObj.totalRevenues = totalRevenues;
      if (percentageSum != 0) {
        eventObj.mediaPercentage = (percentageSum / eventCount).toFixed(2);
      } else {
        eventObj.mediaPercentage = 0;
      }
      pastEventsByCat.push(eventObj);
    }
    console.log("pastEventsByCat: ", pastEventsByCat);
    let tHead = `<table border="0" cellspacing="0">
        <thead>
            <th colspan="12">
                <h2 class="h2-stats">Event Statistics</h2>
            </th>
        </thead>`;
    let tBodyHeaders1 = `
            <tr class="tr-head">
                <th>Events with the highest percentage of attendance</th>
                <th>Events with the lowest percentage of attendance</th>
                <th>Events with larger capacity</th>
            </tr>`;
    let tInfoTop3 = ``;
    const rowsToRender = 3;
    for (let i = 0; i < rowsToRender; i++) {
      tInfoTop3 += `
            <tr>
            <td> ${eventsOrderHigh[i].name}: ${eventsOrderHigh[i].percentageOfAtt} % </td>
            <td> ${eventsOrderLow[i].name}: ${eventsOrderLow[i].percentageOfAtt} % </td>
            <td> ${eventsOrderCapacity[i].name}: ${eventsOrderCapacity[i].capacity}  </td>
            </tr>`;
    }
    let tBodyHeaders2 = `
            <tr>
                <th colspan="12">
                    <h2 class="h2-stats">Upcoming events statistics by category</h2>
                </th>
            </tr>
            <tr class="tr-head">
                <th>Categories</th>
                <th>Revenues</th>
                <th>Percentage of attendance</th>
            </tr>`;
    let upcomigInfo = ``;
    for (let i = 0; i < futureEventsByCat.length; i++) {
      upcomigInfo += `
            <tr>
                <td> ${futureEventsByCat[i].category} </td>
                <td> $ ${futureEventsByCat[i].totalRevenues}.- </td>
                <td> ${futureEventsByCat[i].mediaPercentage} %</td>
            </tr>`;
    }
    let tBodyHeaders3 = `
            <tr>
                <th colspan="12">
                <h2 class="h2-stats">Past events statistics by category</h2>
                </th>
            </tr>
            <tr class="tr-head">
                <th>Categories</th>
                <th>Revenues</th>
                <th>Percentage of attendance</th>
            </tr>`;
    let pastInfo = ``;
    for (let i = 0; i < pastEventsByCat.length; i++) {
      pastInfo += `
            <tr>
                <td> ${pastEventsByCat[i].category} </td>
                <td> $ ${pastEventsByCat[i].totalRevenues}.- </td>
                <td> ${pastEventsByCat[i].mediaPercentage} %</td>
            </tr>`;
    }
    pastInfo += `
        </tbody>
    </table>
        `;

    table.innerHTML =
      tHead +
      tBodyHeaders1 +
      tInfoTop3 +
      tBodyHeaders2 +
      upcomigInfo +
      tBodyHeaders3 +
      pastInfo;
  })
  .catch((error) => {
    console.log(error);
  });
