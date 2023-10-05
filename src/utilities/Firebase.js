class Firebase {
  constructor(serviceAccount) {
    this._serviceAccount = serviceAccount;
    this._admin = require("firebase-admin");
    this._admin.initializeApp({
      credential: this._admin.credential.cert(serviceAccount),
    });
    
  }
  sendNotification = (notification, data, fcmToken) => {
    var payload = {
        notification: notification,
        data: data
    };
    this._admin.messaging().sendToDevice(fcmToken, payload)
    .then((response) => {
        console.log('Sent successfully.\n');
        console.log(response.results);
    })
    .catch((error) => {
        console.log(error);
    });
  };
  createUser = async (email,password) => {
    const userResponse = await admin.auth().createUser({
      email: userObject.email,
      password: userObject.password,
      emailVerified: false,
      disabled: false,
    });
    return userResponse;
  };
  
};

module.exports = Firebase;