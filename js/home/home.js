//IMPORTS
import * as functionsGenerals from "/js/functionsGenerals.js"
import * as URLS from "/js/URLS.js"

//SELECTORS
const container = document.querySelector(".container")

//Inputs
const modalityFilter = document.querySelector("#modality-filter")
const searchJobs = document.querySelector("#searchJobs")

const btnSearch = document.querySelector("#btnSearch")

let dataJobs
//Eventos
document.addEventListener("DOMContentLoaded", async ()=>{
    dataJobs = await functionsGenerals.getData(`${URLS.URLJobs}?_embed=company`)
    paintJobs(dataJobs)
})

btnSearch.addEventListener("click",(event)=>{
    event.preventDefault()
    console.log("es el boton");
    
    console.log(dataJobs.filter(job => job.title === searchJobs.value));
    filter()
})

async function paintJobs(dataJobs){ 
   functionsGenerals.cleanContainer(container)

   dataJobs.forEach(job => {
     
        container.innerHTML += `
        <div class="card-job">
        <h2>${job.title}</h2>

        <p>${job.description}</p>

        <div class="row">
          <div class="col-6">
            <div class="d-flex gap-2 align-items-center fs-5 text-muted">
              <i class="bx bx-current-location"></i>
              <span class="fw-semibold">${job.location}</span>
            </div>

            <div class="d-flex gap-2 align-items-center fs-5 text-muted">
              <i class="bx bx-time"></i>
              <span class="fw-semibold">${job.publicationDate}</span>
            </div>
          </div>

          <div class="col-6 d-flex justify-content-end">
            <img
              src= ${job.company.imageCompany}
              alt="logo"
              height="80"
              width="80"
              class="object-fit-contain rounded-circle img-company"
            />
          </div>
        </div>
      </div>
        `
    });
}


function filter(){
        const resultado = dataJobs.filter(filterByTitleJob).filter(filterByModality)

          console.log(resultado);
        paintJobs(resultado)
      
 
}


function filterByTitleJob(dataJob){

    console.log(dataJob.title);
    if (searchJobs.value) {
       return searchJobs.value === dataJob.title
    }
    return dataJob
    
}

function filterByModality(dataJob){

    console.log(dataJob.title);
    if (modalityFilter.value) {
       return modalityFilter.value === dataJob.modality
    }


    return dataJob
    
}
