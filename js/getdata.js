const convertUTC = date => {
  const months = [
    "January", "February", "March",
    "April", "May", "June", "July", 
    "August", "September", "October", 
    "November", "December"]

  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}

const getStanding = dataJson => {
  dataJson = JSON.parse(JSON.stringify(dataJson).replace(/^http:\/\//i, 'https://'));
  
  let dataBody = "";
  dataJson.standings.forEach(standing => {
    if (standing.type == "TOTAL"){
      
      let rowHtml = ''
      standing.table.forEach(item => {
        rowHtml += `
        <tr>
          <td>${item.position}</td>
          <td><img src="${item.team.crestUrl}" alt="flag" width="30px" /> ${item.team.name} </td>
        </tr>`
      })
      
      dataBody += `
      <div class="container col s12">
        <h5 class="new badge red" style="padding: 10px;">${standing.group}</h5>
        <table class="stripped highlight responsive-table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Tim</th>
            </tr>
          </thead>
          <tbody id="matches-${standing.group}">
            ${rowHtml}
          </tbody>
        </table>
      </div>`
    }
    document.getElementById("home").innerHTML = dataBody;
  })


  // dataJson.standings.forEach(peringkat => {
  //   if (peringkat.type === "TOTAL") {
  //   peringkat.table.forEach(dataTeam => {
  //     dataBody +=`
  //     <li>
  //       <div class="collapsible-header">
  //       <span style="margin-right: 10px;">${dataTeam.position}.</span>
  //       <img src="${dataTeam.team.crestUrl}" width="32" height="32" alt="${dataTeam.team.crestUrl}">
  //           <span style="margin-left: 10px;">${dataTeam.team.name}</span>
  //         </div>
  //         <a class="secondary-content" href="./detailteam.html?id=${dataTeam.team.id}" style="margin-top: -40px; margin-right: 10px;"><i class="material-icons">info</i></a>
  //         <div class="collapsible-body">
  //           <table>
  //             <tr>
  //               <th>Win</th>
  //               <td>${dataTeam.won}</td>
  //             </tr>
  //             <tr>
  //               <th>Lose</th>
  //               <td>${dataTeam.lost}</td>
  //             </tr>
  //             <tr>
  //               <th>Draw </th>
  //               <td>${dataTeam.draw}</td>
  //             </tr>
  //             <tr>
  //               <th>Points</th>
  //               <td>${dataTeam.points}</td>
  //             </tr>
  //           </table>
  //         </div>
  //       </li>
  //       `; 
  //     })
      
  //   }
  // })
  // const dataHTML = `
  //         <ul class="collapsible collection with-header white">
  //           <li class="collection-header">
  //             <h2 class="center">League One Standings</h2>
  //           </li>
  //           ${dataBody}
  //         </ul>`;
  // document.getElementById("home").innerHTML = dataHTML;
  // const colapElem = document.querySelectorAll(".collapsible")
  // M.Collapsible.init(colapElem)
}

const getMatch = dataJson => {
  let dataBody = "";
  const matches = dataJson.matches;
  const minMatch = matches.length - 10;

  for (let i = minMatch; i < matches.length; i++) {
    dataBody += `
    <li class="collection-item white black-text">
      <div class="collapsible-header">
        <div class="col s5 right-align">
          <a href="./detailteam.html?id=${matches[i].homeTeam.id}">${matches[i].homeTeam.name}.</a>
        </div>
        <div class="col s2 center-align">
          <span class="red-text accent-1">VS</span>
        </div>
        <div class="col s5 left-align">
          <a href="./detailteam.html?id=${matches[i].awayTeam.id}">${matches[i].awayTeam.name}</a>
        </div>
      </div>
      <div class="collapsible-body">
        <table>
          <tr>
            <th class="center-align">Match Day</th>
            <td class="center-align">${matches[i].matchday}</td>
          </tr>
          <tr>
            <th class="center-align">Kick Off</th>
            <td class="center-align">${convertUTC(new Date(matches[i].utcDate))}</th>
          </tr>
          <tr>
            <th class="center-align">Status</th>
            <td class="center-align">${matches[i].status}</td>
          </tr>
        </table>
      </div>
    </li>
    `
  }
  const dataHtml = `
          <ul class="collection with-header collapsible">
            ${dataBody}
          </ul>`
  document.getElementById("matchEl").innerHTML = dataHtml;
  const colapElem = document.querySelectorAll(".collapsible");
  M.Collapsible.init(colapElem);
}

function getTeamById(dataJson) {
  const data = dataJson;
  let teamHtml = "";
  let playerHtml = "";
  data.squad.forEach(player => {
    playerHtml += `
    <li class="collection-item">${player.name}</li>
    `
  })
  teamHtml += `
  <div class="row">
    <div class="col s12">
      <ul class="tabs">
        <li class="tab col s6">
          <a href="#infoteam" class="active">Info Club</a>
        </li>
        <li class="tab col s6">
          <a href="#memberteam">Team Member</a>
        </li>
      </ul>
    </div> 
    <div id="infoteam" class="col s12">
      <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img src="${data.crestUrl}" alt="${data.shortName}" class="responsive-img"/>
        </div>
        <div class="card-content">
          <span class="card-title">${data.name}</span>
          <table>
            <tr>
              <th>Name </th>
              <td>${data.name}</td>
            </tr>
            <tr>
              <th>Address </th>
              <td>${data.address}</td>
            </tr>
            <tr>
              <th>Founded in </th>
              <td>${data.founded}</td>
            </tr>
            <tr>
              <th>Website </th>
              <td>${data.website}</td>
            </tr>
            <tr>
              <th>Email </th>
              <td>${data.email}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div id="memberteam" class="col s12">
      <div class="card">
        <div class="card-content">
          <ul class="collection with-header">
            <li class="collection-header">
              <h4>List Member</h4>
            </li>
            ${playerHtml}
          </ul>
        </div>
      </div>
    </div>      
  `
  document.querySelector("#body-content").innerHTML = teamHtml;
  let tabsEl = document.querySelectorAll(".tabs")
  M.Tabs.init(tabsEl);
}

const getSavedData = () => {
  getAll().then(team => {
    let teamName = "";
    team.forEach(data => {
      console.log(data.name)
      teamName += `
      <div class="col s12">
        <div class="card medium">
          <div class="card-image waves-effect waves-block waves-light">
            <img src="${data.crestUrl}" alt="${data.name}" width="300" height="230">
          </div>
          <div class="card-content">
            <h1 class="card-title"><span class="card-title black-text">${data.name}</span></h1>
            <a class="btn-small" href="./detailteam.html?id=${data.id}&saved=true">Details</a>
          </div>
        </div>
      </div>
      `
    })
    if (teamName) {
      document.getElementById("allteam").innerHTML = teamName;
    }
  })
}

function getSavedHtml() {
  const urlParams = new URLSearchParams(window.location.search)
  const idParams = Number(urlParams.get("id"))

  getSavedTeam(idParams).then(data => {
    let teamHtml = "";
    let playerHtml = "";
    data.squad.forEach(player => {
      playerHtml += `
      <li class="collection-item">${player.name}</li>
      `
    })
    teamHtml += `
    <div class="row">
      <div class="col s12">
        <ul class="tabs">
          <li class="tab col s6">
            <a href="#infoteam" class="active">Info Club</a>
          </li>
          <li class="tab col s6">
            <a href="#memberteam">Team Member</a>
          </li>
        </ul>
      </div> 
      <div id="infoteam" class="col s12">
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img src="${data.crestUrl}" alt="${data.shortName}" class="responsive-img"/>
          </div>
          <div class="card-content">
            <span class="card-title">${data.name}</span>
            <table>
              <tr>
                <th>Name </th>
                <td>${data.name}</td>
              </tr>
              <tr>
                <th>Address </th>
                <td>${data.address}</td>
              </tr>
              <tr>
                <th>Founded in </th>
                <td>${data.founded}</td>
              </tr>
              <tr>
                <th>Website </th>
                <td>${data.website}</td>
              </tr>
              <tr>
                <th>Email </th>
                <td>${data.email}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div id="memberteam" class="col s12">
        <div class="card">
          <div class="card-content">
            <ul class="collection with-header">
              <li class="collection-header">
                <h4>List Member</h4>
              </li>
              ${playerHtml}
            </ul>
          </div>
        </div>
      </div>      
    `
    document.querySelector("#body-content").innerHTML = teamHtml;
    const tabsEl = document.querySelectorAll(".tabs")
    M.Tabs.init(tabsEl);     
  })
}