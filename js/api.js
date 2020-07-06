const date = new Date();
const idLiga = 2001;
const baseUrl = "https://api.football-data.org/v2/";
const ligaChampUrl = `${baseUrl}competitions/${idLiga}/standings`;
const matchesUrl = `${baseUrl}competitions/${idLiga}/matches`;
const teamUrl = `${baseUrl}teams/`;
const token = 'e51b44fa73a64523841ab71d0cb48097';

const options = {
  headers :{
    "X-Auth-Token":token
  }
}

function fetchApi(url) {
  return fetch(url, options);
}

function status(response) {
  if (response.status !== 200){
    console.log("ERROR : " , response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function parse(response) {
  return response.json();
}

function error(error){
  console.log("Error : " , error)
}

const standingData = () => {
  if ("caches" in window) {
    caches.match(ligaChampUrl).then(response => {
      if (response) {
        response.json().then(data => {
          getStanding(data);
        })
      }
    })
  }

  fetchApi(ligaChampUrl, options)
  .then(status)
  .then(parse)
  .then(dataJson => {
    getStanding(dataJson)
  })
  .catch(error);
}

const matchData = () => {
  if ("caches" in window) {
    caches.match(matchesUrl).then(response => {
      if (response) {
        response.json().then(data => {
          getMatch(data);
        })
      }
    })
  }

  fetchApi(matchesUrl, options)
  .then(status)
  .then(parse)
  .then(dataJson => {
    getMatch(dataJson);
  })
  .catch(error);
}

function teamById() {
  return new Promise(resolve => {
    const urlParam = new URLSearchParams(window.location.search)
    const idTeam = urlParam.get("id")
    
    if("caches" in window) {
      caches.match(teamUrl + idTeam).then(response => {
        if (response) {
          response.json().then(data => {
            getTeamById(data);
            resolve(data)
          })
        }
      })
    }
  
    fetchApi(teamUrl + idTeam, options)
    .then(status)
    .then(parse)
    .then(dataJson => {
      getTeamById(dataJson);
      resolve(dataJson)
    })
    .catch(error)
  })
}


