//IMPORTS
import { URLCompanies } from "/js/URLS.js"
import * as functionsGenerals from "/js/functionsGenerals.js"

//SELECTORES
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const formLogin = document.querySelector("#formLogin");

formLogin.addEventListener("submit",(event)=>{
    event.preventDefault()
    verifyData()

})


async function verifyData(){
    const dataCompany = await functionsGenerals.getData(`${URLCompanies}?email=${email.value}`) 
    console.log(dataCompany);

    dataCompany.forEach(company=>{
        console.log(company);
        if(!company){
            console.log("Email no valido");
            return
        }

        if(!company.password === password.value){
            console.log("contraseña no valida");
            return
        }
        
    })

    localStorage.setItem("verified", JSON.stringify(dataCompany))
    window.location.href = "administrator.html"

}



