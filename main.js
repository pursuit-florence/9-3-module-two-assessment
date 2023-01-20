const form = document.querySelector("form")
const h3 = document.createElement("h3")

const year = document.createElement("p");

const description = document.createElement("p")

const displayInfo = document.querySelector("#display-info")

const select = document.querySelector("select")

const unorderedList = document.querySelector("ul")



const strong = document.createElement("STRONG")

const reset =  document.getElementById("reset-reviews")

const inputs = document.querySelectorAll("input")
// select.addEventListener("change",()=>{
 
// })



const url = "https://resource-ghibli-api.onrender.com/films"




fetch(url)
.then((response) =>{
  response.json()
  .then((result) =>{
    
    getMovie(result)
    movieDetails(result)
    makeAreview (result)
    getPeopleInfo(result)
    
  })
  .catch((error)=>{
    console.log(error)
  })
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
    h3.innerText = select.value
    
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
      const li = document.createElement("li")
      li.setAttribute("class","deleteLi")
    for(let i = 0; i < views.length; i++){
       let review = event.target.review.value
        if(select.value===views[i].title){
         li.innerHTML = `<strong>${views[i].title}: </strong> ${review}`
      
        }
       if(select.value === "") {
        alert("Please select a movie first")
        select.remove("")
        break
       }
      }
      unorderedList.append(li)
      form.reset()
   })
   
  }
 
  reset.addEventListener("click",(event)=>{
  event.preventDefault()
  const deleteAll = document.querySelectorAll(".deleteLi")
  for(let i = 0; i < deleteAll.length; i++){
    deleteAll[i].remove()
  }
  })
  
  const base_url ="https://resource-ghibli-api.onrender.com/people" 


  fetch(base_url)
  .then((response) =>{
    response.json()
    .then((results) =>{
      getPeopleInfo(results)
         })
    })
    .catch((error)=>{
      console.log(error)
    })



  reset.addEventListener("click",(event)=>{
  event.preventDefault()
  
   })

   function getPeopleInfo(movieInfo){
   const viewPeople = document.querySelector("#show-people")
   const li = document.createElement("li")
   const orderedList = document.querySelector("ol")
   for(let i = 0; i < movieInfo.length; i++){
     //console.log(movieInfo[i].name)
     
  
   }
   //orderedList.appendChild(li)

}

  
// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here
}



// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
