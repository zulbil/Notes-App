console.log("Starting notes.js ..."); 
const fs 	= require('fs');

/*
* Utilities Functions
*/
var fetchNotes = () => {
	try {
			var noteString = fs.readFileSync("notes-data.json"); 
			// Get all the notes
			return JSON.parse(noteString); 
		}catch (e) {
			return [];
	}
}

var saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}
/*
* This function is used to add a single note
* It takes two parameters title and body
*/
var addNote = ( title, body ) => {
	var notes   = fetchNotes(),
		note 	= {
			title, 
			body
		}; 
	if(title && body) {
		// We check if the note already exist 
		var duplicateNotes = notes.filter(( note ) => note.title === title); 

		if( !duplicateNotes.length ) {
			//Add a new note to the list of notes 
			notes.push(note); 
			// Update the file with a new note 
			saveNotes(notes); 
			return note; 
		} else {
			console.log("The note you're trying to add already exists..."); 
			return false; 
		}
	} else {
		console.log("Please provide all the parameters...");
		return false; 
	}
}

var getAll = () => {
	var notes = fetchNotes(); 
	return notes; 
}

var remove = (title) => {
	var notes   = fetchNotes();
	if (title) {
		var filteredNotes = notes.filter(( note ) => note.title !== title);
		saveNotes(filteredNotes); 
		return notes.length !== filteredNotes.length; 

	} else {
		console.log("Provide the title please...");
	}
}

var getNote = (title) => {
	var notes   = fetchNotes();
	if (title) {
		var noteToget = notes.find(( note ) => note.title === title ); 
		return noteToget;  
	}else {
		console.log("Provide the title please...");
		return false; 
	}
}

module.exports = {
	addNote, 
	getAll,
	remove,
	getNote
}