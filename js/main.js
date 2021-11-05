/* global data */
/* exported data */
var journalForm = document.querySelector('#journal');
var entries = document.querySelector('ul');
var upload = document.getElementById('upload');
var photo = document.getElementById('photo');
var form = document.forms[0];
var entryHeader = document.getElementById('entries-header');
var header = document.querySelector('.entry');
var noEntries = document.querySelector('.no-entries');
var entriesTab = document.getElementById('entries-data-view');
var entryForm = document.getElementById('entry-form-active');
var titleEdit = document.getElementById('title');
var photoEdit = document.getElementById('photo');
var notesEdit = document.getElementById('notes');
var remove = document.getElementById('delete');

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
  if (data.editing) {
    object.entryId = data.editing.entryId;
  } else {
    object.entryId = data.nextEntryId++;
    data.entries.unshift(object);
  }
  upload.setAttribute('src', 'images/placeholder-image-square.jpg');
  if (data.editing) {
    entries.innerHTML = '';
    for (var u = 0; u < data.entries.length; u++) {
      if (data.entries[u].entryId === data.editing.entryId) {
        data.entries[u] = object;
      }
      entries.append(renderEntries(data.entries[u]));
      entryForm.className = 'hidden';
      entriesTab.className = 'active';
      noEntries.className = 'hidden';
    }
  } else {
    entries.prepend(renderEntries(object));
  }
  journalForm.reset();
  entryForm.className = 'hidden';
  entriesTab.className = 'active';
  noEntries.className = 'hidden';
  header.textContent = 'New Entry';
  remove.className = 'invisible';
  data.editing = null;
});

function renderEntries(entry) {
  var li = document.createElement('li');
  li.setAttribute('class', 'row');
  li.setAttribute('data-entry-id', entry.entryId);
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
  h2.textContent = entry.titleInput;
  var pen = document.createElement('i');
  pen.setAttribute('class', 'fas fa-pen');
  pen.setAttribute('data-entry-id', entry.entryId);
  var info = document.createElement('div');
  info.setAttribute('class', 'info');
  var infoText = document.createElement('p');
  infoText.textContent = entry.notesInput;
  li.appendChild(colHalf);
  colHalf.appendChild(image);
  li.appendChild(colHalf2);
  colHalf2.appendChild(bodyTitle);
  bodyTitle.appendChild(h2);
  bodyTitle.appendChild(pen);
  colHalf2.appendChild(info);
  info.appendChild(infoText);
  return li;
}

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    entries.appendChild(renderEntries(data.entries[i]));
  }
});

entryHeader.addEventListener('click', function (event) {
  entryForm.className = 'hidden';
  entriesTab.className = 'container';
  if (data.nextEntryId === 1) {
    noEntries.className = 'active';
  } else {
    noEntries.className = 'hidden';
  }
  data.editing = null;
});

var switchView = document.getElementById('new');

switchView.addEventListener('click', function (event) {
  entryForm.className = 'active';
  entriesTab.className = 'hidden';
});

entries.addEventListener('click', function (event) {
  if (event.target && event.target.tagName === 'I') {
    entryForm.className = 'active';
    entriesTab.className = 'hidden';
    header.textContent = 'Edit Entry';
    for (var e = 0; e < data.entries.length; e++) {
      if (data.entries[e].entryId === parseInt(event.target.getAttribute('data-entry-id'))) {
        titleEdit.value = data.entries[e].titleInput;
        photoEdit.value = data.entries[e].photoInput;
        notesEdit.textContent = data.entries[e].notesInput;
        data.editing = data.entries[e];
        remove.className = 'visible';
      }
    }
  }
});

var deleteContainer = document.getElementById('delete-container');

remove.addEventListener('click', function (event) {
  deleteContainer.className = 'full';
});

var cancel = document.querySelector('.delete-cancel');
var yes = document.querySelector('.delete-confirm');

cancel.addEventListener('click', function (event) {
  deleteContainer.className = 'full hidden';
});

yes.addEventListener('click', function (event) {
  deleteContainer.className = 'full hidden';
  entryForm.className = 'hidden';
  entriesTab.className = 'active';
  entries.innerHTML = '';
  for (var u = 0; u < data.entries.length; u++) {
    if (data.editing.entryId === data.entries[u].entryId) {
      data.entries.splice(u, 1);
    }
    entries.append(renderEntries(data.entries[u]));
  }
});
