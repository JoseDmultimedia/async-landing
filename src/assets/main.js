
const API = "https://api.nasa.gov/planetary/apod";

const date = new Date();

const container = document.getElementById('content')

let today =
  date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
let lasFivetDays =
  date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() - 5);

const url = new URL(API);
url.searchParams.append("api_key", 'AQUI EL API KEY');
url.searchParams.append("start_date", lasFivetDays);
url.searchParams.append("end_date", today);

async function dataFecth(urlApi) {
  const response = await fetch(urlApi);
  const data = await response.json();
  return data;
}

const cards = async() => {
  const dataObj = await dataFecth(url);  
  const cardsStructure = dataObj.map((obj) => { 
    return`
    <div class="card" style="width: 18rem;">
        ${obj.media_type === 'image' ? `<img src="${obj.url}" class="card-img-top" alt="${obj.title}">` : 
        ` <iframe 
        src="${obj.url}">
        </iframe>  `}
        <div class="card-body">
            <h5 class="card-title">${obj.title}</h5>
            <p class="card-text">${obj.explanation}</p>
            <a href="https://www.nasa.gov/" class="btn btn-primary">Go to Nasa</a>
        </div>
    </div>
    `;
});
  container.innerHTML = cardsStructure.join('');
}

cards();



