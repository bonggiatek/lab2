// script.js
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
            var filteredAttractions = Array.from(attractions); // Initialize with all attractions

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
                        "<div class='attraction-image'><img src='" + image + "' alt='" + name + "'></div>" +
                        "</div>";
                }
                document.getElementById("attractionList").innerHTML = output;
            }

            function filterAttractions(filterType, filterValue) {
                filteredAttractions = Array.from(attractions).filter(function(attraction) {
                    var value = attraction.getElementsByTagName(filterType)[0].childNodes[0].nodeValue;
                    return value.toLowerCase() === filterValue.toLowerCase(); // Case-insensitive filter
                });
                currentIndex = 0;
                displayAttractions(filteredAttractions.slice(currentIndex, currentIndex + attractionsPerPage));
            }

            function showAllAttractions() {
                filteredAttractions = Array.from(attractions);
                currentIndex = 0;
                displayAttractions(filteredAttractions.slice(currentIndex, currentIndex + attractionsPerPage));
            }

            function showOneAttraction(placeID) {
                let attraction = filteredAttractions.find(attraction => attraction.getElementsByTagName("PlaceID")[0].childNodes[0].nodeValue == placeID);
                if (attraction) {
                    displayAttractions([attraction]);
                } else {
                    document.getElementById("attractionList").innerHTML = "Attraction not found";
                }
            }

            function updateRecordCount() {
                document.getElementById("recordCount").innerHTML = (currentIndex + 1) + " to " + Math.min(currentIndex + attractionsPerPage, filteredAttractions.length) + " of " + filteredAttractions.length;
            }

            function updateNavigationButtons() {
                var prevButton = document.getElementById("prev");
                var nextButton = document.getElementById("next");

                prevButton.disabled = currentIndex === 0;
                nextButton.disabled = currentIndex + attractionsPerPage >= filteredAttractions.length;
                updateRecordCount();
            }

            // Event Listeners
            document.getElementById("filterButton").addEventListener("click", function() {
                var filterType = document.getElementById("filterType").value;
                var filterValue = document.getElementById("filterValue").value;
                filterAttractions(filterType, filterValue);
                updateNavigationButtons();
            });

            document.getElementById("showAllButton").addEventListener("click", function() {
                showAllAttractions();
                updateNavigationButtons();
            });

            document.getElementById("showOneButton").addEventListener("click", function() {
                let placeID = document.getElementById("placeIDValue").value;
                showOneAttraction(placeID);
            });

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

            // Theme Toggle Functionality
            const themeToggle = document.getElementById("themeToggle");
            const body = document.body;

            themeToggle.addEventListener("click", () => {
                body.classList.toggle("dark-theme");
                body.classList.toggle("light-theme");
            });

            // Initial display and navigation setup
            showAllAttractions();
            updateNavigationButtons();

        }
    };
    xhr.send();
};
