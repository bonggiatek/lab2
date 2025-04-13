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
             var filteredAttractions = Array.from(attractions);
 
             function displayAttractions(attractionsToDisplay) {
                 output = "";
 @@ -25,45 +25,21 @@
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
                     output += "<div class='attraction-item'>" +
                         "<h2>" + name + " (PlaceID: " + placeId + ")</h2>" +
                         "<p><strong>City:</strong> " + city + "</p>" +
                         "<p><strong>State:</strong> " + state + "</p>" +
                         "<p><strong>Description:</strong> " + description + "</p>" +
                         "<p><strong>Opening Hours:</strong> " + openingHours + "</p>" +
                         "<p><strong>Category:</strong> " + category + "</p>" +
                         "<p><strong>Ticket:</strong> " + ticket + "</p>" +
                         "<p><strong>Price:</strong> " + price + "</p>" +
                         "<div class='attraction-image'><img src='" + image + "' alt='" + name + "' style='max-width: 200px; max-height: 150px;'></div>" +
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
 @@ -77,24 +53,6 @@
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
 @@ -107,20 +65,14 @@
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
 
     function showAllAttractions() {
         currentIndex = 0;
         displayAttractions(filteredAttractions.slice(currentIndex, currentIndex + attractionsPerPage));
     }
 };
