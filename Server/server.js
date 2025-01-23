const env = require("dotenv");
env.config({ path: "./config.env" });

const app = require("./app");

const port = 3000;
app.listen(port, "0.0.0.0", () => {
  console.log("server is running on port " + port);
});
