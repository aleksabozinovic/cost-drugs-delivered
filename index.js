const express = require("express");
const swig = require("swig");
const fetch = require("node-fetch");

const app = express();
const port = process.env.PORT || 3000;

// handle static files
app.use("/static", express.static(__dirname + "/static"));

// handle routes
app.use("/", async (req, res, next) => {
  let page = req.path === "/" ? "index" : req.path;
  page = page.replaceAll(".html", "").replace(/\/+$/, "");
  try {
    let data = {};
    if (page === "/medications" || page === "/medication") {
      let url = "http://costdrugsdelivered.com/api/public/drugs";
      if (page === "/medication") {
        url += "/" + req.query.id;
      }
      const response = await fetch(url);
      if (response.ok) {
        data = await response.json();
      }
      if (!data) {
        let page = "404";
        const tmpl = swig.compileFile(`${__dirname}/pages/${page}.html`);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(tmpl({ message: "404 Not Found" }));
        return;
      }
    }
    const tmpl = swig.compileFile(`${__dirname}/pages/${page}.html`);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(tmpl({ data }));
  } catch (e) {
    console.log(e);
    if (e.code === "ENOENT") {
      return next();
    }
    throw e;
  }
});

// handle 404
app.use((req, res, next) => {
  const page = "404";
  const tmpl = swig.compileFile(`${__dirname}/pages/${page}.html`);
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(tmpl({ message: "404 Not Found" }));
});

// handle 505
app.use((err, req, res, next) => {
  const page = "505";
  const tmpl = swig.compileFile(`${__dirname}/pages/${page}.html`);
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(tmpl({ message: "505 Internal Server Error", error: err.stack }));
});

// start server
app.listen(port, () => {
  const host = "localhost"; // server.address().address;
  console.log(`app listening at http://${host}:${port}`);
});
