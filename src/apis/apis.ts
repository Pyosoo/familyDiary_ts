import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
};

export function ReadUser(id: string) {
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
    const dataRef = database.ref(`/user/${id}`);

    dataRef
        .once("value")
        .then((snapshot) => {
            const data = snapshot.val();
            console.log("Data from Firebase:", data);
        })
        .catch((error) => {
            console.error("Error reading data:", error);
        });
}

export function AddUser(id: string) {
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();

    const dataRef = database.ref(`/user/${id}`);
    dataRef
        .set(id)
        .then(() => {
            console.log("Data written successfully.");
        })
        .catch((error) => {
            console.error("Error writing data:", error);
        });
}
