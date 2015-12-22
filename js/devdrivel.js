
// Copyright [TC] 2006-2015
// DevDrivel
// tc-g.uk/devdrivel
//
// ---
//
//  Contents
//
//  1) - Setup & Main Loop
//  2) - Search
//  3) - MDL
//  4) - Post Interaction
//  5) - Helper Functions
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

  // DOM element of search results wrapper
  this.searchResults = document.getElementById('search-results');

  // DOM element of search results table
  this.searchResultsTable = document.getElementById('search-results-table');

  // DOM element of search box wrapper
  this.searchBox = document.getElementById('search-box');

  // The current search term
  this.searchTerm;

  // Post buttons
  this.postButtons = {
    shorturl: document.getElementById('share-url'),
    github: document.getElementById('share-github')
  };
}

// + setupListeners
// Setup event listeners
function setupListeners() {

  // Search box listeners
  s.searchField.addEventListener('blur', collapseSearch);
  s.searchField.addEventListener('keyup', searchFieldKeyUp);

  // Post listeners
  if(s.postButtons.shorturl != null) s.postButtons.shorturl.addEventListener('click', shareShorturl);  
  if(s.postButtons.github != null) s.postButtons.github.addEventListener('click', shareGithub);

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
//   term   : term to search
function startSearch(term) {

  s.searchResultsTable.innerHTML = "";

  // Store search term
  out("startSearch : " + term);
  s.searchTerm = new searchTerm(term);

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
        s.searchJSON = JSON.parse(s.xhr.response);
        filterSearchResults();
        out("XHR : SUCCESS");
      } else {
        out("XHR : ERROR (xhr.status)");
        out("XHR : ERROR (" + s.xhr.statusText + ")");
      }
    }
  }

  // - filterSearchResults
  // Filter the results of the search
  function filterSearchResults() {
    var totalMatches = 0;
    var match = false;
    s.searchJSON.forEach(function(el, i, arr) {
      match = false;
      if(Object.keys(el).length != 0) {
        // Check title
        if(s.searchTerm.isInside(el.title)) {
          match = true;
        }
        // Check tags
        if(!match && Object.keys(el.tags).length != 0) {
          console.log(el.tags);
          el.tags.forEach(function(el2, i2, arr2) {
            if(s.searchTerm.isInside(el2.tag)) {
              match = true;
            }
          });
        }
      }
      if(match) {
        totalMatches++;
        displaySearchResult(totalMatches, el);
      }
    });
    if(totalMatches == 0) {
      displaySearchResult(totalMatches);
    }
    s.searchResults.classList.remove('hidden');
  }

  // - displayNoSearchResults
  // Display no search results message
  function displayNoSearchResults() {
    console.log("naw");
  }
}

// + searchTerm
// a search term
//   value      : the search term
function searchTerm(value) {
  this.value = value;
}

// + isInside
// returns true if string is contained in another
//   substr     : search string
searchTerm.prototype.isInside = function(substr) {
  var str = this.value.toLowerCase();
      substr = substr.toLowerCase();
  if(str.indexOf(substr) > -1) {
    return true;
  } else {
    return false;
  }
};

// + displaySearchResult
// Add a search result to results table
//   id         : id of row
//   result     : result object
function displaySearchResult(id, result) {
  var row = document.createElement('tr');
  var title = document.createElement('td');
  title.classList.add('mdl-data-table__cell--non-numeric');
  if(id == 0) {
    title.innerHTML = "No results found";
    row.appendChild(title);
    s.searchResultsTable.appendChild(row);
  } else {
    var resultID = 'search-result-' + id;
    var date = document.createElement('td');
    title.innerHTML = result.title;
    if(result.date) date.innerHTML = getResultDate(result.date);
    row.setAttribute('id', resultID);
    row.appendChild(title);
    row.appendChild(date);
    s.searchResultsTable.appendChild(row);
    // click event
    document.getElementById(resultID).addEventListener('mousedown', function() {
      window.location.href = result.url;
    });
  }
}

// + getResultDate
// Returns the date of a result
//   resultDate   : date string
function getResultDate(resultDate) {
  var date = new Date(resultDate);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}

// ---
//
//  3) MDL
//
// ---

// + collapseSearch
// Collapse the search box
function collapseSearch() {
  s.searchBox.classList.remove('is-dirty');
  s.searchResults.classList.add('hidden');
};

// ---
//
//  4) Post Interaction
//
// ---

// + shareShorturl
// Share post via short url
function shareShorturl() {
  document.getElementById('share-url-text').classList.remove('hidden');
  document.getElementById('share-url-text').select();
}

// + shareGithub
// visit post on GitHub

function shareGithub() {
  var postPath = window.location.pathname;
  postPath = postPath.split('/').join('-').slice(1).slice(0, postPath.length-6);
  var ghPath = "https://github.com/TC-Gaming/DevDrivel/blob/gh-pages/_posts/";
  var ext = ".markdown";
  window.location.href = ghPath + postPath + ext;
}

// ---
//
//  5) Helper Functions
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
