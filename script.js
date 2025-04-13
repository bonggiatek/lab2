window.onload = function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "attractions.xml", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var xmlDoc = xhr.responseXML;
            var attractions = xmlDoc.getElementsByTagName("Attraction");
            var output = "";
            var currentIndex = 0;
            var attractionsPerPage = 1;
            var filteredAttractions = [];

            function displayAttractions(attractionsToDisplay) {
                output = "";
                for (var i = 0; i < attractionsToDisplay.length; i++) {
                    var placeId = attractionsToDisplay[i].getElementsByTagName("PlaceID")[0].childNodes[0].nodeValue;
                    var name = attractionsToDisplay[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue;
                    var city = attractionsToDisplay[i].getElementsByTagName("City")[0].childNodes[0].nodeValue;
                    var state = attractionsToDisplay[i].getElementsByTagName("State")[0].childNodes[0].nodeValue;
                    var description = attractionsToDisplay[i].getElementsByTagName("Description")[0].childNodes[0].nodeValue;
                    var openingHours = attractionsToDisplay[i].getElementsByTagName("OpeningHours")[0].childNodes[0].nodeValue;
                    var category = attractionsToDisplay[i].getElementsByTagName("Category")[0].childNodes[0].nodeValue;
                    var ticket = attractionsToDisplay[i].getElementsByTagName("Ticket")[0].childNodes[0].nodeValue;
                    var price = attractionsToDisplay[i].getElementsByTagName("Price")[0].childNodes[0].nodeValue;
                    var image = attractionsToDisplay[i].getElementsByTagName("Image")[0].childNodes[0].nodeValue;

                    output += "<div class='attraction'>" +
                        "<div class='attraction-name'>Name: " + name + " (PlaceID: " + placeId + ")</div>" +
                        "<div class='attraction-city'>City: " + city + "</div>" +
                        "<div class='attraction-state'>State: " + state + "</div>" +
                        "<div class='attraction-description'>Description: " + description + "</div>" +
                        "<div class='attraction-openingHours'>Opening Hours: " + openingHours + "</div>" +
                        "<div class='attraction-category'>Category: " + category + "</div>" +
                        "<div class='attraction-ticket'>Ticket: " + ticket + "</div>" +
                        "<div class='attraction-price'>Price: " + price + "</div>" +
                        "<div class='attraction-image'>Image: " + image + "</div>" +
                        "</div>";
                }
                document.getElementById("attractionList").innerHTML = output;
            }

            function filterAttractions(filterType, filterValue) {
                filteredAttractions = Array.from(attractions).filter(function(attraction) {
                    var value = attraction.getElementsByTagName(filterType)[0].childNodes[0].nodeValue;
                    return value === filterValue;
                });
                currentIndex = 0;
                displayAttractions(filteredAttractions.slice(currentIndex, currentIndex + attractionsPerPage));
            }

            function showAllAttractions() {
                filteredAttractions = Array.from(attractions);
                currentIndex = 0;
                displayAttractions(filteredAttractions.slice(currentIndex, currentIndex + attractionsPerPage));
            }

            function updateNavigationButtons() {
                var prevButton = document.getElementById("prev");
                var nextButton = document.getElementById("next");

                prevButton.disabled = currentIndex === 0;
                nextButton.disabled = currentIndex + attractionsPerPage >= filteredAttractions.length;
            }

            document.getElementById("prev").addEventListener("click", function() {
                currentIndex -= attractionsPerPage;
                displayAttractions(filteredAttractions.slice(currentIndex, currentIndex + attractionsPerPage));
                updateNavigationButtons();
            });

            document.getElementById("next").addEventListener("click", function() {
                currentIndex += attractionsPerPage;
                displayAttractions(filteredAttractions.slice(currentIndex, currentIndex + attractionsPerPage));
                updateNavigationButtons();
            });

            // Initial display and navigation setup
            showAllAttractions();
            updateNavigationButtons();

            // Example of filtering by state (you can add more filter buttons)
            //filterAttractions("State", "Selangor"); // Example filter.

        }
    };
    xhr.send();
};
