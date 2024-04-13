//IMPORTS
import { URLCompanies } from "/js/URLS.js"
import * as functionsGenerals from "/js/functionsGenerals.js"


//SELECTORES

//inputs
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const passwordConfirmation = document.querySelector("#password-confirmation")
const company = document.querySelector("#company")
const imgCompany = document.querySelector("#img-company")


//form
const formRegister = document.querySelector("#formRegister")


formRegister.addEventListener("submit",(event)=>{
    event.preventDefault()
    verifyData()
})


async function verifyData(){
    let nuevoNit = Date.now()
    const companiesData = await functionsGenerals.getData(URLCompanies)
    console.log(companiesData);   
    console.log(await functionsGenerals.verifyData(URLCompanies,"email",email.value));

    if(await functionsGenerals.verifyData(URLCompanies,"email",email.value)){
        console.log("Email ya existe");
        return
    }

    if(verifyNit(companiesData)){
        console.log("El nit ya esta registrado intentalo mas tarde");
        return
    }

    if(!verifyPassword(nuevoNit)){
        console.log("Contraseña no valida");
        return
    }

    addCompany(nuevoNit)
}


function addCompany(nuevoNit){
    const  newCompany = {
        email: email.value,
        password: password.value,
        nameCompany: company.value,
        imageCompany: imgCompany.value,
        nit: nuevoNit
    }

    functionsGenerals.addData(newCompany, URLCompanies)
    window.location.href = "index.html"

}

function verifyNit(dataCompanies, nuevoNit){
   
    let verifyNit
    dataCompanies.forEach(company => {    
        if(company.nit == nuevoNit){        
           verifyNit = true

        }else{
            verifyNit = false
        }
    });

    return verifyNit
}

function verifyPassword(){
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    return password.value === passwordConfirmation.value && regex.test(password.value)
}





