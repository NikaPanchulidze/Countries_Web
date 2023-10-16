import * as model from "./model.js";
import view from "./view.js";

let countriesData = [];
let sortedData = [];
const continent = document.getElementById("select-where");

const loadData = async function(){
  countriesData = await model.getCountries();
  
  view.renderCountries(countriesData);
  sortHandler(countriesData);

  if(model.searchCountry(countriesData)){
    model.searchCountry(countriesData);
  }
  openCountry();
}

const openCountry = function(){
  view.openCountry(countriesData);
}

const sortHandler = function(data){
  if(continent.value === "") sortedData = countriesData;
  document.getElementById("select-where").addEventListener("change",function(){
    if(continent.value === "") sortedData = data;
    else {
      sortedData = data.filter(cnt => {
        return String(cnt.region.trim().toLowerCase()) == String(continent.value.trim());
      });
    }
    model.searchCountry(sortedData);
    view.renderCountries(sortedData);
  });
}

const init = function(){
  loadData();
  model.goBackToMainPage();
  view.addScrollToTop();
  view.modeSwith();
}
init();
