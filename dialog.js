"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sophie-champagne.firebaseio.com"
});
async function chat(room, name, text) {
  const messageRef = admin
    .database()
    .ref("rooms")
    .child(room)
    .child("messages");
  await messageRef.push({ name, text });
  console.log(`${name}: ${text}`);
}
(async () => {
  await chat("pizzachat", "Fear", "What the heck is that?!");
  await chat("pizzachat", "Joy", "Who puts broccoli on pizza?!");
  await chat("pizzachat", "Disgust", "That's it. I am done.");
  await chat(
    "pizzachat",
    "Anger",
    "Congratulations, San Francisco! You've ruined pizza?!"
  );
  process.exit(0);
})().catch(e => console.log(e));
