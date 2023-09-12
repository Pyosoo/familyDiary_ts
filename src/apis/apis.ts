import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { settingAction } from '@src/store/reducer/setting/setting';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);

export async function CheckUser(id: string) {
    const database = getDatabase(app); // Firebase 데이터베이스 가져오기
    const dataRef = ref(database, `/user`);

    try {
        const snapshot = await get(dataRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            let ids = Object.keys(data);
            if(ids.includes(id)){
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error reading data:", error);
    }
}


export async function AddUser(id: string) {
    const database = getDatabase(app); // Firebase 데이터베이스 가져오기
    const dataRef = ref(database, `/user/${id}`);

    const res = set(dataRef, id)
        .then(() => {
            return true;
        })
        .catch((error) => {
            console.error("Error writing data:", error);
            return error;
        });
    return res;
}

export async function makeGroup(id: string){
    
}