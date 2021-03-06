var nodemailer = require("nodemailer");

let mailSenderService = function (to, eventId, guestId) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: process.env.gmail_usernname,
      pass: process.env.gmail_password,
    },
  });

  let url = process.env.URL;
  const isNewEventCreatedMail = guestId === undefined;

  if (guestId) {
    // this is mail for inviting guest
    var mailOptions = {
      from: "eventit2018@gmail.com",
      to: to,
      subject: "You are invited to an event!",
      html: `<center>
                <h2>Hi, you are invited to an event! All the details in link:</h2> <br/> 
                <h3><a href="${url}guest/${eventId}/${guestId}">Link</a></h3> <br/><br/>
                <img style="width: 30vw; height: 40vh" src="https://github.com/alongalperin/EventIt/blob/master/client/src/img/email_image.jpg?raw=true" />
              </center>`,
    };
  }

  if (isNewEventCreatedMail) {
    // this is mail for manage
    var mailOptions = {
      from: "eventit2018@gmail.com",
      to: to,
      subject: "Your new event details",
      html: `<center>
                <h2>Congratulations! You created an event</h2> <h3> here is a link for managing:</h3>
                <h3><a href="${url}manage/${eventId}">Manage Event</a></h3> <br/>
                <img style="width: 30%; height: 40%" src="https://github.com/alongalperin/EventIt/blob/master/client/src/img/email_image.jpg?raw=true" />
              </center>`,
    };
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      reject();
    } else {
      console.log("Email sent: " + info.response);
      resolve();
    }
  });
};

module.exports = { mailSenderService };
