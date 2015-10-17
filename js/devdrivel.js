// Copyright [TC] 2006-2015
// DevDrivel

// Session object
var s = new session();

// Main loop
(function() {
  setupListeners();
})();

function session() {
  this.debug = true;
}

// + setupListeners
// Setup event listeners
function setupListeners() {

  // Search box listeners
  var searchField = document.getElementById('search-field');
  searchField.addEventListener('blur', searchFieldBlur);
  searchField.addEventListener('keyup', searchFieldKeyUp);

  // When focus is lost
  function searchFieldBlur() {
    collapseSearch();
  };

  // After a key is pressed
  function searchFieldKeyUp(e) {
    if(e.keyCode == 27) {
      searchField.value = "";
      searchField.blur();
      collapseSearch();
    }
    if(e.keyCode == 13) {
      startSearch(searchField.value);
    }
  };
}

// + startSearch
// Start a search
//   searchTerm : term to search for
function startSearch(searchTerm) {
  window.location = '/search/?s=' + searchTerm;
}

// + collapseSearch
// Collapse the search box
function collapseSearch() {
  document.getElementById('search-box').classList.remove('is-dirty');
};

// + out
// log a message to the console if in debug mode
//   msg        : message to print
function out(msg) {
  if(s.debug) {
    console.log(msg);
  }
}
