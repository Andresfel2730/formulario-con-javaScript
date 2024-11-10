
// TODO: Replace the following with your app's Firebase project configuration

const { error } = require("console");

// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyBwo_mLvhJkTwmM5-Y6NWjd-U3BHSMh2kA",
  authDomain: "datos-formulario-69c15.firebaseapp.com",
  projectId: "datos-formulario-69c15",
  storageBucket: "datos-formulario-69c15.firebasestorage.app",
  messagingSenderId: "707368531293",
  appId: "1:707368531293:web:0061c73c3ffb7da305a4b4",
  measurementId: "G-4WJG1NY6JW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById('formulario').addEventListener('submit', (Event) =>{
    Event.preventDefault()

    //VALIDAR EL CAMPO DE NOMBRE
let entradaNombre = document.getElementById('name')
let errorNombre = document.getElementById('nameError')
if(entradaNombre.value.trim()===''){
    errorNombre.textContent = 'Por favor, introduce tu nombre'
    errorNombre.classList.add('error-message')
}else{
    errorNombre.textContent = ''
    errorNombre.classList.remove('error-message')
}

    //VALIDAR EL CORRE ELECTRONICO
let emailEntrada = document.getElementById('email')
let emailError = document.getElementById('emailError')
let emailPattern = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/; //patron de validacion basico
if(!emailPattern.test(emailEntrada.value)){
    emailError.textContent = 'Por favor, introduce un email valido'
    emailError.classList.add('error-message')
}else{
    emailError.textContent = ''
    emailError.classList.remove('error-message')
}
    //VALIDAR LA CONTRASEÑA
let contrasenaEntrada = document.getElementById('password')
let contrasenaError = document.getElementById('passwordError')
let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
if(!contrasenaPattern.test(contrasenaEntrada.value)){

    contrasenaError.textContent = 'Por favor, introduce un password con minimo 8 caracteres, numeros, minus, mayus y caracter especial'
    contrasenaError.classList.add('error-message')
}else{
    contrasenaError.textContent = ''
    contrasenaError.classList.remove('error-message')
}
    //SI TODOS LOS CAMPOS SON VALIDOS ENVIAR FORMULARIO
if(!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent){
    // BACKEND QUE RECIBA LA INFORMACION
    db.collection("users").add({
        nombre: entradaNombre.value,
        email: emailEntrada.value,
        password: contrasenaEntrada.value
    })
    .then((docRef) => {
        alert('El formulario se ha enviado con exito', docRef.id)
        document.getElementById('formulario').reset();
        
    })
    .catch((error) => {
        alert(error)    
    })
}
 
})