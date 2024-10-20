// Array of quote objects
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Reflection" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" },
];

// Function to display a random quote
function showRandomQuote() {
    // Select a random quote from the array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    // Display the quote
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>"${quote.text}" - ${quote.category}</p>`;
}

// Function to add a new quote dynamically
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText === "" || newQuoteCategory === "") {
        alert("Please fill in both the quote and the category.");
        return;
    }

    // Add the new quote to the quotes array
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);

    // Clear the input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    alert("New quote added successfully!");

    // Optionally, display the newly added quote
    showRandomQuote();
}

// Attach the showRandomQuote function to the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Display an initial random quote when the page loads
document.addEventListener('DOMContentLoaded', showRandomQuote);
