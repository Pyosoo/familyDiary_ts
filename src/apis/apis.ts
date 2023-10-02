import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set } from 'firebase/database';
import moment from 'moment';

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



// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 유저 관련 ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

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
    let pattern = /[.#$\[\]]/;
    if(pattern.test(id)){
        return {
            success: false,
            message: `특수문자 ".", "#", "$", "[", "]" 는 포함할수 없습니다.`
        };
    } else {
        const dataRef = ref(database, `/user/${id}`);
        const res = set(dataRef, {
            id: id,
            group: false,
            groupLeader: ""
        })
            .then(() => {
                return {
                    success: true,
                    message:"회원가입에 성공했습니다."
                };
            })
            .catch((error) => {
                console.error("Error writing data:", error);
                return error;
            });
        return res;
    }
   
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







// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 그룹 관련 ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export async function makeGroup(id: string){
    const database = getDatabase(app);
    const groupRef = ref(database, `/group/${id}/${id}`);
    const userRef = ref(database, `/user/${id}`);

    try{
        const snapshot = await get(groupRef);
        const userInfo = await get(userRef);
        const val1 = snapshot.val();
        const val2 = userInfo.val();
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

export async function inviteGroup(leader: string, id: string){
    // 그룹장만이 그룹을 초대할 수 있다. 
    // 초대하려는 id를 입력

    const database = getDatabase(app);
    const groupRef = ref(database, `/group/${leader}`);
    const userRef = ref(database, `/user/${id}`);

    try {
        console.log('inviteGroup')
        const groupInfo = await get(groupRef);
        const userInfo = await get(userRef);
        const val1 = groupInfo.val();
        const val2 = userInfo.val();
        if(groupInfo.val() === null){ // 해당 email로 그룹이 존재하지 않으면 그룹이 없는것
            return {
                success: false,
                message: "그룹이 존재하지 않습니다."
            };
        } else if(
            val1 && 
            !Object.keys(val1).includes(id) &&
            val2
        ){
            await set(groupRef, {
                ...val1,
                [id]: {
                    id: id,
                    position: 'member'
                }
            })
            .catch(err => {
                return {
                    success: false,
                    message: "그룹원 초대에 실패했습니다."
                }
            })

            await set(userRef, {...val2, group: true, groupLeader: leader})
                .catch(err => console.log(err))

        } else if(val2 === null) {
            return {
                success: false,
                message: "해당 유저가 존재하지 않습니다."
            }
        } else {
            return {
                success: false,
                message: "알수 없는 오류."
            }
        }
        
        return {
            success: true,
            message: '그룹원 초대에 성공했습니다.'
        }
    } catch(err) {
        console.log(err)
    }
}

export async function getGroupList(id: string){
    // 해당 id로 그룹에서 먼저 찾는다
    // 1. 해당 아이디 db user에서 groupLeader를 찾아서 가져옴
    // 2. 해당 groupLeader로 group에서 아이디만 추출.

    const database = getDatabase(app);
    const groupRef = ref(database, `/group/`);
    const userRef = ref(database, `/user/${id}`);
    let result = [];
    try{
        const userInfo = await get(userRef);
        if(userInfo.val().groupLeader){
            const groupInfo = await get(ref(database, `/group/${userInfo.val().groupLeader}`));
            result = Object.keys(groupInfo.val());
        }
        return result;
    } catch(err) {
        console.log(err);
    }
}

export async function deleteGroupMember(leader: string, id: string){
    // group leader만이 할 수 있다

    const database = getDatabase(app);
    const groupRef = ref(database, `/group/${leader}`);
    const userRef = ref(database, `/user/${id}`);

    const groupValue = await get(groupRef);
    const userValue = await get(userRef);

    try{
        let newGroup = {...groupValue.val()};
        delete newGroup[id];
        await set(groupRef, newGroup)
        await set(userRef, {
            ...userValue.val(), 
            groupLeader: ""
        })

        return {
            success: true,
            message: "그룹원을 삭제했습니다."
        }
    } catch(err) {
        console.log(err);
    }
}




// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 일기 관련 ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export async function writeDiary(id:string, title:string, content:string){
    const database = getDatabase(app);
    let curDate = new Date();
    let curD = moment(curDate).format('YYYY_MM_DD');
    let path = `/diary/${curD}`;
    const diaryRef = ref(database, path)
    const diarys = await get(diaryRef);
    try{
        let newDiarys = {
            ...diarys.val(), 
            [id]:{
            id: id,
            title: title,
            content: content
        }};
        await set(diaryRef, newDiarys);
        return {
            success: true,
            message: "일기를 추가했습니다."
        }
    } catch(err) {
        console.log(err);
    }
}

export async function loadDiary(id:string, date: Date){
    const database = getDatabase(app);
    let path = moment(date).utc(true).format('YYYY_MM_DD');
    const diaryRef = ref(database, `/diary/${path}`);
    const userRef = ref(database, `/user/${id}`);

    try{
        const res = await get(diaryRef);
        const userInfo = await get(userRef);
        const groupMembers = await getGroupList(userInfo.val().groupLeader)
        return Object.values(res.val()).filter((d: {id: string, content: string, title: string}) => groupMembers.includes(d.id));
    } catch (err) {
        console.log(err);
    }
}