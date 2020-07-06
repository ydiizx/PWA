const dbPromised = idb.open("BallDb-V1", 1, upgradeDb => {
  const footballStore = upgradeDb.createObjectStore("team", {
    keyPath: "id"
  });
  footballStore.createIndex("teamName" , "name", {unique: false})
})

function cekData(id) {
  return new Promise((resolve, reject) => {
    dbPromised
      .then(db => {
        const tx = db.transaction("team", "readonly")
        const store = tx.objectStore("team")
        return store.get(id)
      })
      .then(team => {
        if (team !== undefined) {
          resolve(true)
        } else {
          reject(false)
        }
      })
  })
}

function saveTeam(team) {
  const objTeam = {
    id:team.id,
    name:team.name,
    shortName: team.shortName,
    address:team.address,
    founded:team.founded,
    squad:team.squad,
    email:team.email,
    website:team.website,
    crestUrl:team.crestUrl
  }

  dbPromised
    .then(db => {
      const tx = db.transaction("team", "readwrite")
      const store = tx.objectStore("team")
      store.add(objTeam);
      return tx.complete;
    })
    .then( () => {
      M.toast({html:"Team Saved"})
    })
}

function getAll() {
  return new Promise((resolve, reject) => {
    dbPromised
      .then(db => {
        const tx = db.transaction("team", "readonly")
        const store = tx.objectStore("team")
        return store.getAll()
      })
      .then(team => {
        resolve(team)
      })
      .catch(error => {
        reject(error)
      })
  })
}

function getSavedTeam(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(db => {
        const tx = db.transaction("team", "readonly")
        const store = tx.objectStore("team")
        return store.get(id)
      })
      .then(team => {
        resolve(team)
      })
      .catch(error => {
        reject(error)
      })
  })
}

function deleteTeam(id) {
  dbPromised
    .then(db => {
      const tx = db.transaction("team", "readwrite")
      const store = tx.objectStore("team")
      store.delete(id);
      return tx.complete;
    })
    .then(() => {
      document.getElementById("icon").innerHtml = "save";
      M.toast({html:"Team Dihapus"})
    })
}