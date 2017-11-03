import { events } from "brigadier";

console.log("Brigade.js is ");
events.on("exec", () => {
  console.log("==> handling an 'exec' event");
});

events.on("custom_event", (e, p) => {
  console.log("Custom event triggered!");
  console.log(e, p);
});

events.on("push", (e, p) => {
  console.log("Github push triggered");
  console.log(e, p);
});
