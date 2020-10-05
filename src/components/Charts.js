import React, { useRef, useLayoutEffect } from 'react';
/* Imports */
import '../css/Charts.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from '@amcharts/amcharts4/themes/dark';

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_dark);

function Charts(props) {
  const chart = useRef(null);

  useLayoutEffect(() => {
      am4core.options.autoSetClassName = true;

      let chart = am4core.create('chartdiv', am4charts.XYChart)

      chart.colors.step = 2;
      chart.maskBullets = false;
      
      // Add data
      chart.data = [{
          "date": "2012-01-01",
          "distance": 227,
          "townName": "New York",
          "townName2": "New York",
          "townSize": 12,
          "latitude": 40.71,
          "duration": 408
      }, {
          "date": "2012-01-02",
          "distance": 371,
          "townName": "Washington",
          "townSize": 7,
          "latitude": 38.89,
          "duration": 482
      }, {
          "date": "2012-01-03",
          "distance": 433,
          "townName": "Wilmington",
          "townSize": 3,
          "latitude": 34.22,
          "duration": 562
      }, {
          "date": "2012-01-04",
          "distance": 345,
          "townName": "Jacksonville",
          "townSize": 3.5,
          "latitude": 30.35,
          "duration": 379
      }, {
          "date": "2012-01-05",
          "distance": 480,
          "townName": "Miami",
          "townName2": "Miami",
          "townSize": 5,
          "latitude": 25.83,
          "duration": 501
      }, {
          "date": "2012-01-06",
          "distance": 386,
          "townName": "Tallahassee",
          "townSize": 3.5,
          "latitude": 30.46,
          "duration": 443
      }, {
          "date": "2012-01-07",
          "distance": 348,
          "townName": "New Orleans",
          "townSize": 5,
          "latitude": 29.94,
          "duration": 405
      }, {
          "date": "2012-01-08",
          "distance": 238,
          "townName": "Houston",
          "townName2": "Houston",
          "townSize": 8,
          "latitude": 29.76,
          "duration": 309
      }, {
          "date": "2012-01-09",
          "distance": 218,
          "townName": "Dalas",
          "townSize": 8,
          "latitude": 32.8,
          "duration": 287
      }, {
          "date": "2012-01-10",
          "distance": 349,
          "townName": "Oklahoma City",
          "townSize": 5,
          "latitude": 35.49,
          "duration": 485
      }, {
          "date": "2012-01-11",
          "distance": 603,
          "townName": "Kansas City",
          "townSize": 5,
          "latitude": 39.1,
          "duration": 890
      }, {
          "date": "2012-01-12",
          "distance": 534,
          "townName": "Denver",
          "townName2": "Denver",
          "townSize": 9,
          "latitude": 39.74,
          "duration": 810
      }, {
          "date": "2012-01-13",
          "townName": "Salt Lake City",
          "townSize": 6,
          "distance": 425,
          "duration": 670,
          "latitude": 40.75,
          "dashLength": 8,
          "alpha": 0.4
      }, {
          "date": "2012-01-14",
          "latitude": 36.1,
          "duration": 470,
          "townName": "Las Vegas",
          "townName2": "Las Vegas"
      }, {
          "date": "2012-01-15"
      }, {
          "date": "2012-01-16"
      }, {
          "date": "2012-01-17"
      }];
      
      // Create axes
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.dataFields.category = "category";
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.minGridDistance = 50;
      dateAxis.renderer.grid.template.disabled = true;
      dateAxis.renderer.fullWidthTooltip = true;
      
      let distanceAxis = chart.yAxes.push(new am4charts.ValueAxis());
    //   distanceAxis.title.text = "Distance";
      distanceAxis.renderer.grid.template.disabled = true;
      
      let durationAxis = chart.yAxes.push(new am4charts.DurationAxis());
    //   durationAxis.title.text = "Duration";
      durationAxis.baseUnit = "minute";
      durationAxis.renderer.grid.template.disabled = true;
      durationAxis.renderer.opposite = true;
      
      durationAxis.durationFormatter.durationFormat = "hh'h' mm'min'";
      
      let latitudeAxis = chart.yAxes.push(new am4charts.ValueAxis());
      latitudeAxis.renderer.grid.template.disabled = true;
      latitudeAxis.renderer.labels.template.disabled = true;
      
      // Create series
      let distanceSeries = chart.series.push(new am4charts.ColumnSeries());
      distanceSeries.id = "g1";
      distanceSeries.dataFields.valueY = "distance";
      distanceSeries.dataFields.dateX = "date";
      distanceSeries.yAxis = distanceAxis;
      distanceSeries.tooltipText = "{valueY} miles";
      distanceSeries.name = "Distance";
      distanceSeries.columns.template.fillOpacity = 0.7;
      
      let disatnceState = distanceSeries.columns.template.states.create("hover");
      disatnceState.properties.fillOpacity = 0.9;
      
      let durationSeries = chart.series.push(new am4charts.LineSeries());
      durationSeries.id = "g3";
      durationSeries.dataFields.valueY = "duration";
      durationSeries.dataFields.dateX = "date";
      durationSeries.yAxis = durationAxis;
      durationSeries.name = "Duration";
      durationSeries.strokeWidth = 2;
      durationSeries.tooltipText = "{valueY.formatDuration()}";
      
      let durationBullet = durationSeries.bullets.push(new am4charts.Bullet());
      let durationRectangle = durationBullet.createChild(am4core.Rectangle);
      durationBullet.horizontalCenter = "middle";
      durationBullet.verticalCenter = "middle";
      durationBullet.width = 7;
      durationBullet.height = 7;
      durationRectangle.width = 7;
      durationRectangle.height = 7;
      
      let durationState = durationBullet.states.create("hover");
      durationState.properties.scale = 1.2;
      
      let latitudeSeries = chart.series.push(new am4charts.LineSeries());
      latitudeSeries.id = "g2";
      latitudeSeries.dataFields.valueY = "latitude";
      latitudeSeries.dataFields.dateX = "date";
      latitudeSeries.yAxis = latitudeAxis;
      latitudeSeries.name = "Latitude";
      latitudeSeries.strokeWidth = 2;
      latitudeSeries.tooltipText = "Latitude: {valueY} ({townName})";
      
      let latitudeBullet = latitudeSeries.bullets.push(new am4charts.CircleBullet());
      latitudeBullet.circle.fill = am4core.color("#fff");
      latitudeBullet.circle.strokeWidth = 2;
      latitudeBullet.circle.propertyFields.radius = "townSize";
      
      let latitudeState = latitudeBullet.states.create("hover");
      latitudeState.properties.scale = 1.2;
      
    //   let latitudeLabel = latitudeSeries.bullets.push(new am4charts.LabelBullet());
    //   latitudeLabel.label.text = "{townName2}";
    //   latitudeLabel.label.horizontalCenter = "left";
    //   latitudeLabel.label.dx = 14;
      
      // Add legend
      chart.legend = new am4charts.Legend();
      
      // Add cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.fullWidthLineX = true;
      chart.cursor.xAxis = dateAxis;
      chart.cursor.lineX.strokeOpacity = 0;
      chart.cursor.lineX.fill = am4core.color("#000");
      chart.cursor.lineX.fillOpacity = 0.1;

    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
  );
}

export default Charts;



// Themes begin
// am4core.useTheme(am4themes_animated);
// Themes end



// var countryCodes = ["AF", "AO", "AR", "AM", "AU", "AT", "AZ", "BD", "BY", "BE", "BO", "BA", "BW", "BR", "BG", "KH", "CM", "CA", "CF", "TD", "CL", "CN", "CO", "CG", "CD", "CR", "CI", "HR", "CU", "CY", "CZ", "DK", "EC", "EG", "ER", "EE", "ET", "FI", "FR", "GE", "DE", "GR", "GL", "GP", "GT", "GN", "GW", "GY", "HT", "HN", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IL", "IT", "JM", "JP", "JO", "KZ", "KE", "KP", "KR", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LT", "LU", "MK", "MG", "MY", "ML", "MT", "MR", "MX", "MD", "MN", "ME", "MA", "MZ", "MM", "NA", "NP", "NL", "NZ", "NI", "NE", "NG", "NO", "OM", "PK", "PA", "PG", "PY", "PE", "PH", "PL", "PT", "RO", "RU", "SA", "SN", "RS", "SK", "SI", "SO", "ZA", "SS", "ES", "SD", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TN", "TR", "TM", "UA", "AE", "GB", "US", "UY", "UZ", "VE", "VN", "YE", "ZM", "ZW"];

// var chart = am4core.create("chartdiv", am4maps.MapChart);


// try {
// 	chart.geodata = am4geodata_worldHigh;
// }
// catch (e) {
// 	chart.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
// }

// chart.projection = new am4maps.projections.Mercator();
// chart.padding(10, 20, 10, 20);
// chart.minZoomLevel = 0.9;
// chart.zoomLevel = 0.9;
// chart.maxZoomLevel = 1;

// var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
// polygonSeries.useGeodata = true;
// polygonSeries.include = ["AF
//                          "];


// var chart1 = am4core.create("hiddenchartdiv", am4maps.MapChart);
// chart1.padding(10, 20, 10, 20);
// chart1.geodata = am4geodata_worldHigh;
// chart1.projection = new am4maps.projections.Mercator();

// var polygonSeries1 = chart1.series.push(new am4maps.MapPolygonSeries());
// polygonSeries1.useGeodata = true;
// polygonSeries1.include = ["AF"];


// var label = chart.chartContainer.createChild(am4core.Label);
// label.x = 100;
// label.y = 100;
// label.fill = am4core.color("#000000");
// label.fontSize = 35;
// label.fontWeight = "bold";
// label.text = "Afghanistan";
// label.fillOpacity = 0.2;

// var slider = chart.createChild(am4core.Slider);
// slider.padding(0, 15, 0, 60);
// slider.background.padding(0, 15, 0, 60);
// slider.marginBottom = 15;
// slider.valign = "bottom";

// var currentIndex = -1;
// var colorset = new am4core.ColorSet();
// var next;

// setInterval(function () {
// 	next = slider.start + 1 / countryCodes.length;
// 	if (next >= 1) {
// 		next = 0;
// 	}
// 	slider.animate({ property: "start", to: next }, 300);
// }, 2000)

// slider.events.on("rangechanged", function () {
// 	changeCountry();
// })

// function changeCountry() {
// 	var totalCountries = countryCodes.length - 1;
// 	var countryIndex = Math.round(totalCountries * slider.start);

// 	var morphToPolygon;

// 	if (currentIndex != countryIndex) {
// 		polygonSeries1.data = [];
// 		polygonSeries1.include = [countryCodes[countryIndex]];

// 		currentIndex = countryIndex;

// 		polygonSeries1.events.once("validated", function () {

// 			morphToPolygon = polygonSeries1.mapPolygons.getIndex(0);
// 			if(morphToPolygon){
// 				var countryPolygon = polygonSeries.mapPolygons.getIndex(0);

// 				var morpher = countryPolygon.polygon.morpher;
// 				var morphAnimation = morpher.morphToPolygon(morphToPolygon.polygon.points);

// 				var colorAnimation = countryPolygon.animate({ "property": "fill", "to": colorset.getIndex(Math.round(Math.random() * 20)) }, 1000);

// 				var animation = label.animate({ property: "y", to: 1000 }, 300);

// 				animation.events.once("animationended", function () {
// 					label.text = morphToPolygon.dataItem.dataContext["name"]+next;
// 					label.y = -50;
// 					label.animate({ property: "y", to: 200 }, 300, am4core.ease.quadOut);
// 				})
// 			}
// 		})
// 	}
// }
