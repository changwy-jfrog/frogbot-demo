// [DEMO] JAS Contextual Analysis — calls the VULNERABLE lodash.template().
// CVE-2021-23337: command injection through lodash.template template option.
// Because this code actually invokes the sink, Contextual Analysis should mark
// the lodash vulnerability as "Applicable" (reachable) on this folder.

const _ = require("lodash");

function renderUserGreeting(rawTemplate, data) {
  // Attacker-controlled template string is passed to lodash.template
  const compiled = _.template(rawTemplate);
  return compiled(data);
}

const userInput = process.argv[2] || "Hello <%= name %>";
console.log(renderUserGreeting(userInput, { name: "world" }));
