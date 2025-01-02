const app = require("./app.js");
const { connectToDataBase } = require("./config/db.js");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dzmby4jnx",
  api_key: "417687986666654",
  api_secret: "fZmFYYdtXSqSw6KbouO3kpG1KmA", // Click 'View Credentials' below to copy your API secret
});
connectToDataBase();

app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});
