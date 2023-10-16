import view from "./view.js";

const parentElement = document.querySelector(".countries")

export const getCountries = async function(){
  const res = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await res.json();
  return data;
}

export const goBackToMainPage = function(){
  document.querySelector(".btn-back").addEventListener("click",function(){
    document.querySelector(".section-form").classList.remove("hidden");
    document.querySelector(".countries").classList.remove("hidden");
    document.querySelector(".country-details").classList.add("hidden");
  });
}

export const searchCountry = function(data){
  // Prevent page from relaoding
  document.querySelector(".form").addEventListener("submit", function(e){
    e.preventDefault();
  });

  const searchBar = document.getElementById("country-name");
  searchBar.addEventListener("input",function(){
    parentElement.innerHTML = "";
    const filteredData = data.filter(cnt =>
      cnt.name.official.toLowerCase().includes(searchBar.value.toLowerCase())
    );
    if (filteredData.length === 0) {
      view.renderMessage("No matching countries found.");
    } else {
      view.renderCountries(filteredData);
    }
  })
}

// export const sortCountries = function(data){
//   const continentEl = document.getElementById("select-where");
  
//   const continent = continentEl.value;
//   if(continent === "") sortedData = data;

//   const sortedData = data.filter(cnt => {
//     return String(cnt.region.trim().toLowerCase()) == String(continent.trim());
//   });
//   return sortedData;

// }

// const dataHandler = function(data){
//   return data;
// }