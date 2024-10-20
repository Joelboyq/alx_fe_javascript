// Initialize the quotes array, which will be updated from localStorage
let quotes = [];

// Load quotes and last selected filter from localStorage when the app starts
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    const storedFilter = localStorage.getItem('selectedFilter');

    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    } else {
        quotes = [
            { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
            { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Reflection" },
            { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" },
        ];
        saveQuotes();
    }

    // Set the last selected filter, if available
    if (storedFilter) {
        document.getElementById('categoryFilter').value = storedFilter;
    }
}

// Save the quotes array and filter to localStorage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Save the selected category filter to localStorage
function saveFilter(selectedFilter) {
    localStorage.setItem('selectedFilter', selectedFilter);
}

// Function to display quotes based on the selected category
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

    // Save the selected filter to localStorage
    saveFilter(selectedCategory);
}

// Populate the category dropdown dynamically based on quotes array
function populateCategories() {
    const categorySet = new Set(quotes.map(quote => quote.category));
    const categoryFilter = document.getElementById('categoryFilter');

    categorySet.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>"${randomQuote.text}" - ${randomQuote.category}</p>`;
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

    // Update the categories in the dropdown if a new category is added
    const categoryFilter = document.getElementById('categoryFilter');
    if (![...categoryFilter.options].some(option => option.value === newQuoteCategory)) {
        const newOption = document.createElement('option');
        newOption.value = newQuoteCategory;
        newOption.textContent = newQuoteCategory;
        categoryFilter.appendChild(newOption);
    }

    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    alert("New quote added successfully!");
    filterQuotes();  // Display the quotes after adding
}

// Load quotes from localStorage on page load and initialize the form
document.addEventListener('DOMContentLoaded', function() {
    loadQuotes();
    populateCategories();
    filterQuotes();

    // Attach export functionality to the button
    document.getElementById('exportQuotes').addEventListener('click', exportQuotesAsJson);

    // Attach random quote functionality to the button
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
});

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
        populateCategories();
        filterQuotes();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}
