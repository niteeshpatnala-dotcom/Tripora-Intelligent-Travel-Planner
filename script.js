
// =====================================
// TRIPORA - INTELLIGENT TRAVEL PLANNER
// =====================================

// Generate a travel itinerary

function generateTrip() {

    const destination =
        document.getElementById("destination").value.trim();

    const days =
        parseInt(document.getElementById("days").value);

    const budget =
        parseFloat(document.getElementById("budget").value);

    const result =
        document.getElementById("trip-result");

    // Input validation

    if (destination === "" || !Number.isInteger(days) ||
        days < 1 || !Number.isFinite(budget) || budget <= 0) {

        result.innerHTML =
            "<p style='color:red;'>Please enter a valid destination, number of days and budget.</p>";

        return;
    }

    // Calculate estimated expenses

    const hotel = budget * 0.40;
    const food = budget * 0.25;
    const transport = budget * 0.20;
    const activities = budget * 0.15;

    
// Destination recommendations

const places = {
    goa: [
        "Visit Baga Beach and enjoy water sports",
        "Explore Fort Aguada and Candolim Beach",
        "Discover Old Goa churches and local markets",
        "Enjoy a sunset at Anjuna Beach"
    ],

    manali: [
        "Explore Solang Valley",
        "Visit Hadimba Devi Temple",
        "Enjoy the beauty of Old Manali",
        "Explore Atal Tunnel and nearby attractions"
    ],

    ooty: [
        "Visit Ooty Botanical Garden",
        "Enjoy a ride on the Nilgiri Mountain Railway",
        "Explore Ooty Lake",
        "Visit Doddabetta Peak"
    ],

    jaipur: [
        "Explore Amber Fort",
        "Visit Hawa Mahal",
        "Discover City Palace",
        "Explore local markets"
    ],

    mumbai: [
        "Visit Gateway of India",
        "Explore Marine Drive",
        "Visit Elephanta Caves",
        "Discover Juhu Beach"
    ]
};

const selectedPlaces =
    places[destination.toLowerCase()] ||
    [
        "Explore popular tourist attractions",
        "Discover local food and restaurants",
        "Visit famous landmarks",
        "Enjoy local shopping and sightseeing"
    ];

let itinerary = "";

for (let i = 1; i <= days; i++) {

    const activity = selectedPlaces[(i - 1) % selectedPlaces.length];

    itinerary += `
        <p style="margin:12px 0;">
            <strong>Day ${i}:</strong> ${activity}
        </p>
    `;
}

    // Display trip details

    result.innerHTML = `
        <div style="background:#f1f5f9;padding:20px;border-radius:12px;">

            <h3 style="color:#152b45;">
                Your ${destination} Trip ✈
            </h3>

            <p><strong>Duration:</strong> ${days} Days</p>

            <p><strong>Total Budget:</strong> ₹${budget.toLocaleString("en-IN")}</p>

            <hr>

            <h4>Estimated Budget Breakdown</h4>

            <p>🏨 Hotel: ₹${hotel.toFixed(2)}</p>
            <p>🍽 Food: ₹${food.toFixed(2)}</p>
            <p>🚗 Transport: ₹${transport.toFixed(2)}</p>
            <p>🎯 Activities: ₹${activities.toFixed(2)}</p>

            <hr>

            <h4>Your Travel Itinerary</h4>

            ${itinerary}

            <button onclick="saveTrip()"
                style="margin-top:15px;">
                Save This Trip
            </button>

        </div>
    `;

    // Store current trip for saving

    window.currentTrip = {
        destination: destination,
        days: days,
        budget: budget,
        date: new Date().toLocaleDateString()
    };
}


// =====================================
// SAVE TRIP USING LOCAL STORAGE
// =====================================

function saveTrip() {

    if (!window.currentTrip) {
        alert("Please generate a trip first!");
        return;
    }

    let trips = JSON.parse(
        localStorage.getItem("triporaTrips")
    ) || [];

    trips.push(window.currentTrip);

    localStorage.setItem(
        "triporaTrips",
        JSON.stringify(trips)
    );

    alert("Your trip has been saved successfully!");

    displayTrips();
}


// =====================================
// DISPLAY SAVED TRIPS
// =====================================

function displayTrips() {

    const savedTrips =
        document.getElementById("saved-trips");

    let trips = JSON.parse(
        localStorage.getItem("triporaTrips")
    ) || [];

    if (trips.length === 0) {

        savedTrips.innerHTML =
            "<p>No trips saved yet. Start planning your adventure!</p>";

     updateDashboard();
        return;
    }

    savedTrips.innerHTML = trips.map((trip, index) => `

        <div style="
            background:white;
            padding:20px;
            margin:15px auto;
            max-width:500px;
            border-radius:12px;
            box-shadow:0 5px 15px rgba(0,0,0,0.08);
            text-align:left;
        ">

            <h3>✈ ${escapeHTML(trip.destination)}</h3>

            <p>Duration: ${trip.days} Days</p>

            <p>Budget: ₹${Number(trip.budget).toLocaleString("en-IN")}</p>

            <p>Created: ${escapeHTML(trip.date)}</p>

            <button onclick="deleteTrip(${index})"
                style="
                background:#e74c3c;
                color:white;
                border:none;
                padding:9px 15px;
                border-radius:6px;
                cursor:pointer;
                margin-top:10px;
                ">
                Delete Trip
            </button>

        </div>

    `).join("");
    updateDashboard();
}


// Safely display user-entered text

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function(char) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[char];
    });
}


// =====================================
// DELETE SAVED TRIP
// =====================================

function deleteTrip(index) {

    let trips = JSON.parse(
        localStorage.getItem("triporaTrips")
    ) || [];

    trips.splice(index, 1);

    localStorage.setItem(
        "triporaTrips",
        JSON.stringify(trips)
    );

    displayTrips();
}


// Load saved trips when website opens

document.addEventListener("DOMContentLoaded", function() {
    displayTrips();
});
