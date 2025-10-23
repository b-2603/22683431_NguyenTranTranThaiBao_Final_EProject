const express = require("express"); 
const httpProxy = require("http-proxy"); 
const proxy = httpProxy.createProxyServer(); 
const app = express(); 
app.use("/auth", (req, res) => { 
  proxy.web(req, res, { target: "http://auth:5000" });
});

// Route requests to the product service
app.use("/products", (req, res) => {
  proxy.web(req, res, { target: "http://product:5001" });
});

// Route requests to the order service
app.use("/orders", (req, res) => {
  proxy.web(req, res, { target: "http://order:5002" });
});

// Start the server
const port = process.env.PORT || 5003;
app.listen(port, () => {
  console.log(`API Gateway listening on port ${port}`);
});
