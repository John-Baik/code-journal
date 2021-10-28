/* global data */
/* exported data */
var journalForm = document.querySelector('#journal');
var entries = document.querySelector('ul');
var upload = document.getElementById('upload');
var photo = document.getElementById('photo');
var form = document.forms[0];
var entryHeader = document.querySelector('a');

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
  upload.setAttribute('src', 'images/placeholder-image-square.jpg');
});

function renderEntries(entry) {
  var li = document.createElement('li');
  li.setAttribute('class', 'row');
  var colHalf = document.createElement('div');
  colHalf.setAttribute('class', 'column-half');
  var image = document.createElement('img');
  image.setAttribute('src', entry.photoInput);
  var colHalf2 = document.createElement('div');
  colHalf2.setAttribute('class', 'column-half');
  var bodyTitle = document.createElement('div');
  bodyTitle.setAttribute('class', 'body-title');
  var h2 = document.createElement('h2');
  h2.setAttribute('class', 'entry-title');
  var info = document.createElement('div');
  info.setAttribute('class', 'info');
  var infoText = document.createElement('p');
  infoText.textContent = entry.notesInput;
  li.appendChild(colHalf);
  colHalf.appendChild(image);
  li.appendChild(colHalf2);
  colHalf2.appendChild(bodyTitle);
  bodyTitle.appendChild(h2);
  colHalf2.appendChild(info);
  info.appendChild(infoText);
  return li;
}

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    entries.appendChild(renderEntries(data.entries[i]));
  }
});

var idContainer = document.querySelector('#container');
var noEntries = document.querySelector('.no-entries');
var entriesTab = document.querySelector('.hidden');

entryHeader.addEventListener('click', function (event) {
  idContainer.className = 'hidden';
  entriesTab.className = 'container';
  if (data.nextEntryId === 1) {
    noEntries.className = 'active';
  } else {
    noEntries.className = 'hidden';
  }

});
