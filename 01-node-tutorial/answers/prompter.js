//Background Color changer
// Added this comment

const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let backgroundColor = "#ffffff";

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body style="background-color: ${backgroundColor};">
    <h2>Pick a Background Color</h2>
    <form method="POST">
      <label for="color">Choose a color:</label>
      <select name="color" id="color">
        <option value="#ff0000">Red</option>
        <option value="#33ff57">Green</option>
        <option value="#3357ff">Blue</option>
        <option value="#f1c40f">Yellow</option>
        <option value="#9b59b6">Purple</option>
        <option value="#ffffff">White</option>
        <option value="#000000">Black</option>
      </select>
      <button type="submit">Change Color</button>
    </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      // here, you can add your own logic
      if (body["color"]) {
        backgroundColor = decodeURIComponent(body["color"]);
      }
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.on("request", (req) => {
  console.log("event received: ", req.method, req.url);
});
server.listen(3000);
console.log("The server is listening on port 3000.");
