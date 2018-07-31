console.log("Staring app.js ..."); 

const fs 		= require('fs'); 
const _			= require('lodash'); 
const yargs		= require('yargs');
const notes 	= require('./notes.js'); 

const arg 		= process.argv[2]; 
const argv		= yargs.argv; 
let command 	= argv._[0]; 

console.log("Command: ",command);
console.log("Yargs:",argv);

if (arg === "add") {
	var note = notes.addNote(argv.title, argv.body);
	if(note){
		console.log("Note created"); 
		console.log("************");
		console.log(`Title : ${note.title}`);
		console.log(`Body : ${note.body}`); 
	} else {
		console.log("The note wasn't added"); 
	}
}else if ( arg === "list") {
	var allnotes = notes.getAll(); 
	if(allnotes.length) {
		console.log('List of All Notes');
		console.log('******************');
		var i 	= 0, 
			size = allnotes.length; 
		for (; i<size; i++) {
			console.log('Title :', allnotes[i].title);
			console.log('Body :', allnotes[i].body);
			console.log("*****************");
		}
	}
} else if (arg === "remove") {
	debugger; 
	var noteRemove = notes.remove(argv.title); 
	var message = noteRemove ? 'Note was removed' : 'Note not found'; 
	console.log(message); 
} else if (arg === "read") {
	var response = notes.getNote(argv.title); 
	if ( response ) {
		console.log("The content: ");
		console.log(response.body); 
	} 
} else {
	console.log("Command is not definded..."); 
}
