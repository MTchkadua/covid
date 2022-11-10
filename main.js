let container = document.querySelector(".container")
let selector = document.querySelector(".selector")
let resultbox = document.querySelector(".resultdiv")
let resultbox2 = document.querySelector(".resultdiv2")
let globalbox = document.querySelector(".globalbox")
let morebut = document.querySelector(".morebut")
let lessbut = document.querySelector(".lessbut")
morebut.style.display = "none"
lessbut.style.display = "none"

axios.get("https://covid-api.mmediagroup.fr/v1/cases").then((response)=>{
    console.log(response)
    
    let dataArr= Object.entries(response.data)
    // console.log(dataArr)

    //-----სელექთში დავამატოთ ქვეყნები------
    let countries = Object.keys(response.data);
    // console.log(Object.keys(response.data))
    countries.forEach((element)=>{
        let countryoptions = document.createElement("option")
        selector.appendChild(countryoptions)
        countryoptions.value = element
        countryoptions.innerHTML = element
    })

    //-----ვქმნი გლობალ ტექსტს
    let globaltxt = Object.entries(response.data.Global.All)
    console.log(globaltxt)
    globaltxt.forEach((element)=>{
        let globalp=document.createElement("p")
        globalbox.appendChild(globalp)
        globalp.innerHTML=element[0] + ": "+ element[1]

    })


    //------ვამატებ სტატისტიკას ქვეყნების მიხედვით
    selector.addEventListener("change", function(){
        resultbox.innerHTML = ""
        resultbox2.innerHTML = ""
        globalbox.style.display = "none"

        function dalageba (countryInfo){

            for(i =0; i <countryInfo.length; i++){

                let infectionrate = Math.round(countryInfo[i][1].All.confirmed * 100/countryInfo[i][1].All.population)
                let deathrate = Math.round(countryInfo[i][1].All.deaths * 100/countryInfo[i][1].All.confirmed)
                

                
                
                if(countryInfo[i][0] == selector.value){
                    let locationp = document.createElement("p");
                    let updatedp= document.createElement("p");
                    let confirmedp = document.createElement("p");
                    let populationp= document.createElement("p");

                    let deathsp = document.createElement("p");
                    let lifeexpectancyp =document.createElement("p");
                    let infectionratep = document.createElement("p")
                    let deathratep =document.createElement("p")

                    resultbox.appendChild(locationp);
                    resultbox.appendChild(updatedp);
                    resultbox.appendChild(confirmedp);
                    resultbox.appendChild(populationp);

                    resultbox2.appendChild(deathsp);
                    resultbox2.appendChild(lifeexpectancyp);
                    resultbox2.appendChild(infectionratep);
                    resultbox2.appendChild(deathratep);



                    locationp.innerHTML = "LOCATION: " + countryInfo[i][1].All.location
                    updatedp.innerHTML = "UPDATED: " + countryInfo[i][1].All.updated
                    confirmedp.innerHTML = "CONFIRMED: " + countryInfo[i][1].All.confirmed
                    populationp.innerHTML ="POPULATION: " + countryInfo[i][1].All.population

                    deathsp.innerHTML= "DEATHS: " + countryInfo[i][1].All.deaths
                    lifeexpectancyp.innerHTML = "LIFE-EXPECTANCY: "+ countryInfo[i][1].All.life_expectancy
                    infectionratep.innerHTML = "INFECTION-RATE: "+ infectionrate +"%"
                    deathratep.innerHTML = "DEATHRATE: "+ deathrate + "%"
                }
                
                


            }
        }
    dalageba(dataArr)
    resultbox2.style.display="none"
    morebut.style.display="block"
    })

    
    
    

})

morebut.addEventListener("click", function () {
    resultbox2.style.display = "block"
    morebut.style.display = "none"
    lessbut.style.display = "block"
})

lessbut.addEventListener("click", function(){
    resultbox2.style.display = "none"
    morebut.style.display = "block"
    lessbut.style.display = "none"
})

