const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
  const notes = readFileFS();
  if (notes.length > 0) {
    console.log(chalk.black.bgGreen("Your Notes"));
    notes.forEach((note) => {
      console.log(`- ${note.title}`);
    });
  } else {
    console.log(chalk.black.bgRed("No notes yet!"));
  }
};

const readNote = (title) => {
  const notes = readFileFS();
  const readNotes = notes.filter((note) => note.title === title);
  if (readNotes.length > 0) {
    readNotes.forEach((note) => {
      console.log(`${chalk.black.bgGreen(note.title)} - ${note.body}`);
    });
  } else {
    console.log(chalk.black.bgRed("No note found!"));
  }
};

const addNote = (title, body) => {
  const notes = readFileFS();
  const duplicates = notes.find((note) => {
    return note.title === title;
  });
  if (!duplicates) {
    notes.push({ title: title, body });
    writeFileFs(notes);
    console.log(chalk.black.bgGreen("Note added !"));
  } else {
    console.log(chalk.white.bgRed(`Title - '${title}' is taken`));
  }
};

const deleteNote = (title) => {
  const notes = readFileFS();
  const toRemove = notes.filter((note) => {
    return note.title !== title;
  });
  if (toRemove.length === notes.length) {
    console.log(chalk.white.bgRed("No note found !"));
  } else {
    writeFileFs(toRemove);
    console.log(chalk.black.bgGreen("Note was removed !"));
  }
};

const readFileFS = () => {
  try {
    const Buffer = fs.readFileSync("./notes.json");
    const BufferJSON = Buffer.toString();
    return JSON.parse(BufferJSON);
  } catch {
    return [];
  }
};

const writeFileFs = (data) => {
  fs.writeFileSync("./notes.json", JSON.stringify(data));
};

module.exports = { getNotes, addNote, deleteNote, readNote };
