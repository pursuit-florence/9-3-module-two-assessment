const form = document.querySelector("form")
const h3 = document.createElement("h3")

const year = document.createElement("p");

const description = document.createElement("p")

const displayInfo = document.querySelector("#display-info")

const select = document.querySelector("select")



let movieSelected = ""

const strong = document.createElement("STRONG")

const reset =  document.getElementById("reset-reviews")

const inputs = document.querySelectorAll("input")

//const showPeople = document.querySelector("#show-people")

const showPeople = document.getElementById("show-people")

let oneMovie = {}


const url = "https://resource-ghibli-api.onrender.com/films"




fetch(url)
.then((response) =>{
  response.json()
  .then((result) =>{
    
    getMovie(result)
    movieDetails(result)
    makeAreview (result)
   
    
  })
  .catch()
})


function getMovie(movie){

  for(let i= 0; i < movie.length; i++){
  
  const option = document.createElement("option")
  option.value = movie[i].title
  option.textContent = movie[i].title
  select.append(option)
  
  }
}

function movieDetails(details){
  select.addEventListener("change",()=>{
    for (const li of document.querySelectorAll(".lis2")) {li.remove(); }
    h3.innerText = select.value
    movieSelected = select.value
    oneMovie = details.find((movie)=>
    movie.title === movieSelected
    )
   
    details.forEach((film)=>{
  if(select.value===film.title){
    description.innerText = film.description
  }
  if(select.value===film.title){
    year.innerText = film.release_date
  }
})
  
})
 displayInfo.before(h3)
 displayInfo.appendChild(year)
 displayInfo.appendChild(description)
 }

  function  makeAreview(views){
    form.addEventListener("submit",(event)=>{
      event.preventDefault()
      
    for(let i = 0; i < views.length; i++){
      if(select.value === "") {
        alert("Please select a movie first")
        select.remove("")
        break
       }else{
        const unorderedList = document.querySelector("ul")
        const li = document.createElement("li")
      li.setAttribute("class","deleteLi")
        let review = event.target.review.value
        if(select.value===views[i].title){
         li.innerHTML = `<strong>${views[i].title}: </strong> ${review}`
         unorderedList.append(li)
         form.reset()
        }
       }
      }
     
      
   })
   
  }
 
  reset.addEventListener("click",(event)=>{
  event.preventDefault()
  const deleteAll = document.querySelectorAll(".deleteLi")
  for(let i = 0; i < deleteAll.length; i++){
    deleteAll[i].remove()
  }
  })
  
  
  function armarOL (celebrities,allP) {
    const ol = document.querySelector("ol")
    celebrities.map((actor) => {
        let bioDetail = allP.find((bio) => bio.id === actor.slice(8))
        if (bioDetail != undefined) {
        const li = document.createElement("li")
        li.setAttribute("class","lis2")
        li.textContent = bioDetail.name
        ol.append(li)
        }
    })
}
   
   showPeople.addEventListener("click",(event) =>{
      event.preventDefault()
      for (const li of document.querySelectorAll(".lis2")) {li.remove(); }
  const base_url ="https://resource-ghibli-api.onrender.com/people" 
   fetch(base_url)
    .then((response) =>{
    response.json()
    .then((results) =>{
      armarOL(oneMovie.people,results)
         })
    })
    .catch((error)=>{
      console.log(error)
    })

   })
   
  
// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here
}



// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
