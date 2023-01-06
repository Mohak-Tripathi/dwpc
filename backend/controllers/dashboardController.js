const fs = require("fs");


exports.getDashboardInfo = (req, res, next) => {
    const config = JSON.parse(fs.readFileSync("./config.json"));
    res.status(200).json(config.dashboard);
  };
