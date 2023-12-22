const ulNotes = document.getElementById('notes-ul');
const nameNoteInput = document.getElementById('new-note-name');

const storedNotes = localStorage.getItem('notes-data');
let notes = storedNotes ? JSON.parse(storedNotes) : [];

function generateUniqueID() {
    const timestamp = Date.now().toString(36); // Convert timestamp to base36 string
    const randomStr = Math.random().toString(36).substr(2, 5); // Generate random string

    return `${timestamp}-${randomStr}`;
}

const addNewNote = () => {
    if (!nameNoteInput.value) {
        alert('Please enter a name for your note');
        return;
    }
    const noteTemplate = {
        id: generateUniqueID(),
        name: nameNoteInput.value,
        content: '', // You can add content here if needed
    };

    notes.push(noteTemplate);
    renderNotes();
    nameNoteInput.value = '';
    localStorage.setItem('notes-data', JSON.stringify(notes));
};

const renderNotes = () => {
    const notesHtml = notes.map(note => `<li id='${note.id}' ><span onclick='displayNote("${note.id}")'>${note.name}</span></li>`).join('');
    ulNotes.innerHTML = notesHtml;
};

const displayNote = (id) => {
    const noteArea = document.getElementById('note-text-area');
    const note = notes.find(note => note.id === id);

    noteArea.innerHTML = `
    <h2>${note.name}</h2>
    <textarea name="note-text" id="${id}+text-area" placeholder="Note: "></textarea>
    <button onclick='saveNote("${id}")'>Save</button>
    <button onclick='deleteNote("${id}")'>Delete</button>
    `

    const noteTextArea = document.getElementById(`${id}+text-area`);
    noteTextArea.value = note.content;
}

const saveNote = (id) => {
    const noteTextArea = document.getElementById(`${id}+text-area`);
    const note = notes.find(note => note.id === id);
    note.content = noteTextArea.value;
    localStorage.setItem('notes-data', JSON.stringify(notes));
    alert('Note saved!')
}

const deleteNote = (id) => {
    const note = notes.find(note => note.id === id);
    const index = notes.indexOf(note);
    notes.splice(index, 1);
    localStorage.setItem('notes-data', JSON.stringify(notes));
    renderNotes();
    const noteArea = document.getElementById('note-text-area');
    noteArea.innerHTML = '';
}

renderNotes();

