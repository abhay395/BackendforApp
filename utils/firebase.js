import admin from "firebase-admin";
import serviceAccount from "./firebaseAdminSDK.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export {admin}