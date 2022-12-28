
const fs = require("fs");
const path = require("path");
 const jwt = require("jsonwebtoken");


 exports.login = (req, res, next) => {
    const { username, password } = req.body;

    const config = JSON.parse(fs.readFileSync("./config.json"));
  
    let targetObject = config.credentials.filter((elem) => {
      return elem.app_user === username;
    });
  
    if (
      username === targetObject[0].app_user &&
      password === targetObject[0].app_password
    ) {
      const token = jwt.sign(
        { username: username },
        "DwpcProject@fTIoTDev",
        {
          expiresIn: "1h", // expires in 1 hours
        }
      );
  
 
      return res
        .status(200)
        .cookie("jwt", token, {
          // enabled: true,
          httpOnly: true,
          Secure: true,
          maxAge: 3600000,
          SameSite: "None",
 
        })
        .json({
          user: targetObject[0],
        });
    } else {
      return res.status(400).json({
        success: false,
        message: "Incorrect username or password",
      });
    }
  };



  exports.logout = async (req, res, next) => {
    res.cookie('jwt', null, {
      // expires: new Date(Date.now()),
      httpOnly: true
    })
  
    res.status(200).json({
      success: true,
      message: 'Logged out'
    })
  }
  