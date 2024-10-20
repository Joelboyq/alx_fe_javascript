let quotes = [];
const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts'; // Mock API for simulation
const SYNC_INTERVAL = 30000; // 30 seconds interval for syncing

// Load quotes from localStorage or set default quotes
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    const storedFilter = localStorage.getItem('selectedFilter');

    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    } else {
        quotes = [
            { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
            { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" }
        ];
        saveQuotes();
    }

    if (storedFilter) {
        document.getElementById('categoryFilter').value = storedFilter;
    }

    populateCategories();
    filterQuotes();
}

// Save quotes to localStorage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Save selected filter to localStorage
function saveFilter(selectedFilter) {
    localStorage.setItem('selectedFilter', selectedFilter);
}

// Display quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';

    const filteredQuotes = quotes.filter(quote => selectedCategory === 'all' || quote.category === selectedCategory);

    if (filteredQuotes.length > 0) {
        filteredQuotes.forEach(quote => {
            const quoteElement = document.createElement('p');
            quoteElement.textContent = `"${quote.text}" - ${quote.category}`;
            quoteDisplay.appendChild(quoteElement);
        });
    } else {
        quoteDisplay.innerHTML = '<p>No quotes available for this category.</p>';
    }

    saveFilter(selectedCategory);
}

// Populate category dropdown dynamically
function populateCategories() {
    const categorySet = new Set(quotes.map(quote => quote.category));
    const categoryFilter = document.getElementById('categoryFilter');

    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categorySet.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText === "" || newQuoteCategory === "") {
        alert("Please fill in both the quote and the category.");
        return;
    }

    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    saveQuotes();

    // If the category is new, add it to the dropdown
    if (![...document.getElementById('categoryFilter').options].some(option => option.value === newQuoteCategory)) {
        const newOption = document.createElement('option');
        newOption.value = newQuoteCategory;
        newOption.textContent = newQuoteCategory;
        document.getElementById('categoryFilter').appendChild(newOption);
    }

    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    alert("New quote added successfully!");
    filterQuotes();
    syncWithServer(); // Sync the new quote with the server
}

// Fetch data from server and handle conflicts
function syncWithServer() {
    // Simulate fetching from server
    fetch(SERVER_URL)
        .then(response => response.json())
        .then(serverQuotes => {
            const serverQuoteTexts = serverQuotes.map(quote => quote.text);
            const localQuoteTexts = quotes.map(quote => quote.text);

            // Find discrepancies: if the server has quotes that local storage doesn't
            const newQuotesFromServer = serverQuotes.filter(serverQuote => !localQuoteTexts.includes(serverQuote.text));

            if (newQuotesFromServer.length > 0) {
                quotes = [...quotes, ...newQuotesFromServer]; // Merge server quotes into local quotes
                saveQuotes();
                alert('New quotes fetched from the server and merged into local data.');
            }

            // If a conflict arises, server's quotes take precedence
            const conflictingQuotes = quotes.filter(localQuote => serverQuoteTexts.includes(localQuote.text));
            if (conflictingQuotes.length > 0) {
                alert('Conflicts found! Server quotes will take precedence.');
            }

            filterQuotes(); // Refresh the display with the merged data
        })
        .catch(error => {
            console.error("Error syncing with the server:", error);
        });
}

// Show random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    document.getElementById('quoteDisplay').innerHTML = `<p>"${randomQuote.text}" - ${randomQuote.category}</p>`;
}

// Sync every 30 seconds with the server
setInterval(syncWithServer, SYNC_INTERVAL);

// On page load
document.addEventListener('DOMContentLoaded', function() {
    loadQuotes();
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
});
