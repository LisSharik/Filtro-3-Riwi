//IMPORTS
import * as functionsGenerals from "/js/functionsGenerals.js"
import * as URLS from "/js/URLS.js"

//SELECTS
const formNewJob = document.querySelector("#formNewJob")
const nameCompany = document.querySelector("#nameCompany")
const imageCompany = document.querySelector("#imageCompany")

//Inputs
const titleJob = document.querySelector("#title-job")
const experience = document.querySelector("#experience")
const salary = document.querySelector("#salary")
const location = document.querySelector("#Location")
const modality = document.querySelector("#modality")
const description = document.querySelector("#description")
const jobsVisibility = document.querySelector("#jobsVisibility")

const btnModal = document.querySelector("#btnModalJobs")
const logOut = document.querySelector("#logOut")


const tbody = document.querySelector("#tableJobs")
console.log(tbody);

let companyVerfied = JSON.parse(localStorage.getItem("verified"))
console.log(companyVerfied);
companyVerfied.forEach(company =>{
    companyVerfied = company
})

console.log(companyVerfied.id);

//EVENTOS
document.addEventListener("DOMContentLoaded",async ()=>{
  
    nameCompany.textContent = companyVerfied.nameCompany
    imageCompany.src = companyVerfied.imageCompany
    paintJobs()
})

logOut.addEventListener("click",(event)=>{
    event.preventDefault()
    localStorage.clear()
    window.location.href = "index.html"

})

formNewJob.addEventListener("submit",(event)=>{
    event.preventDefault()
    if(jobsVisibility.value){
        console.log("andamos actualizando");
        updateDataJobs(jobsVisibility.value)

    }else{
        addJob()
    }
})


function addJob(){
    
    const newJob = {
        title: titleJob.value,
        description: description.value,
        publicationDate: new Date().toISOString().split("T")[0],
        location: location.value,
        experience: experience.value,
        modality: modality.value,
        salary: salary.value,
        companyId: companyVerfied.id,
    }

    functionsGenerals.addData(newJob, URLS.URLJobs) 

}

async function paintJobs(){
    const dataJobs = await functionsGenerals.getData(`${URLS.URLJobs}?_embed=company&companyId=${companyVerfied.id}`);
    console.log(dataJobs);

    dataJobs.forEach(job=>{
   
        console.log(job);
        const tr = document.createElement("tr")
        console.log(tbody);
        const tdimg = document.createElement("td")
        const img = document.createElement("img")
        img.src = companyVerfied.imageCompany
        img.alt = `Logo ${companyVerfied.nameCompany}`
        img.width = "50"
        img.height="50"
        img.classList.add("rounded-circle","img-company")

        const tdComapanyName = document.createElement("td");
        tdComapanyName.textContent = companyVerfied.nameCompany

        const tdDescription = document.createElement("td")
        tdDescription.textContent = job.description

        const tdLocation = document.createElement("td");
        tdLocation.textContent = job.location

        const tdExperience = document.createElement("td")
        tdExperience.textContent = `${job.experience} años`

        const tdModality = document.createElement("td")
        tdModality.textContent = job.modality

        const tdSalary = document.createElement("td")
        tdSalary.textContent = `$${(Number.parseInt(job.salary)).toLocaleString("en-US")}`

        const tdButtons = document.createElement("td")
        const btnEdit = document.createElement("button")
        btnEdit.classList.add("btn", "btn-primary")
        btnEdit.innerHTML = `<i class="bx bx-edit"></i>`

        const btnDelete = document.createElement("button")
        btnDelete.classList.add("btn", "btn-danger")
        btnDelete.innerHTML = `<i class="bx bx-trash"></i>`


        btnEdit.addEventListener("click",()=>{ 
            loadDataJobs(job)
            btnModal.click()
        })

        btnDelete.addEventListener("click",()=>{
            deleteJobs(job.id)
        })

        tdimg.appendChild(img)
        tdButtons.appendChild(btnEdit)
        tdButtons.appendChild(btnDelete)

        tr.appendChild(tdimg)
        tr.appendChild(tdComapanyName)
        tr.appendChild(tdDescription)
        tr.appendChild(tdLocation)
        tr.appendChild(tdExperience)
        tr.appendChild(tdModality)
        tr.appendChild(tdSalary)
        tr.appendChild(tdButtons)

        

        tbody.appendChild(tr)
    })

}


function loadDataJobs(dataJobs){
    console.log("->",dataJobs);
    titleJob.value = dataJobs.title
    experience.value = dataJobs.experience
    salary.value = dataJobs.salary
    location.value = dataJobs.location
    modality.value = dataJobs.modality
    description.value = dataJobs.description

    jobsVisibility.value = dataJobs.id

}

function updateDataJobs(id){
    const updateJob = {
        id:id,
        title: titleJob.value,
        description: description.value,
        publicationDate: new Date().toISOString().split("T")[0],
        location: location.value,
        experience: experience.value,
        modality: modality.value,
        salary: salary.value,
        companyId: companyVerfied.id,
    }
    functionsGenerals.updateData(URLS.URLJobs,id,updateJob)

}


function deleteJobs(id){
    functionsGenerals.deleteData(URLS.URLJobs,id)
}