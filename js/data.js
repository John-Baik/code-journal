/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntriesJSON = localStorage.getItem('code-journal-data');

if (previousEntriesJSON !== null) {
  data = JSON.parse(previousEntriesJSON);
}

window.addEventListener('beforeunload', function (event) {
  var storage = JSON.stringify(data);
  localStorage.setItem('code-journal-data', storage);
});
