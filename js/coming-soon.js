function updateCountdown() {
    // Calculate launch date (5 days from now)
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 5);
    launchDate.setHours(0, 0, 0, 0);  // Set to midnight

    const now = new Date();
    const distance = launchDate.getTime() - now.getTime();

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    if (distance < 0) {
        clearInterval(interval);
        document.querySelector('.countdown').innerHTML = "<h2>We're Live!</h2>";
    }
}

// Start the timer immediately and update every second
updateCountdown();
const interval = setInterval(updateCountdown, 1000);

document.querySelector('.notify-btn').addEventListener('click', function() {
    const email = document.querySelector('input[type="email"]').value;
    if (email) {
        alert('Thank you! We will notify you when we launch.');
        document.querySelector('input[type="email"]').value = '';
    }
});
