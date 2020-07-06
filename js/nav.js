document.addEventListener("DOMContentLoaded", function () { 
  const getCall = {
    "home":standingData,
    "match":matchData,
    "saved":getSavedData,
  }

  const elems = document.querySelectorAll(".sidenav")
  M.Sidenav.init(elems)

  loadNav();
  function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status !== 200) return;

        document.querySelectorAll(".sidenav , .topnav").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        })

        document.querySelectorAll(".sidenav .waves-effect, .topnav .waves-effect").forEach(function (elm) {
          elm.addEventListener("click", function(event) {
            var sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close()

            page = event.target.getAttribute("href").substr(1);
            loadingPage(page);
          })
        })
      }
    }

    xhttp.open("GET" , "navbar.html" , true)
    xhttp.send()
  }

  var page = window.location.hash.substr(1)
  if (page === "" || page === "#"){
    page = "home";
  }
  loadingPage(page);
  
  function loadingPage(page) {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        var content = document.querySelector("#body-content")
        
        if (page in getCall) {
          getCall[page]()
        }
        
        if (this.status === 200) {
          content.innerHTML = xhttp.responseText;
        
        } else if (this.status === 400) {
          content.innerHTML = `<p> Content Tidak Ditenukan</p>`
        } else {
          content.innerHTML = `<p>Upss.</p>`
        }
      }

    }
    xhttp.open("GET" , "pages/" + page + ".html", true)
    xhttp.send()
  }
})