
var admin = require("firebase-admin");

var uid = process.argv[2];

var serviceAccount = require("./log-in-dashboard-firebase-adminsdk-ig6jy-1bfc852ccf.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://log-in-dashboard.firebaseapp.com"
});

admin.auth().setCustomUserClaims(uid, { admin: true}).then(
    () => {
        console.log('custom claims set for user', uid);
        process.exit();
    }
).catch(error => {
    console.log('error', error);
    process.exit(1);
});