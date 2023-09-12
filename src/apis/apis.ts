import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { settingAction } from '@src/store/reducer/setting/setting';
import wrapper from '@src/store';
import { makeStore } from '@src/store';

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

    const res = set(dataRef, {
        id: id,
        group: false,
        groupLeader: ""
    })
        .then(() => {
            return true;
        })
        .catch((error) => {
            console.error("Error writing data:", error);
            return error;
        });
    return res;
}

export async function getUser(id: string){
    const database = getDatabase(app); // Firebase 데이터베이스 가져오기
    const dataRef = ref(database, `/user/${id}`);

    try{
        const data = await get(dataRef);
        if(data) return data.val();
        else return false;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export async function makeGroup(id: string){
    console.log(id)
    const database = getDatabase(app);
    const groupRef = ref(database, `/group/${id}`);
    const userRef = ref(database, `/user/${id}`);

    try{
        const snapshot = await get(groupRef);
        const userInfo = await get(userRef);
        const val1 = snapshot.val();
        const val2 = userInfo.val();
        console.log(val1, val2)
        if(snapshot.val() === null){ // 해당 email로 그룹이 존재하지 않으면 그룹이 없는것
            await set(groupRef, {
                id: id,
                position: 'leader'
            })
                .catch(err => {
                    return {
                        success: false,
                        message: "그룹 생성에 실패했습니다."
                    }
                })
            await set(userRef, {...val2, group: true, groupLeader: id})
                .catch(err => console.log(err))
            return {
                success: true,
                message: "그룹을 생성하였습니다."
            };
        } else return {
            success: false,
            message: "이미 그룹이 존재합니다."
        }
    } catch(err){
        console.log(err)
        return {
            success: false,
            message: err
        }
    }
}

export async function searchGroup(id: string){
    // 여기서 id는 그룹장으로 검색을함. userInfo에 들어있을 것

}