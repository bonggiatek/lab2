// script.js
alert();
// Hardcoded XML string (replace with your actual XML)
const xmlString = `
<?xml version="1.0" encoding="UTF-8"?>
<TouristAttractions>
    <Attraction>
        <Name>Petronas Twin Towers</Name>
        <City>Kuala Lumpur</City>
        <State>Kuala Lumpur</State>
        <Category>Urban Landmark, Entertainment</Category>
        <Description>Iconic twin skyscrapers with a skybridge and observation deck.</Description>
        <OpeningHours>
            <Day>Monday-Friday</Day>
            <Time>9:00 AM - 9:00 PM</Time>
        </OpeningHours>
        <OpeningHours>
          <Day>Weekend</Day>
          <Time>Closed</Time>
        </OpeningHours>
        <Image>petronas.jpg</Image>
    </Attraction>
    <Attraction>
        <Name>Batu Caves</Name>
        <City>Gombak</City>
        <State>Selangor</State>
        <Category>Religious, Cultural</Category>
        <Description>Limestone hill with temples and Hindu shrines.</Description>
        <OpeningHours>
            <Day>Daily</Day>
            <Time>6:00 AM - 9:00 PM</Time>
        </Opening Hours>
        <Image>batu_caves.jpg</Image>
    </Att{Attraction>
</TouristAttractions>
`; // Example XML

const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
const attractions = xmlDoc.getElementsByTagName('Attraction');
const attractionsDiv = document.getElementById('attractions');
alert(attractions);
for (let i = 0; i < attractions.length; i++) {
    const attraction = attractions[i];
    const name = attraction.getElementsByTagName('Name')[0].textContent;
    const city = attraction.getElementsByTagName('City')[0].textContent;
    const state = attraction.getElementsByTagName('State')[0].textContent;
    const category = attraction.getElementsByTagName('Category')[0].textContent;
    const description = attraction.getElementsByTagName('Description')[0].textContent;
    const image = attraction.getElementsByTagName('Image')[0].textContent;
    const openingHoursElements = attraction.getElementsByTagName('OpeningHours');

    const attractionDiv = document.createElement('div');
    attractionDiv.classList.add('attraction');

    const imageElement = document.createElement('img');
    imageElement.src = image; // Ensure correct image paths
    attractionDiv.appendChild(imageElement);

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('attraction-details');

    detailsDiv.innerHTML = `
        <h2>${name}</h2>
        <p><strong>City:</strong> ${city}, ${state}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Description:</strong> ${description}</p>
    `;

    const openingHoursDiv = document.createElement('div');
    openingHoursDiv.classList.add('opening-hours');

    for(let j=0; j < openingHoursElements.length; j++){
      const day = openingHoursElements[j].getElementsByTagName('Day')[0].textContent;
      const time = openingHoursElements[j].getElementsByTagName('Time')[0].textContent;
      openingHoursDiv.innerHTML += `<p><strong>${day}:</strong> ${time}</p>`;
    }

    detailsDiv.appendChild(openingHoursDiv);
    attractionDiv.appendChild(detailsDiv);
    attractionsDiv.appendChild(attractionDiv);
}