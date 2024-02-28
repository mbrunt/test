var el = document.querySelector('#numberDisplay');

// Jackpot API API URL
const binanceWsUrl = 'wss://stream.binance.com:9443/ws/btcusdt@trade';

const ws = new WebSocket(binanceWsUrl);
let lastPrice = 0; // Store the last price for comparison
let canUpdate = true; // Flag to control update frequency
let NGU = false // Only allow the number to go up... like a jackpot

ws.onopen = function () {
    console.log('Connected to Binance WebSocket API');
};

ws.onmessage = function (event) {
    if (canUpdate) { // Only proceed if an update is allowed
        // Parse the incoming message as JSON
        const message = JSON.parse(event.data);
        // Extract the price from the message
        const newPrice = parseFloat(message.p).toFixed(0); // Round to 0 decimal places

        if (lastPrice === null || newPrice > lastPrice || NGU == false) {
            el.innerHTML = newPrice
            lastPrice = newPrice; // Update the last price to the new price
        }
        canUpdate = false;
        setTimeout(() => {
            canUpdate = true;
        }, 3000); // 3000 milliseconds = 3 seconds
    }
};

ws.onerror = function (error) {
    console.error('WebSocket Error:', error);
    //document.getElementById('numberDisplay').textContent = 'Error connecting to Jackpot API.';
};

ws.onclose = function () {
    console.log('Disconnected Jackpot');
};
