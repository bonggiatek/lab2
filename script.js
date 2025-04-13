document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const simpleViewBtn = document.getElementById('simple-view');
    const detailedViewBtn = document.getElementById('detailed-view');
    const groupedViewBtn = document.getElementById('grouped-view');
    const groupControls = document.getElementById('group-controls');
    const groupBySelect = document.getElementById('group-by');
    
    const simpleContainer = document.getElementById('simple-container');
    const detailedContainer = document.getElementById('detailed-container');
    const groupedContainer = document.getElementById('grouped-container');
    
    const simpleAttractions = document.getElementById('simple-attractions');
    const detailedAttractions = document.getElementById('detailed-attractions');
    const groupedAttractions = document.getElementById('grouped-attractions');
    
    // Navigation elements
    const prevSimpleBtn = document.getElementById('prev-simple');
    const nextSimpleBtn = document.getElementById('next-simple');
    const simpleCounter = document.getElementById('simple-counter');
    
    const prevDetailedBtn = document.getElementById('prev-detailed');
    const nextDetailedBtn = document.getElementById('next-detailed');
    const detailedCounter = document.getElementById('detailed-counter');
    
    const prevGroupBtn = document.getElementById('prev-group');
    const nextGroupBtn = document.getElementById('next-group');
    const groupCounter = document.getElementById('group-counter');
	const viewAllBtn = document.getElementById('view-all');   
	
    // Variables
    let attractions = [];
    let currentSimpleIndex = 0;
    let currentDetailedIndex = 0;
    let currentGroupIndex = 0;
    let groupedData = {};
    let currentGroupKeys = [];
	let isViewAllMode = false;    
    // View switching
	function showView(view) {
		isViewAllMode = false;
		viewAllBtn.textContent = 'View All';
		document.body.classList.remove('view-all-mode');
		
		simpleContainer.style.display = 'none';
		detailedContainer.style.display = 'none';
		groupedContainer.style.display = 'none';
		groupControls.style.display = 'none';
		
		if (view === 'simple') {
			simpleContainer.style.display = 'block';
			updateSimpleView();
		} else if (view === 'detailed') {
			detailedContainer.style.display = 'block';
			updateDetailedView();
		} else if (view === 'grouped') {
			groupedContainer.style.display = 'block';
			groupControls.style.display = 'flex';
			groupAttractions();
		}
	}
    
    // Event listeners for view switching
    simpleViewBtn.addEventListener('click', () => showView('simple'));
    detailedViewBtn.addEventListener('click', () => showView('detailed'));
    groupedViewBtn.addEventListener('click', () => showView('grouped'));
	viewAllBtn.addEventListener('click', toggleViewAll)  
    // Event listener for group by selection
    groupBySelect.addEventListener('change', groupAttractions);
    
    // Navigation functions
    function updateSimpleNavigation() {
        simpleCounter.textContent = `${currentSimpleIndex + 1}/${attractions.length}`;
        prevSimpleBtn.disabled = currentSimpleIndex === 0;
        nextSimpleBtn.disabled = currentSimpleIndex === attractions.length - 1;
    }
    
    function updateDetailedNavigation() {
        detailedCounter.textContent = `${currentDetailedIndex + 1}/${attractions.length}`;
        prevDetailedBtn.disabled = currentDetailedIndex === 0;
        nextDetailedBtn.disabled = currentDetailedIndex === attractions.length - 1;
    }
    
    function updateGroupNavigation() {
        groupCounter.textContent = `${currentGroupIndex + 1}/${currentGroupKeys.length}`;
        prevGroupBtn.disabled = currentGroupIndex === 0;
        nextGroupBtn.disabled = currentGroupIndex === currentGroupKeys.length - 1;
    }
    
    // Navigation event listeners
    prevSimpleBtn.addEventListener('click', () => {
        if (currentSimpleIndex > 0) {
            currentSimpleIndex--;
            updateSimpleView();
        }
    });
    
    nextSimpleBtn.addEventListener('click', () => {
        if (currentSimpleIndex < attractions.length - 1) {
            currentSimpleIndex++;
            updateSimpleView();
        }
    });
    
    prevDetailedBtn.addEventListener('click', () => {
        if (currentDetailedIndex > 0) {
            currentDetailedIndex--;
            updateDetailedView();
        }
    });
    
    nextDetailedBtn.addEventListener('click', () => {
        if (currentDetailedIndex < attractions.length - 1) {
            currentDetailedIndex++;
            updateDetailedView();
        }
    });
    
    prevGroupBtn.addEventListener('click', () => {
        if (currentGroupIndex > 0) {
            currentGroupIndex--;
            displayCurrentGroup();
        }
    });
    
    nextGroupBtn.addEventListener('click', () => {
        if (currentGroupIndex < currentGroupKeys.length - 1) {
            currentGroupIndex++;
            displayCurrentGroup();
        }
    });
    
    // Load XML data
    function loadAttractions() {
        fetch('attractions.xml')
            .then(response => response.text())
            .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
            .then(xml => {
                const attractionNodes = xml.querySelectorAll('Attraction');
                attractions = Array.from(attractionNodes).map(attraction => {
                    return {
                        placeId: attraction.querySelector('PlaceID').textContent,
                        name: attraction.querySelector('Name').textContent,
                        city: attraction.querySelector('City').textContent,
                        state: attraction.querySelector('State').textContent,
                        description: attraction.querySelector('Description').textContent,
                        openingHours: attraction.querySelector('OpeningHours').textContent,
                        category: attraction.querySelector('Category').textContent,
                        ticket: attraction.querySelector('Ticket').textContent,
                        price: attraction.querySelector('Price').textContent,
                        image: attraction.querySelector('Image').textContent
                    };
                });
                
                // Initialize views
                showView('simple');
            })
            .catch(error => {
                console.error('Error loading attractions:', error);
                simpleAttractions.innerHTML = '<p>Error loading attractions data. Please try again later.</p>';
            });
    }
    
    // Update views
    function updateSimpleView() {
        simpleAttractions.innerHTML = '';
        const attraction = attractions[currentSimpleIndex];
        
        const card = document.createElement('div');
        card.className = 'attraction-card simple';
        card.innerHTML = `
            <img src="${attraction.image}" alt="${attraction.name}">
            <h3>${attraction.placeId}. ${attraction.name}</h3>
            <p>${attraction.city}, ${attraction.state}</p>
        `;
        
        simpleAttractions.appendChild(card);
        updateSimpleNavigation();
    }
    
    function updateDetailedView() {
        detailedAttractions.innerHTML = '';
        const attraction = attractions[currentDetailedIndex];
        
        const card = document.createElement('div');
        card.className = 'attraction-card';
        card.innerHTML = `
            <img src="${attraction.image}" alt="${attraction.name}">
            <h3>${attraction.placeId}. ${attraction.name}</h3>
            <p><strong>Location:</strong> ${attraction.city}, ${attraction.state}</p>
            <p><strong>Description:</strong> ${attraction.description}</p>
            <p><strong>Opening Hours:</strong> ${attraction.openingHours}</p>
            <p><strong>Category:</strong> ${attraction.category}</p>
            <p><strong>Ticket:</strong> <span class="${attraction.ticket === 'Free' ? 'ticket-free' : ''}">${attraction.ticket}</span></p>
            <p><strong>Price:</strong> <span class="price">${attraction.price === '0' ? 'Free' : 'RM' + attraction.price}</span></p>
        `;
        
        detailedAttractions.appendChild(card);
        updateDetailedNavigation();
    }
    
    function groupAttractions() {
        const groupBy = groupBySelect.value;
        groupedData = {};
        isViewAllMode = false;
		
		viewAllBtn.textContent = 'View All';
        attractions.forEach(attraction => {
            const key = attraction[groupBy];
            if (!groupedData[key]) {
                groupedData[key] = [];
            }
            groupedData[key].push(attraction);
        });
        
        currentGroupKeys = Object.keys(groupedData);
        currentGroupIndex = 0;
        displayCurrentGroup();
    }
    
    function displayCurrentGroup() {
        groupedAttractions.innerHTML = '';
        
        if (currentGroupKeys.length === 0) return;
        
        const currentKey = currentGroupKeys[currentGroupIndex];
        const groupAttractions = groupedData[currentKey];
        
        const groupHeader = document.createElement('div');
        groupHeader.className = 'group';
        groupHeader.innerHTML = `<h3>${groupBySelect.value === 'state' ? 'State' : groupBySelect.value === 'city' ? 'City' : 'Category'}: ${currentKey} (${groupAttractions.length})</h3>`;
        groupedAttractions.appendChild(groupHeader);
        
        const attractionsContainer = document.createElement('div');
        attractionsContainer.className = 'attraction-list';
        
        groupAttractions.forEach(attraction => {
            const card = document.createElement('div');
            card.className = 'attraction-card';
            card.innerHTML = `
                <img src="${attraction.image}" alt="${attraction.name}">
                <h3>${attraction.placeId}. ${attraction.name}</h3>
                <p><strong>Location:</strong> ${attraction.city}, ${attraction.state}</p>
                <p><strong>Category:</strong> ${attraction.category}</p>
                <p><strong>Ticket:</strong> <span class="${attraction.ticket === 'Free' ? 'ticket-free' : ''}">${attraction.ticket}</span></p>
            `;
            attractionsContainer.appendChild(card);
        });
        
        groupedAttractions.appendChild(attractionsContainer);
        updateGroupNavigation();
    }
	function toggleViewAll() {
		isViewAllMode = !isViewAllMode;
		
		if (isViewAllMode) {
			viewAllBtn.textContent = 'Show One';
			document.body.classList.add('view-all-mode');
			displayAllAttractions();
		} else {
			viewAllBtn.textContent = 'View All';
			document.body.classList.remove('view-all-mode');
			// Return to the current view
			if (simpleContainer.style.display !== 'none') {
				updateSimpleView();
			} else if (detailedContainer.style.display !== 'none') {
				updateDetailedView();
			} else {
				displayCurrentGroup();
			}
		}
	}
	function displayAllAttractions() {
		if (simpleContainer.style.display !== 'none') {
			simpleAttractions.innerHTML = '';
			attractions.forEach(attraction => {
				const card = document.createElement('div');
				card.className = 'attraction-card simple';
				card.innerHTML = `
					<img src="${attraction.image}" alt="${attraction.name}">
					<h3>${attraction.placeId}. ${attraction.name}</h3>
					<p>${attraction.city}, ${attraction.state}</p>
				`;
				simpleAttractions.appendChild(card);
			});
		} 
		else if (detailedContainer.style.display !== 'none') {
			detailedAttractions.innerHTML = '';
			attractions.forEach(attraction => {
				const card = document.createElement('div');
				card.className = 'attraction-card';
				card.innerHTML = `
					<img src="${attraction.image}" alt="${attraction.name}">
					<h3>${attraction.placeId}. ${attraction.name}</h3>
					<p><strong>Location:</strong> ${attraction.city}, ${attraction.state}</p>
					<p><strong>Description:</strong> ${attraction.description}</p>
					<p><strong>Opening Hours:</strong> ${attraction.openingHours}</p>
					<p><strong>Category:</strong> ${attraction.category}</p>
					<p><strong>Ticket:</strong> <span class="${attraction.ticket === 'Free' ? 'ticket-free' : ''}">${attraction.ticket}</span></p>
					<p><strong>Price:</strong> <span class="price">${attraction.price === '0' ? 'Free' : 'RM' + attraction.price}</span></p>
				`;
				detailedAttractions.appendChild(card);
			});
		}
		else {
			// For grouped view, show all groups at once
			groupedAttractions.innerHTML = '';
			currentGroupKeys.forEach(key => {
				const groupAttractions = groupedData[key];
				
				const groupHeader = document.createElement('div');
				groupHeader.className = 'group';
				groupHeader.innerHTML = `<h3>${groupBySelect.value === 'state' ? 'State' : groupBySelect.value === 'city' ? 'City' : 'Category'}: ${key} (${groupAttractions.length})</h3>`;
				groupedAttractions.appendChild(groupHeader);
				
				const attractionsContainer = document.createElement('div');
				attractionsContainer.className = 'attraction-list';
				
				groupAttractions.forEach(attraction => {
					const card = document.createElement('div');
					card.className = 'attraction-card';
					card.innerHTML = `
						<img src="${attraction.image}" alt="${attraction.name}">
						<h3>${attraction.placeId}. ${attraction.name}</h3>
						<p><strong>Location:</strong> ${attraction.city}, ${attraction.state}</p>
						<p><strong>Category:</strong> ${attraction.category}</p>
						<p><strong>Ticket:</strong> <span class="${attraction.ticket === 'Free' ? 'ticket-free' : ''}">${attraction.ticket}</span></p>
					`;
					attractionsContainer.appendChild(card);
				});
				
				groupedAttractions.appendChild(attractionsContainer);
			});
		}
	}	

    // Initialize
    loadAttractions();
});
