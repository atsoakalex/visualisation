import './style.css'
import javascriptLogo from './javascript.svg'
import { setupCounter } from './counter.js'




document.addEventListener("DOMContentLoaded", function() {
  createCanvas();
  createBarChart();
});





function createCanvas() {
  var h3 = document.querySelector("h3");
  var table = document.querySelector("table");
  var canvas = document.createElement("canvas");
  canvas.setAttribute("id", "barChart");
  h3.parentNode.insertBefore(canvas, table);
}

createCanvas();

var table = document.getElementById("table1");
var data = [];
var years = [];

// Récupération des données du tableau
for (var i = 1; i < table.rows.length; i++) {
    var rowData = [];
    for (var j = 1; j < table.rows[i].cells.length; j++) {
        rowData.push(parseInt(table.rows[i].cells[j].innerHTML));
    }
    data.push({
        label: table.rows[i].cells[1].innerHTML,
        data: rowData,
        borderWidth: 1,
    });
}

// Define the colors
var colors = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'];

// Apply the colors to the dataset
for (var i = 0; i < data.length; i++) {
    data[i].borderColor = colors[i % colors.length];
}

// Récupération des années
for (var i = 1; i < table.rows[1].cells.length; i++) {
    years.push(table.rows[1].cells[i].innerHTML);
}

// Initialisation du graphique
var ctx = document.getElementById("barChart").getContext("2d");
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: years,
        datasets: data
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
                
            }
        }
    }
});


var canvas = document.createElement('canvas');
var container = document.getElementById('table2');
var parent = container.parentNode;
var h4 = document.querySelector('h4');

parent.insertBefore(canvas, container);
canvas.setAttribute('id', 'myCanvas');
canvas.style.width = '100%';
canvas.style.height = '500px';


var table = document.getElementById("table2");
var data = [];
// Récupération des données du tableau
for (var i = 1; i < table.rows.length; i++) {
  var row = table.rows[i];
  var country = row.cells[1].innerHTML;
  var period1 = row.cells[2].innerHTML;
  var period2 = row.cells[3].innerHTML;
  data.push({ country: country, period1: period1, period2: period2 });
}
// Création du graphique à partir des données
var chart = new Chart(document.getElementById("myCanvas"), {
  type: 'bar',
  data: {
    labels: data.map(function(d) { return d.country; }),
    datasets: [
      {
        label: "2007-2009",
        data: data.map(function(d) { return d.period1; }),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1
      },
      {
        label: "2010-2012",
        data: data.map(function(d) { return d.period2; }),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1
      }
    ]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});



  // Récupère l'élément h1 pour y ajouter le canvas
  var h1 = document.getElementsByTagName("h1")[0];

  // Crée l'élément canvas pour dessiner le graphique
  var canvas = document.createElement("canvas");
  canvas.id = "myChart";
  h1.parentNode.insertBefore(canvas, h1.nextSibling);

  // Utilise fetch pour récupérer les données à l'adresse URL spécifiée
  fetch('https://canvasjs.com/services/data/datapoints.php')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // Récupère l'élément canvas pour dessiner le graphique
      var ctx = document.getElementById('myChart').getContext('2d');

      // Crée le graphique en utilisant Chart.js
      var chart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: data.map(function(point) { return point[1]; }),
              datasets: [{
                  label: 'Graphique en temps réel',
                  data: data.map(function(point) { return point[2]; }),
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });

      // Rafraîchit les données et met à jour le graphique toutes les secondes
      setInterval(function() {
        fetch('https://canvasjs.com/services/data/datapoints.php')
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            chart.data.labels = data.map(function(point) { return point[0]; });
            chart.data.datasets[0].data = data.map(function(point) { return point[1]; });
            chart.update();
          });
      }, 1000);
    });




