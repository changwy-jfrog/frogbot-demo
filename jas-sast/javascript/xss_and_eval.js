// [DEMO] JAS SAST — XSS, eval, and command injection patterns.

const express = require("express");
const { exec } = require("child_process");
const app = express();

// Reflected XSS: untrusted input echoed into HTML without escaping
app.get("/hello", (req, res) => {
  const name = req.query.name;
  res.send("<h1>Hello " + name + "</h1>");
});

// Code injection via eval on untrusted input
app.get("/calc", (req, res) => {
  const expr = req.query.expr;
  const result = eval(expr);
  res.send("Result: " + result);
});

// Command injection: shell metacharacters from user passed to exec
app.get("/ping", (req, res) => {
  const host = req.query.host;
  exec("ping -c 1 " + host, (err, stdout) => {
    res.send(stdout);
  });
});

app.listen(3000);
