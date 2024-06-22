const Base_Url = "https://open.er-api.com/v6/latest/USD";
let dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const tocurr = document.querySelector(".to select");
const fromcurr = document.querySelector(".from select");
let msg = document.querySelector(".rates");

for(select of dropdowns){
  for(code in countryList){
    let option = document.createElement("option");
    option.text= code;
    option.value=code;
    if(select.name==="Convertfrom" && code==="USD"){
      option.selected="true";
    }
    else  if(select.name==="Convertto" && code==="INR"){
      option.selected="true";
    }
    select.append(option);

  }
  select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
  });

}

const updateFlag= (element)=>{
  let code = element.value;
  let countrycode= countryList[code];
  let flag = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = flag;
}

btn.addEventListener("click",async (evt)=>{
  evt.preventDefault();
  let amount = document.querySelector("input");
  let amtval= amount.value;
  if(amtval == " " || amtval <1){
    amount.value = "1";
    amtval = 1;
  }
  else{
     amtval= amount.value;
  }
  const URL = `https://open.er-api.com/v6/latest/${fromcurr.value}`
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data.rates[tocurr.value];
  let finalamount = amtval*rate;
  msg.innerText = `${amtval} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;
  
  

});

//Done and dusted


