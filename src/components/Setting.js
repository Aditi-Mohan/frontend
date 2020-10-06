import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import '../css/Charts.css';

class Settings extends Component {
    state = {}

    componentDidMount() {

am4core.useTheme(am4themes_animated);

var countryCodes = ['US', 'IN', 'GB', 'AF'];

var chart = am4core.create("chartdiv", am4maps.MapChart);


try {
	chart.geodata = am4geodata_worldHigh;
}
catch (e) {
	chart.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
}

chart.projection = new am4maps.projections.Mercator();
chart.padding(10, 20, 10, 20);
chart.minZoomLevel = 0.9;
chart.zoomLevel = 0.9;
chart.maxZoomLevel = 1;

var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
polygonSeries.useGeodata = true;
polygonSeries.include = countryCodes[0];


var chart1 = am4core.create("hiddenchartdiv", am4maps.MapChart);
chart1.padding(10, 20, 10, 20);
chart1.geodata = am4geodata_worldHigh;
chart1.projection = new am4maps.projections.Mercator();

var polygonSeries1 = chart1.series.push(new am4maps.MapPolygonSeries());
polygonSeries1.useGeodata = true;
polygonSeries1.include = countryCodes[0];


var label = chart.chartContainer.createChild(am4core.Label);
label.x = 100;
label.y = 100;
label.fill = am4core.color("#000000");
label.fontSize = 35;
label.fontWeight = "bold";
label.text = countryCodes[0];
label.fillOpacity = 0.2;

var slider = chart.createChild(am4core.Slider);
slider.padding(0, 15, 0, 60);
slider.background.padding(0, 15, 0, 60);
slider.marginBottom = 15;
slider.valign = "bottom";

var currentIndex = 0;
var colorset = new am4core.ColorSet();
var next = 0;

setInterval(function () {
    next = next+1
	if (next >= countryCodes.length) {
		next = 0;
	}
	changeCountry();
}, 2000)

function changeCountry() {
	var countryIndex = next;

	var morphToPolygon;

	if (currentIndex != countryIndex) {
		polygonSeries1.data = [];
		polygonSeries1.include = [countryCodes[countryIndex]];

		currentIndex = countryIndex;

		polygonSeries1.events.once("validated", function () {

			morphToPolygon = polygonSeries1.mapPolygons.getIndex(0);
			if(morphToPolygon){
				var countryPolygon = polygonSeries.mapPolygons.getIndex(0);

				var morpher = countryPolygon.polygon.morpher;
				var morphAnimation = morpher.morphToPolygon(morphToPolygon.polygon.points);

				var colorAnimation = countryPolygon.animate({ "property": "fill", "to": colorset.getIndex(Math.round(Math.random() * 20)) }, 1000);

				var animation = label.animate({ property: "y", to: 1000 }, 300);

				animation.events.once("animationended", function () {
					label.text = morphToPolygon.dataItem.dataContext["name"];
					label.y = -50;
					label.animate({ property: "y", to: 200 }, 300, am4core.ease.quadOut);
				})
			}
		})
	}
}

    }

    render() {
        return(
            <div>
                <div id="chartdiv"></div>
                <div id="hiddenchartdiv"></div>
            </div>
        )
    }
}

export default Settings;