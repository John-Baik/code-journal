/* global data */
/* exported data */
var journalForm = document.querySelector('#journal');

var upload = document.getElementById('upload');
var photo = document.getElementById('photo');
var form = document.forms[0];

photo.addEventListener('input', function (event) {
  upload.setAttribute('src', event.target.value);
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  var object = {};
  var photoValue = journalForm.elements.photo.value;
  var titleValue = journalForm.elements.title.value;
  var notesValue = journalForm.elements.notes.value;
  object.titleInput = titleValue;
  object.photoInput = photoValue;
  object.notesInput = notesValue;
  object.entryId = data.nextEntryId++;
  data.entries.unshift(object);
  journalForm.reset();
});
