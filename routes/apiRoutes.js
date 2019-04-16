var db = require("../models");

var passport = require("../config/passport");
module.exports = function (app) {

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function () {
      res.redirect(307, "/api/login");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        favstock1: req.user.favstock1,
        favstock2: req.user.favstock2,
        favstock3: req.user.favstock3,
        favstock4: req.user.favstock4
       
      });
    }
  });
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
  // Updating favstock1
  app.put("/api/stock1", function(req, res) {
    console.log(req.body);
    db.User.update({
      favstock1: req.body.favstock1
    }, {
        where: {
          email: req.body.email
         }
      }).then(function (stock) {
        // res.json(stock);
        res.redirect("/members")
      });
  });
  app.put("/api/stock2", function(req, res) {
    console.log(req.body);
    db.User.update({
      favstock2: req.body.favstock2
    }, {
        where: {
          email: req.body.email
         }
      }).then(function (stock) {
        res.json(stock);
      
      });
  });
  app.put("/api/stock3", function(req, res) {
    console.log(req.body);
    db.User.update({
      favstock3: req.body.favstock3
    }, {
        where: {
          email: req.body.email
         }
      }).then(function (stock) {
        res.json(stock);
      
      });
  });
  app.put("/api/stock4", function(req, res) {
    console.log(req.body);
    db.User.update({
      favstock4: req.body.favstock4
    }, {
        where: {
          email: req.body.email
         }
      }).then(function (stock) {
        res.json(stock);
      
      });
  });
};
