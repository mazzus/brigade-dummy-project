const { events, Job, Group } = require("brigadier");

console.log("Brigade.js is ");
events.on("exec", () => {
  console.log("\t==> handling an 'exec' event");
});

events.on("custom_event", (e, p) => {
  console.log("Custom event triggered!");
  const npmInstall = new Job("npmInstall", "node:6.11-alpine", ["cd src/", "npm install"]);

  const runNode = new Job("runNode", "node:6.11-alpine", ["node src/index.js"]);

  const deleteFiles = new Job("deleteFiles", "alpine:3.6", ["rm -rf src/"]);

  const confirmDelete = new Job("confirmDelete", "alpine:3.6", ["ls -al"]);
  
  Group.runEach([npmInstall, runNode, deleteFiles, confirmDelete]);
});

events.on("push", (e, p) => {
  console.log("Github push triggered");
  console.log({ e, p });
});

events.on("after", () => {
  console.log("After was triggered!");
});

events.on("after", () => {
  console.log("After was performed!");
});

events.on("error", () => {
  console.error("error was triggered!");
});
