// Initialize the quotes array, which will be updated from localStorage
let quotes = [];

// Load quotes from localStorage when the app starts
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    } else {
        // Default quotes if no data in local storage
        quotes = [
            { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
            { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Reflection" },
            { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" },
        ];
        saveQuotes();
    }
}

// Save the quotes array to localStorage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    
    // Save the last displayed quote in sessionStorage
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));

    // Display the quote
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>"${quote.text}" - ${quote.category}</p>`;
}

// Function to dynamically create the form to add a new quote
function createAddQuoteForm() {
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

    formDiv.appendChild(newQuoteInput);
    formDiv.appendChild(newCategoryInput);
    formDiv.appendChild(addButton);

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

    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);

    // Save the updated quotes array to localStorage
    saveQuotes();

    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    alert("New quote added successfully!");
    showRandomQuote();
}

// Export quotes as a JSON file
function exportQuotesAsJson() {
    const jsonQuotes = JSON.stringify(quotes, null, 2);
    const blob = new Blob([jsonQuotes], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Load quotes from localStorage on page load and initialize the form
document.addEventListener('DOMContentLoaded', function() {
    loadQuotes();
    createAddQuoteForm();
    showRandomQuote();

    // Attach export functionality to the button
    document.getElementById('exportQuotes').addEventListener('click', exportQuotesAsJson);

    // Show last viewed quote from sessionStorage if available
    const lastViewedQuote = sessionStorage.getItem('lastViewedQuote');
    if (lastViewedQuote) {
        const quote = JSON.parse(lastViewedQuote);
        const quoteDisplay = document.getElementById('quoteDisplay');
        quoteDisplay.innerHTML = `<p>"${quote.text}" - ${quote.category}</p>`;
    }
});
