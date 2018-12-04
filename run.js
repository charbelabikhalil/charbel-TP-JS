window.onload= init;

// The contact manager as a global variable
let cm; 

function init() { 
	// create an instance of the contact manager
	cm = new ContactManager();
	
  	cm.addTestData();
  	cm.printContactsToConsole();

	// Display contacts in a table
	// Pass the id of the HTML element that will contain the table
	cm.displayContactsAsATable("contacts"); 
  
	// Add event listener to each trashbin img
	attachEventHandlers();
}

function sortName() {
	cm.sortByName();
	cm.displayContactsAsATable("contacts");
	attachEventHandlers();
}

function sortMail() {
	cm.sortByMail();
	cm.displayContactsAsATable("contacts");
	attachEventHandlers();
}


function attachEventHandlers() {
	var trashbinElts = document.getElementsByClassName("trashbinImgs");
	for (var i = 0; i < trashbinElts.length; i++) {
	  var trashbin = trashbinElts[i];
	  trashbin.addEventListener("click", deleteContact, true);
	}
}

function deleteContact(evt) {
	var contact = cm.listOfContacts[evt.target.dataset.contactId];
	//console.log("deleted contact", contact)
	cm.remove(contact);

	// comment this
	//cm.save();

	// clear & re-draw table and attach the event handlers
	cm.displayContactsAsATable("contacts");
	attachEventHandlers();
}

function searchformSubmitted() {
	let name = document.querySelector("#searchName");

	if (name.value) {
		var searchResult = [];

		cm.listOfContacts.forEach(function(currentContact) {
			
			if (currentContact.name === name.value || currentContact.name.toLowerCase().includes(name.value.toLowerCase())) {
				searchResult.push(currentContact);
			}			
		 });


		cm.displayCopyOfContactsAsATable("contacts", searchResult);
		//console.log(searchResult);
		attachEventHandlers();

		// do not let your browser submit the form using HTTP
		return false;
	}
	else {
		cm.displayContactsAsATable("contacts");
		attachEventHandlers();
		
		// do not let your browser submit the form using HTTP
		return false;
	}
}

function formSubmitted() {
	// Get the values from input fields
	let name = document.querySelector("#name");
  	let email = document.querySelector("#email");
	let newContact = new Contact(name.value, email.value);
	cm.add(newContact);
	
	// Empty the input fields
	name.value = "";
	email.value = "";
	
	// refresh the html table
	cm.displayContactsAsATable("contacts");
	attachEventHandlers();
	
	// do not let your browser submit the form using HTTP
	return false;
}

function emptyList() {
	cm.empty();
  	cm.displayContactsAsATable("contacts");
}

function loadList() {
	cm.load();
	  cm.displayContactsAsATable("contacts");
	  attachEventHandlers();
	  
}
function doneEditing(dataContactId) {
	var btn = document.getElementById("edit");
	btn.remove();
	var obj = document.querySelectorAll('[data-contact-id=\"'+ dataContactId + '\"]');

	for (var i=0; i < obj.length; i++) {

		if (obj[i].tagName.toLowerCase() == "td") {
			var newName = obj[i].innerText;
			cm.listOfContacts[dataContactId].name = newName;
			//console.log('new name', obj[i].innerText)
		}
	}
}
function doneEditingEmail(dataContactId) {
	var btn = document.getElementById("edit");
	btn.remove();
	var obj = document.querySelectorAll('[data-email-id=\"'+ dataContactId + '\"]');

	for (var i=0; i < obj.length; i++) {

		if (obj[i].tagName.toLowerCase() == "td") {
			var newEmail = obj[i].innerText;
			cm.listOfContacts[dataContactId].email = newEmail;
			//console.log('new name', obj[i].innerText)
		}
	}
}

function editNameCell(objCurrent) {
	if (objCurrent.contentEditable ) {
		var h2 = document.getElementById("loc");
		var dataContactId = objCurrent.getAttribute("data-contact-id");
		h2.innerHTML += "	 	<button id=\"edit\" onclick=\"doneEditing(" + dataContactId + ")\">Done Editing</button>";	
		}

		

}

function editEmailCell(objCurrent) {
	if (objCurrent.contentEditable ) {
		var h2 = document.getElementById("loc");
		var dataContactId = objCurrent.getAttribute("data-email-id");
		h2.innerHTML += "	 	<button id=\"edit\" onclick=\"doneEditingEmail(" + dataContactId + ")\">Done Editing</button>";	
		}

	
	  
}