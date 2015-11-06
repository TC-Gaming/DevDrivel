
// Copyright [TC] 2006-2015
// DevDrivel
//
// ---
//
//  Contents
//
//  1) - Setup & Main Loop
//  2) - Search
//  3) - MDL
//  4) - Helper Functions
//
// ---

// ---
//
//  1) Setup & Main Loop
//
// ---

// Session object
var s = new session();

// + session
// Contains information about the session
function session() {

  // In debug mode, the script will log debug messages
  this.debug = true;

  // XMLHttpRequest Object
  this.xhr;

  // Contents of JSON file used for searching posts
  this.searchJSON;

  // DOM element of search box
  this.searchField = document.getElementById('search-field');

  // The current search term
  this.searchTerm;
}

// + setupListeners
// Setup event listeners
function setupListeners() {

  // Search box listeners
  s.searchField.addEventListener('blur', searchFieldBlur);
  s.searchField.addEventListener('keyup', searchFieldKeyUp);
}

// + setupHighlighting
// Setup Prism syntax highlighting
function setupHighlighting() {

  // Add line numbers to all code blocks
  var codeBlocks = document.getElementsByTagName('pre');

  for(var i = 0; i < codeBlocks.length; i++) {
    document.getElementsByTagName('pre')[i].classList.add('line-numbers');
  }
}

// Main loop
(function() {
  setupListeners();
  setupHighlighting();
})();

// ---
//
//  2) Search
//
// ---

// When focus is lost
function searchFieldBlur() {
  collapseSearch();
}

// After a key is pressed
//   e        : event object
function searchFieldKeyUp(e) {

  // Escape
  if(e.keyCode == 27) {
    s.searchField.value = "";
    s.searchField.blur();
    collapseSearch();
  }

  // Enter
  if(e.keyCode == 13) {
    startSearch(s.searchField.value);
  }
}

// + startSearch
// Search for a keyword to generate a list of matching posts
//   searchTerm   : term to search
function startSearch(searchTerm) {

  // Store search term
  out("startSearch : " + searchTerm);
  s.searchTerm = searchTerm;

  // Get contents of the JSON search file
  fetchSearchData();

  // - fetchSearchData
  // Fetch the DevDrivel search data
  function fetchSearchData() {
    s.xhr = new XMLHttpRequest();
    s.xhr.onreadystatechange = handleAJAXResponse;
    s.xhr.open('GET', '/search.json');
    s.xhr.send();
  }

  // - handleAJAXResponse
  // Handle response of AJAX request
  function handleAJAXResponse() {
    if(s.xhr.readyState === XMLHttpRequest.DONE) {
      if(s.xhr.status === 200) {
        s.searchJSON = s.xhr.response;
        displaySearchResults();
        out("XHR : SUCCESS");
      } else {
        out("XHR : ERROR (xhr.status)");
        out("XHR : ERROR (" + s.xhr.statusText + ")");
      }
    }
  }

  // - displaySearchResults
  // Display the results of the search
  function displaySearchResults() {

  }
}

// ---
//
//  3) MDL
//
// ---

// + collapseSearch
// Collapse the search box
function collapseSearch() {
  document.getElementById('search-box').classList.remove('is-dirty');
};

// ---
//
//  4) Helper Functions
//
// ---

// + out
// log a message to the console if in debug mode
//   msg        : message to print
//   flag       : Optional flag denoting type of output (default: log)
//     - table  : Display output in a table
function out(msg, flag) {
  if(s.debug) {
    switch(flag) {
      case undefined:
        console.log(msg);
        break;
      case "table":
        console.table(msg);
        break;
    }
  }
}
