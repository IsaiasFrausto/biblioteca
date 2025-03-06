import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {  // Configuración de Firebase por proyecto
    apiKey: "AIzaSyC5A2OvPZZxRRhUX2DIwrImHlmd_nsgrZc",
    authDomain: "mvc-database-f0773.firebaseapp.com",
    databaseURL: "https://mvc-database-f0773-default-rtdb.firebaseio.com",
    projectId: "mvc-database-f0773",
    storageBucket: "mvc-database-f0773.firebasestorage.app",
    messagingSenderId: "787535402266",
    appId: "1:787535402266:web:5de71c48752a3f007b08a3"
};
  
// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }; // Exportamos la conexión a Firestore