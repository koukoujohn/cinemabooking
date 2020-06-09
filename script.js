const container = document.querySelector('.container');
//selects seats that are not occupied thus saving us the need to write an if statement later
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

//initial ticket price collected by the first option's value in he movie-container.
let ticketPrice = +movieSelect.value;


//Functions

// Save selected movie index amd price
function setMovieData(movieIndex, moviePrice) {
    // We dont need to use JSON.stringify because we want them to be saved as a string not as an array or something else.
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
// Finds the index of each selected seat and stores it in seatsIndex array
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
// Save in local storage the selected seats.
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

//based on the length of the Nodelist created by selectedSeats, update count and total
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Event listeners

// Whenever movie is changed the ticket price gets updated
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

container.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});