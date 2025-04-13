window.onload = function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "attractions.xml", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var xmlDoc = xhr.responseXML;
            var attractions = xmlDoc.getElementsByTagName("Attraction");
            var output = "";

            // Iterate through all attractions and display them
            Array.from(attractions).forEach(function(attraction) {
                var name = attraction.getElementsByTagName("Name")[0].childNodes[0].nodeValue;
                var city = attraction.getElementsByTagName("City")[0].childNodes[0].nodeValue;
                var state = attraction.getElementsByTagName("State")[0].childNodes[0].nodeValue;
                var description = attraction.getElementsByTagName("Description")[0].childNodes[0].nodeValue;
                var openingHours = attraction.getElementsByTagName("OpeningHours")[0].childNodes[0].nodeValue;
                var category = attraction.getElementsByTagName("Category")[0].childNodes[0].nodeValue;
                var ticket = attraction.getElementsByTagName("Ticket")[0].childNodes[0].nodeValue;
                var price = attraction.getElementsByTagName("Price")[0].childNodes[0].nodeValue;
                var image = attraction.getElementsByTagName("Image")[0].childNodes[0].nodeValue;

                output += `
                    <div class='attraction-item'>
                        <h2>${name} (PlaceID: ${attraction.getElementsByTagName("PlaceID")[0].childNodes[0].nodeValue})</h2>
                        <p><strong>City:</strong> ${city}</p>
                        <p><strong>State:</strong> ${state}</p>
                        <p><strong>Description:</strong> ${description}</p>
                        <p><strong>Opening Hours:</strong> ${openingHours}</p>
                        <p><strong>Category:</strong> ${category}</p>
                        <p><strong>Ticket:</strong> ${ticket}</p>
                        <p><strong>Price:</strong> ${price}</p>
                        <div class='attraction-image'>
                            <img src='${image}' alt='${name}' style='max-width: 200px; max-height: 150px;'>
                        </div>
                    </div>`;
            });

            // Inject the HTML into the attractionList div
            document.getElementById("attractionList").innerHTML = output;
        }
    };
    xhr.send();
};
