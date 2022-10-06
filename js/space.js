let item_collection = {};

let getJSONData = function (url) {
  /* Traigo spinner */
  let result = {};
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      return result;
    });
};

function showImages() {
  let htmlContentToAppend = "";
  for (let element of item_collection) {
    if (element.links != undefined) {
      htmlContentToAppend += `
      <div class="card mb-3 col-sm-4">
        <h3 class="card-header">${element.data[0].title}</h3>
        <img class="bd-placeholder-img card-img-top img-thumbnail" src="${element.links[0].href}" alt="Imagen correspondiente a lo que busca">
        <div class="card-body" id="description">
          <p class="card-text">${element.data[0].description}</p>
        </div>
        <div class="card-footer text-muted">
          ${element.data[0].date_created}
        </div>
      </div>`;
    } else {
      htmlContentToAppend += `
      <div class="card mb-3 col-sm-4">
        <h3 class="card-header">${element.data[0].title}</h3>
        <div class="card-body" id="description">
          <p class="card-text">${element.data[0].description}</p>
        </div>
        <div class="card-footer text-muted">
          ${element.data[0].date_created}
        </div>
      </div>`;
    }
  }
  document.getElementById("contenedor").innerHTML = htmlContentToAppend;
}

document.getElementById("btnBuscar").addEventListener("click", function () {
  let input = document.getElementById("inputBuscar").value;
  let url_nasa = "https://images-api.nasa.gov/search?q=" + input;

  getJSONData(url_nasa).then(function (resultObj) {
    if (resultObj.status === "ok") {
      info_images = resultObj.data;
      item_collection = info_images.collection.items;

      showImages();
    }else if (resultObj.status === "error") {
      alert(`${resultObj.data} No es posible acceder a esa información en este momento, por favor intentelo mas tarde!`);
    }
  });
});
