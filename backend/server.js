const app = require("./app.js");
const { connectToDataBase } = require("./config/db.js");


connectToDataBase();

app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});
