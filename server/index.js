const express = require("express");
const app = express();
const path = require("path");
const server = require("http").Server(app);
const cors = require("cors")();
const bodyParser = require("body-parser");
require("dotenv").config();

const Approutes = require('./routes/appRoutes');
const DeliveryRoutes = require('./routes/deliveryRoutes');
const EmployeeRoutes = require('./routes/employeeRoutes');
const InventoryRoutes = require('./routes/InventoryRoutes');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(cors);

// app.use(express.static(path.join(__dirname, "../client/dist")));

//Add Api
Approutes(app);
DeliveryRoutes(app);
EmployeeRoutes(app);
InventoryRoutes(app);
///

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist/index.html"));
// });

server.listen(port, () => console.log(`Running on localhost:${port}`));
