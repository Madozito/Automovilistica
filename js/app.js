var app = new Vue({
  el: "#app",
  data: {
    exchange: 0,
    anios: [],
    marcas: [],
    modelos: [],
    autos: [],
    moneda: "USD",
    marcaSeleccionada: "",
    modeloSeleccionado: "",
    anioSeleccionado: "",
    estadoSeleccionado: ""
    // autoEncontrado: true
  },
  methods: {
    buscarModelos: function () {
      document.querySelector("#modelo").value = "";
      app.modeloSeleccionado = "";

      var url = `https://ha-front-api-proyecto-final.vercel.app/models?brand=${app.marcaSeleccionada}`;
      fetch(url)
        .then(function (data) {
          return data.json();
        })
        .then(function (data) {
          app.modelos = data;
        });
    }
  },
  filters: {
    millares: function (value) {
      return parseInt(value).toLocaleString("es-UY");
    }
  }
});

function tipoCambio() {
  var url = "https://ha-front-api-proyecto-final.vercel.app/rates";
  fetch(url)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      app.exchange = data.uyu;
    });
}
tipoCambio();
function generarAnios() {
  for (let index = 2022; index > 1950; index--) {
    app.anios.push(index);
  }
  console.log(app.anios);
}
generarAnios();
function marcaAutos() {
  var url = "https://ha-front-api-proyecto-final.vercel.app/brands";
  fetch(url)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      app.marcas = data;
    });
}
function cargarAutos(anio, marca, modelo, estado) {
  // var url =
  //   "https://ha-front-api-proyecto-final.vercel.app/cars?year=" +
  //   anio +
  //   "&brand=" +
  //   marca +
  //   "&model=" +
  //   modelo +
  //   "&status=" +
  //   estado;
  var url = `https://ha-front-api-proyecto-final.vercel.app/cars?year=${anio}&brand=${marca}&model=${modelo}&status=${estado}`;
  fetch(url)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      console.log(data);
      app.autos = data;
      // if (data.length === 0) {
      //   app.autoEncontrado = false;
      // } else {
      //   app.autoEncontrado = true;
      // }
      // console.log(data);
    });
}

function cambiarMoneda() {
  if (app.moneda === "USD") {
    app.moneda = "UYU";
  } else {
    app.moneda = "USD";
  }
}

document.querySelector(".btn-moneda").addEventListener("click", cambiarMoneda);

cargarAutos();
marcaAutos();
document.querySelector(".btn-orange").addEventListener("click", function () {
  cargarAutos(
    app.anioSeleccionado,
    app.marcaSeleccionada,
    app.modeloSeleccionado,
    app.estadoSeleccionado
  );
});
