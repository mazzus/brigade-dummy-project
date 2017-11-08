const { events, Job, Group } = require("brigadier");

console.log("Brigade.js is ");
events.on("exec", () => {
  console.log("\t==> handling an 'exec' event");
});

events.on("custom_event", (e, p) => {
  console.log("Custom event triggered!");
  const npmInstall = new Job("npm-install", "node:6.11-alpine", ["cd src/", "npm install"]);

  const runNode = new Job("run-node", "node:6.11-alpine", ["node src/src/index.js"]);

  const deleteFiles = new Job("delete-files", "alpine:3.6", ["rm -rf src/*"]);

  const confirmDelete = new Job("confirm-delete", "alpine:3.6", ["ls src/ -al"]);

  Group.runAll([npmInstall, runNode, deleteFiles, confirmDelete])
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.error({error});
    });
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
