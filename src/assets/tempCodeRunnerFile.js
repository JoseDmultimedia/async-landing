import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const API = "https://api.nasa.gov/planetary/apod";

const date = new Date();

// const container = document.querySelector('content')

let today =
  date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
let lasFivetDays =
  date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() - 5);

const url = new URL(API);
url.searchParams.append("api_key", process.env.SECRETKEY);
url.searchParams.append("start_date", lasFivetDays);
url.searchParams.append("end_date", today);

async function dataFecth(urlApi) {
  const response = await fetch(urlApi);
  const data = await response.json();
  return data;
}

const dataObj = dataFecth(url);

const cards = async() => {
  const dataObj = await dataFecth(url);  
  return dataObj.map((obj) => { `
    <div class="card" style="width: 18rem;">
        <img src="${obj.url}" class="card-img-top" alt="${obj.title}">
        <div class="card-body">
            <h5 class="card-title">${obj.title}</h5>
            <p class="card-text">${obj.explanation}</p>
            <a href="https://www.nasa.gov/" class="btn btn-primary">Go to Nasa</a>
        </div>
    </div>
    `;
});
}

// container.innerHTML = cards.join('');

console.log(dataObj, cards);
