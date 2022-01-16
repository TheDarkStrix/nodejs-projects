const chalk = require("chalk");
const yargs = require("yargs");
const { getNotes, addNote, deleteNote, readNote } = require("./notes.js");

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Title of note",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Body of the note",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "remove a note",
  builder: {
    title: {
      title: "Title of note",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    deleteNote(argv.title);
  },
});

yargs.command({
  command: "list",
  describe: "List all notes",
  handler: () => {
    getNotes();
  },
});

yargs.command({
  command: "read",
  describe: "Read note",
  builder: {
    title: {
      title: "Title of note",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    readNote(argv.title);
  },
});

yargs.parse();

// const validator = require("validator");
// console.log(getNotes());
// console.log(validator.isEmail("gmail.com"));
// console.log(validator.isURL("itsmanoj.contact@gmail.com"));
