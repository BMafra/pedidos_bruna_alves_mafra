const { initializeApp, applicationDefault, cert } = require('firebase/app');
const {
    getFirestore,
    collection,
    getDocs,
    setDoc,
    addDoc,
    query,
    where,
    getDoc,
    deleteDoc,
    doc }
    = require('firebase/firestore/lite');
//conecta bd

const firebaseConfig = {
    apiKey: "AIzaSyATlz9rvBl4MwNM-2tJ1E1ENV6hDcSacJE",
    authDomain: "cc-pedidos-bruna.firebaseapp.com",
    projectId: "cc-pedidos-bruna",
    storageBucket: "cc-pedidos-bruna.appspot.com",
    messagingSenderId: "920302470640",
    appId: "1:920302470640:web:7c19d00baecaeb06a94935",
    measurementId: "G-RBL673H43T"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

async function save(nomeTabela, id, dado) {
    console.log("entrou");
    if (id) {
        const referenceEntity = await setDoc(doc(db, nomeTabela, id), dado);
        const savedData = {
            ...dado, //savedData = dado / duplicando/ tira referencia de memoria
            id: id
        }
        return savedData
    } else {
        const referenceEntity = await addDoc(collection(db, nomeTabela), dado);
        const savedData = {
            ...dado, //savedData = dado / duplicando
            id: referenceEntity.id
        }
        return savedData;
    }
}

async function get(nomeTabela) {
    const tableRef = collection(db, nomeTabela);

    const q = query(tableRef,);

    const lista = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const data = {
            ...doc.data(),
            id: doc.id
        }
        lista.push(data);
        // console.log(doc.id, " => ", doc.data());
    });
    return lista;
}

async function getById(nomeTabela, id) {
    const docRef = doc(db, nomeTabela, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Usuário encontrado! (crud)")
        return docSnap.data();
    } else {
        console.log("Erro ao encontrar usuário! (crud)")
    }
}

async function remove(nomeTabela, id) {
    const dado = await deleteDoc(doc(db, nomeTabela, id))
    return {
        massage: `${id} deleted`
    }
}

module.exports = {
    save,
    get,
    getById,
    remove
}