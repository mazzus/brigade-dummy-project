const { events, Job } = require("brigadier");

console.log("Brigade.js is ");
events.on("exec", () => {
  console.log("\t==> handling an 'exec' event");
});

events.on("custom_event", (e, p) => {
  console.log("Custom event triggered!");
  const hello = new Job("hello", "alpine:3.6")
  hello.tasks = [
    "ls src/ -al"
  ]
  hello.run().then(res => {
    console.log("------------------- result data -------------------");
    console.log(res.data)
    console.log("-------------------/result data -------------------");
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
