const mailer = require('./mailer')

let v = new mailer.Validater({
    user: "your_email@email.com",
    pass: "yourpwd"
});

v.add("target@gmail.com"); // new validation

console.log(v.isVerify("target@gmail.com"));
