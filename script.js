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
                    var filteredAttractions = Array.from(attractions);

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

                            output += "<div class='attraction-item'>" +
                                "<h2>" + name + " (PlaceID: " + placeId + ")</h2>" +
                                "<p><strong>City:</strong> " + city + "</p>" +
                                "<p><strong>State:</strong> " + state + "</p>" +
                                "<p><strong>Description:</strong> " + description + "</p>" +
                                "<p><strong>Opening Hours:</strong> " + openingHours + "</p>" +
                                "<p><strong>Category:</strong> " + category + "</p>" +
                                "<p><strong>Ticket:</strong> " + ticket + "</p>" +
                                "<p><strong>Price:</strong> " + price + "</p>" +
                                "<div class='attraction-image'><img src='" + image + "' alt='" + name + "'></div>" +
                                "</div>";
                        }
                        document.getElementById("attractionList").innerHTML = output;
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

                    function showAllAttractions() {
                        currentIndex = 0;
                        displayAttractions(filteredAttractions.slice(currentIndex, currentIndex + attractionsPerPage));
                    }

                    // Move these calls inside the onreadystatechange block
                    showAllAttractions();
                    updateNavigationButtons();
                }
            };
            xhr.send();
        };
