document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search)
    const idParam = Number(urlParams.get("id"));
    const isSaved = urlParams.get("saved");
    const btnSave = document.getElementById("save");
    const backBtn = document.getElementById('back');
    let icon = document.getElementById("icon");
    let hasSaved = null;
    
    backBtn.onclick = () => {
      return window.history.back()
    }

    if (isSaved) {
      getSavedHtml();
    } else {
      var item = teamById();
    }

    cekData(idParam)
      .then( () => {
          hasSaved = true   
          icon.innerHTML = "delete";
      })
      .catch( () => {
          hasSaved = false;
          icon.innerHTML = "save";
      })

    btnSave.onclick = () => {
      if (hasSaved) {
          deleteTeam(idParam)
          icon.innerHTML = "save";
          hasSaved = false;
      } else {
          item.then(team => {
            saveTeam(team);
          })
          icon.innerHTML = "delete";
          hasSaved = true;
      }
    }
})