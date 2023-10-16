class View {
  _parentElement = document.querySelector(".countries");
  #markup;

  renderCountries(data){
    this.#markup = data.map(country => {
      return `
        <div class="country">
          <img src="${country.flags.png}" alt="flag"/>
          <div>
            <h2 class="heading-secondary name">${country.name.official}</h2>
            <p class="population"><span class="bold">Population:</span>${country.population}</p>
            <p class="region"><span class="bold">Region:</span>${country.continents[0]}</p>
            <p class="capital"><span class="bold">Capital:</span>${country.capital?.[0] || "None"}</p>
          </div>
        </div>
      `;
    }).join("");

    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin",this.#markup);
  }

  renderMessage(msg){
    const markup = `
      <p class="message">${msg}</p>
    `;
    this._parentElement.insertAdjacentHTML("afterbegin",markup);
  }

  addScrollToTop(){
    const scrollIcon = document.querySelector(".scroll-top");
    window.addEventListener("scroll", function(e){
      if(window.innerHeight < window.pageYOffset){
        scrollIcon.classList.remove("hidden");
      } else scrollIcon.classList.add("hidden");
    });

    scrollIcon.addEventListener("click",function(e){
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  modeSwith(){
    const modeBody = document.querySelector("body");
    const modeHeader = document.querySelector(".header");
    const modeSearchCountry = document.querySelector(".search-country");
    const modeInput = document.querySelector(".input");
    const modeSelect = document.querySelector(".select");
    const modeCountry = document.querySelector(".countries");
    const modeSwitch = document.querySelector(".mode-switch");
    const modeBtnBack = document.querySelector(".btn-back");
    // const modeCountryName = document.getElementById("country-name");
    // const modeSelectWhere = document.getElementById("select-where");
    let index = 0;
    modeSwitch.addEventListener("click",function(){
      modeBody.classList.toggle("dark");
      modeHeader.classList.toggle("dark");
      modeSearchCountry.classList.toggle("dark");
      modeInput.classList.toggle("dark");
      modeSelect.classList.toggle("dark");
      modeCountry.classList.toggle("dark");
      
      modeSwitch.classList.toggle("dark");
      // modeCountryName.classList.toggle("dark");
      // modeSelectWhere.classList.toggle("dark");
      modeBtnBack.classList.toggle("dark");

      if(index === 0){
        modeSwitch.textContent = "☀️ Light Mode";
        index = 1;
      } else if(index === 1) {
        modeSwitch.textContent = "🌙 Dark Mode";
        index = 0;
      }
    })
  }

  openCountry(data){
    this._parentElement.addEventListener("click",function(e){
      const countryName = e.target.closest(".country").querySelector(".name").textContent;
      if(!countryName) return;
      document.querySelector(".country-details").classList.remove("hidden");
      
      data.forEach(country => {
        if(country.name.official === countryName){
          document.querySelector(".countries").classList.add("hidden");
          document.querySelector(".section-form").classList.add("hidden");

          // const markup =  `
          //     <div class="country-details">
          //     <button class="btn btn-back">⬅️ Back</button>
          //     <div class="grid">
          //       <img src="${country.flags.png}" alt="flag" />
          //       <div class="column-second">
          //         <h3 class="heading-tertiary">${country.official.name}</h3>
          //         <div class="details">
          //           <div class="first-half">
          //             <p><span class="bold">Native Name:</span>3,700,000</p>
          //             <p><span class="bold">Population:</span>${country.population}</p>
          //             <p><span class="bold">Region:</span>${country.region}</p>
          //             <p><span class="bold">Sub Region:</span>3,700,000</p>
          //             <p><span class="bold">Capital:</span>${country.capital}</p>
          //           </div>
          //           <div class="second-half">
          //             <p><span class="bold">Top Level Domain:</span>3,700,000</p>
          //             <p><span class="bold">Currencies:</span>3,700,000</p>
          //             <p><span class="bold">Languages:</span>3,700,000</p>
          //           </div>
          //         </div>
          //         <div class="border-coutries">
          //           <p class="bold">Border Countries:</p>
          //             <div class="border-coutries--name">
          //               <span>Name</span>
          //               <span>Name</span>
          //               <span>Name</span>
          //             </div>
          //           </div>
          //         </div>
          //       </div>
          //     </div>
          // `;

          document.querySelector(".heading-tertiary").textContent = country.name.official;
          document.querySelector(".img--detail").src = country.flags.png;

          const [{official: nativeName}] = Object.values(country.name.nativeName);
          document.querySelector(".native-name--detail").textContent = nativeName;
          document.querySelector(".population--detail").textContent = country.population;
          document.querySelector(".region--detail").textContent = country.region;
          document.querySelector(".sub-region--detail").textContent = country.subregion ? country.subregion : "None";
          document.querySelector(".capital--detail").textContent = country.capital?.[0];
          document.querySelector(".top-level-domain--detail").textContent = country.tld?.[0];

          const [currency] = Object.entries(country.currencies);
          document.querySelector(".currencies--detail").textContent = currency.map(cur => cur.name).join("");
          document.querySelector(".languages--detail").textContent =  Object.values(country.languages).join(", ");

          if(country.borders){
            const neighbours = country.borders;
            const neighboursFullName = neighbours.map(neigh => {
              const neighborCountry = data.find(cnt => cnt.cca3 === neigh);
              return neighborCountry ? neighborCountry.name.official : 'Unknown';
            });

            document.querySelector(".border-coutries--name").innerHTML = "";
            neighboursFullName.forEach(cntr => {
              const markup = `
                <span>${cntr}</span>
              `;
              document.querySelector(".border-coutries--name").insertAdjacentHTML("afterbegin",markup);
            });
            
          }
        }
      });
    });
  }
}

export default new View();