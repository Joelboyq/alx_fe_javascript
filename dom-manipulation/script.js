// Array of quote objects
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Reflection" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" },
];

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    
    // Display the quote
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>"${quote.text}" - ${quote.category}</p>`;
}

// Function to dynamically create the form to add a new quote
function createAddQuoteForm() {
    // Create the form elements
    const formDiv = document.createElement('div');
    
    const newQuoteInput = document.createElement('input');
    newQuoteInput.setAttribute('id', 'newQuoteText');
    newQuoteInput.setAttribute('type', 'text');
    newQuoteInput.setAttribute('placeholder', 'Enter a new quote');

    const newCategoryInput = document.createElement('input');
    newCategoryInput.setAttribute('id', 'newQuoteCategory');
    newCategoryInput.setAttribute('type', 'text');
    newCategoryInput.setAttribute('placeholder', 'Enter quote category');

    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.addEventListener('click', addQuote);

    // Append inputs and button to the form div
    formDiv.appendChild(newQuoteInput);
    formDiv.appendChild(newCategoryInput);
    formDiv.appendChild(addButton);

    // Append the form div to the body (or another container element)
    document.body.appendChild(formDiv);
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
document.addEventListener('DOMContentLoaded', function() {
    showRandomQuote();
    createAddQuoteForm();  // Create the add quote form when the page loads
});
