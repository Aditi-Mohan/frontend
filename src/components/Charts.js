import React, { useLayoutEffect, useState } from 'react';
import '../css/Charts.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from '@amcharts/amcharts4/themes/dark';
import { round } from '@amcharts/amcharts4/.internal/core/utils/Math';
import {ReactComponent as Bar} from '../svgs/icons/bar-graph.svg';
import {ReactComponent as Curve} from '../svgs/icons/curve.svg';

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_dark);

function Charts(props) {
  // const chart = useRef(null);

  let date = props.dates;
  let len = date.length;

  const [cumulative, setCumlative] = useState(true);
  const [timeSpan, setTimeSpan] = useState(len);
  const [percentages, setPercentages] = useState({});

  useLayoutEffect(() => {
      am4core.options.autoSetClassName = true;

      let chart = am4core.create('chartdiv', am4charts.XYChart)

      chart.colors.step = 2;
      chart.maskBullets = false;

      let conf;
      let death;
      let rec;
      let active;
      let data = [];
      if(props.data !== null) {
          conf = props.data.confirmed;
          death = props.data.death;
          rec = props.data.recovery;
          active = props.data.active;

          if(cumulative) {
          for( var i=len-timeSpan; i < len; i++) {
              data.push({
                  "conf": conf[i],
                  "death": death[i],
                  "rec": rec[i],
                  "active": active[i],
                  "date": date[i],
              })
          }
        }
        else {
          for( var j=len-timeSpan+1; j < len; j++) {
            data.push({
                "conf": conf[j]-conf[j-1],
                "death": death[j]-death[j-1],
                "rec": rec[j]-rec[j-1],
                "active": active[j]-active[j-1],
                "date": date[j-1],
            })
        }
        }
          let confPer = ((conf[len-1] - conf[len-2])/conf[len-1])*100;
          let deathPer = ((death[len-1] - death[len-2])/death[len-1])*100;
          let activePer = ((active[len-1] - active[len-2])/active[len-1])*100;
          let recPer = ((rec[len-1] - rec[len-2])/rec[len-1])*100;

          setPercentages({
            confPer,
            deathPer,
            activePer,
            recPer,
          });

          console.log(percentages.confPer, percentages.deathPer, percentages.activePer, recPer)
      }

      chart.data = data;

      //axes
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.minGridDistance = 50;
      dateAxis.renderer.grid.template.disabled = true;
      dateAxis.renderer.fullWidthTooltip = true;

      let valueAxis = chart.yAxes.push( new am4charts.ValueAxis());
      valueAxis.renderer.grid.disabled = true;
      valueAxis.renderer.opposite = true;

      if(cumulative) {
      let confSeries = chart.series.push(new am4charts.LineSeries());
      confSeries.id = 'g1';
      confSeries.dataFields.valueY = "conf";
      confSeries.dataFields.dateX = "date";
      confSeries.strokeWidth = 2;
      confSeries.stroke = am4core.color("#0e93e6");
      confSeries.tooltipText = 'Confirmed: {valueY}';
      confSeries.tooltip.getFillFromObject = false;
      confSeries.tooltip.background.fill = am4core.color("#0e93e6");
      confSeries.name = 'Confirmed';

      let deathSeries = chart.series.push(new am4charts.LineSeries());
      deathSeries.id = 'g2';
      deathSeries.dataFields.valueY = "death";
      deathSeries.dataFields.dateX = "date";
      deathSeries.strokeWidth = 2;
      deathSeries.stroke = am4core.color("#ff513d");
      deathSeries.tooltipText = 'Deaths: {valueY}';
      deathSeries.tooltip.getFillFromObject = false;
      deathSeries.tooltip.background.fill = am4core.color("#ff513d");
      deathSeries.name = 'Deaths'

      let recSeries = chart.series.push(new am4charts.LineSeries());
      recSeries.id = 'g3';
      recSeries.dataFields.valueY = "rec";
      recSeries.dataFields.dateX = "date";
      recSeries.strokeWidth = 2;
      recSeries.stroke = am4core.color("#2cba1c");
      recSeries.tooltipText = 'Recoveries: {valueY}';
      recSeries.tooltip.getFillFromObject = false;
      recSeries.tooltip.background.fill = am4core.color("#2cba1c");
      recSeries.name = 'Recoveries'

      let activeSeries = chart.series.push(new am4charts.LineSeries());
      activeSeries.id = 'g4';
      activeSeries.dataFields.valueY = "active";
      activeSeries.dataFields.dateX = "date";
      activeSeries.strokeWidth = 2;
      activeSeries.stroke = am4core.color("#dc5eff");
      activeSeries.tooltipText = 'Active: {valueY}';
      activeSeries.tooltip.getFillFromObject = false;
      activeSeries.tooltip.background.fill = am4core.color("#dc5eff");
      activeSeries.name = 'Active'

      let confBullet = confSeries.bullets.push(new am4charts.Bullet());
      let confRectangle = confBullet.createChild(am4core.Rectangle);
      confBullet.horizontalCenter = "middle";
      confBullet.verticalCenter = "middle";
      confBullet.fill = am4core.color("#0e93e6");
      confBullet.width = 3;
      confBullet.height = 3;
      confRectangle.width = 3;
      confRectangle.height = 3;
      
      let confState = confBullet.states.create("hover");
      confState.properties.scale = 1.2;

      let deathBullet = deathSeries.bullets.push(new am4charts.Bullet());
      let deathRectangle = deathBullet.createChild(am4core.Rectangle);
      deathBullet.horizontalCenter = "middle";
      deathBullet.verticalCenter = "middle";
      deathBullet.fill = am4core.color("#ff513d")
      deathBullet.width = 3;
      deathBullet.height = 3;
      deathRectangle.width = 3;
      deathRectangle.height = 3;
      
      let deathState = deathBullet.states.create("hover");
      deathState.properties.scale = 1.2;

      let recBullet = recSeries.bullets.push(new am4charts.Bullet());
      let recRectangle = recBullet.createChild(am4core.Rectangle);
      recBullet.horizontalCenter = "middle";
      recBullet.verticalCenter = "middle";
      recBullet.fill = am4core.color("#2cba1c");
      recBullet.width = 3;
      recBullet.height = 3;
      recRectangle.width = 3;
      recRectangle.height = 3;
      
      let recState = recBullet.states.create("hover");
      recState.properties.scale = 1.2;

      let activeBullet = activeSeries.bullets.push(new am4charts.Bullet());
      let activeRectangle = activeBullet.createChild(am4core.Rectangle);
      activeBullet.horizontalCenter = "middle";
      activeBullet.verticalCenter = "middle";
      activeBullet.fill = am4core.color("#dc5eff");
      activeBullet.width = 3;
      activeBullet.height = 3;
      activeRectangle.width = 3;
      activeRectangle.height = 3;
      
      let activeState = activeBullet.states.create("hover");
      activeState.properties.scale = 1.2;
      }

      else{
        let confSeries = chart.series.push(new am4charts.ColumnSeries());
        confSeries.id = 'g5';
        confSeries.dataFields.valueY = "conf";
        confSeries.dataFields.dateX = "date";
        confSeries.strokeWidth = 0;
        confSeries.fill = am4core.color("#0e93e6");
        confSeries.tooltipText = 'Confirmed: {valueY}';
        confSeries.tooltip.getFillFromObject = false;
        confSeries.tooltip.background.fill = am4core.color("#0e93e6");
        confSeries.name = 'Confirmed';
        confSeries.columns.template.fillOpacity = 0.7;
  
        let deathSeries = chart.series.push(new am4charts.ColumnSeries());
        deathSeries.id = 'g6';
        deathSeries.dataFields.valueY = "death";
        deathSeries.dataFields.dateX = "date";
        deathSeries.strokeWidth = 0;
        deathSeries.fill = am4core.color("#ff513d");
        deathSeries.tooltipText = 'Deaths: {valueY}';
        deathSeries.tooltip.getFillFromObject = false;
        deathSeries.tooltip.background.fill = am4core.color("#ff513d");
        deathSeries.name = 'Deaths'
        deathSeries.columns.template.fillOpacity = 0.7;
  
        let recSeries = chart.series.push(new am4charts.ColumnSeries());
        recSeries.id = 'g7';
        recSeries.dataFields.valueY = "rec";
        recSeries.dataFields.dateX = "date";
        recSeries.strokeWidth = 0;
        recSeries.fill = am4core.color("#2cba1c");
        recSeries.tooltipText = 'Recoveries: {valueY}';
        recSeries.tooltip.getFillFromObject = false;
        recSeries.tooltip.background.fill = am4core.color("#2cba1c");
        recSeries.name = 'Recoveries'
        recSeries.columns.template.fillOpacity = 0.7;
  
        let activeSeries = chart.series.push(new am4charts.ColumnSeries());
        activeSeries.id = 'g8';
        activeSeries.dataFields.valueY = "active";
        activeSeries.dataFields.dateX = "date";
        activeSeries.strokeWidth = 0;
        activeSeries.fill = am4core.color("#dc5eff");
        activeSeries.tooltipText = 'Active: {valueY}';
        activeSeries.tooltip.getFillFromObject = false;
        activeSeries.tooltip.background.fill = am4core.color("#dc5eff");
        activeSeries.name = 'Active'
        activeSeries.columns.template.fillOpacity = 0.7;
    
      }

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
  }, [props.data, timeSpan, cumulative, date, len, percentages]);

  return (
    <div style={{width: '100%'}}>
      <div style={{display: 'flex'}}>
  <div style={{backgroundColor: "rgba(14, 147, 230, 0.4)", border: "1px solid #0e93e6"}} className='percentage-block'>Confirmed <br/>{percentages.confPer>= 0? '+': ''}{round(percentages.confPer, 2)}%</div>
  <div style={{backgroundColor: "rgba(255, 81, 61, 0.4)", border: "1px solid #ff513d"}} className='percentage-block'>Deaths <br/>{percentages.deathPer>= 0? '+': ''}{round(percentages.deathPer, 2)}%</div>
  <div style={{backgroundColor: "rgba(44, 186, 28, 0.4)", border: "1px solid #2cba1c"}} className='percentage-block'>Recoveries <br/>{percentages.recPer>= 0? '+': ''}{round(percentages.recPer, 2)}%</div>
  <div style={{backgroundColor: "rgba(220, 94, 255, 0.4)", border: "1px solid #dc5eff"}} className='percentage-block'>Active <br/>{percentages.activePer>= 0? '+': ''}{round(percentages.activePer, 2)}%</div>
  <div style={{marginLeft: '1%'}}>
        <div onClick={()=>setTimeSpan(7)} className='time-setter' style={{border: timeSpan === 7? "1px solid #fae19b": ""}}><div style={{width: '30px'}} className='percentage-block'>7</div>last week</div>
        <div onClick={()=>setTimeSpan(30)} className='time-setter' style={{border: timeSpan === 30? "1px solid #fae19b": ""}}><div style={{width: '30px'}} className='percentage-block'>30</div>last month</div>
        <div onClick={()=>setTimeSpan(len)} className='time-setter' style={{border: timeSpan === len? "1px solid #fae19b": ""}}><div style={{width: '30px'}} className='percentage-block'>{len}</div>all</div>
      </div>
      <div style={{marginLeft: '1%'}}>
        <div onClick={()=>setCumlative(false)} className='time-setter' style={{border: !cumulative? "1px solid #fae19b": ""}}><div style={{width: '30px'}} className='percentage-block'><Bar/></div>Daily</div>
        <div onClick={()=>setCumlative(true)} className='time-setter' style={{border: cumulative? "1px solid #fae19b": ""}}><div style={{width: '30px'}} className='percentage-block'><Curve/></div>Cumulative</div>
      </div>
      </div>
    <div id="chartdiv" style={{width: "100%", height: props.height}}></div>
    </div>
  );
}

export default Charts;



    //   // Create axes
    //   let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    //   dateAxis.dataFields.category = "category";
    //   dateAxis.renderer.grid.template.location = 0;
    //   dateAxis.renderer.minGridDistance = 50;
    //   dateAxis.renderer.grid.template.disabled = true;
    //   dateAxis.renderer.fullWidthTooltip = true;
      
    //   let distanceAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // //   distanceAxis.title.text = "Distance";
    //   distanceAxis.renderer.grid.template.disabled = true;
      
    //   let durationAxis = chart.yAxes.push(new am4charts.DurationAxis());
    // //   durationAxis.title.text = "Duration";
    //   durationAxis.baseUnit = "minute";
    //   durationAxis.renderer.grid.template.disabled = true;
    //   durationAxis.renderer.opposite = true;
      
    //   durationAxis.durationFormatter.durationFormat = "hh'h' mm'min'";
      
    //   let latitudeAxis = chart.yAxes.push(new am4charts.ValueAxis());
    //   latitudeAxis.renderer.grid.template.disabled = true;
    //   latitudeAxis.renderer.labels.template.disabled = true;
      
    //   // Create series
    //   let distanceSeries = chart.series.push(new am4charts.ColumnSeries());
    //   distanceSeries.id = "g1";
    //   distanceSeries.dataFields.valueY = "distance";
    //   distanceSeries.dataFields.dateX = "date";
    //   distanceSeries.yAxis = distanceAxis;
    //   distanceSeries.fill = am4core.color('#ff513d')
    //   distanceSeries.tooltipText = "{valueY} miles";
    //   distanceSeries.name = "Distance";
    //   distanceSeries.columns.template.fillOpacity = 0.7;
      
    //   let disatnceState = distanceSeries.columns.template.states.create("hover");
    //   disatnceState.properties.fillOpacity = 0.9;
      
    //   let durationSeries = chart.series.push(new am4charts.LineSeries());
    //   durationSeries.id = "g3";
    //   durationSeries.dataFields.valueY = "duration";
    //   durationSeries.dataFields.dateX = "date";
    //   durationSeries.yAxis = durationAxis;
    //   durationSeries.name = "Duration";
    //   durationSeries.strokeWidth = 2;
    //   durationSeries.tooltipText = "{valueY.formatDuration()}";
      
    //   let durationBullet = durationSeries.bullets.push(new am4charts.Bullet());
    //   let durationRectangle = durationBullet.createChild(am4core.Rectangle);
    //   durationBullet.horizontalCenter = "middle";
    //   durationBullet.verticalCenter = "middle";
    //   durationBullet.width = 7;
    //   durationBullet.height = 7;
    //   durationRectangle.width = 7;
    //   durationRectangle.height = 7;
      
    //   let durationState = durationBullet.states.create("hover");
    //   durationState.properties.scale = 1.2;
      
    //   let latitudeSeries = chart.series.push(new am4charts.LineSeries());
    //   latitudeSeries.id = "g2";
    //   latitudeSeries.dataFields.valueY = "latitude";
    //   latitudeSeries.dataFields.dateX = "date";
    //   latitudeSeries.yAxis = latitudeAxis;
    //   latitudeSeries.name = "Latitude";
    //   latitudeSeries.strokeWidth = 2;
    //   latitudeSeries.tooltipText = "Latitude: {valueY} ({townName})";
      
    //   let latitudeBullet = latitudeSeries.bullets.push(new am4charts.CircleBullet());
    //   latitudeBullet.circle.fill = am4core.color("#fff");
    //   latitudeBullet.circle.strokeWidth = 2;
    //   latitudeBullet.circle.propertyFields.radius = "townSize";
      
    //   let latitudeState = latitudeBullet.states.create("hover");
    //   latitudeState.properties.scale = 1.2;
      
    // //   let latitudeLabel = latitudeSeries.bullets.push(new am4charts.LabelBullet());
    // //   latitudeLabel.label.text = "{townName2}";
    // //   latitudeLabel.label.horizontalCenter = "left";
    // //   latitudeLabel.label.dx = 14;
      
    //   // Add legend
    //   chart.legend = new am4charts.Legend();
      
    //   // Add cursor
    //   chart.cursor = new am4charts.XYCursor();
    //   chart.cursor.fullWidthLineX = true;
    //   chart.cursor.xAxis = dateAxis;
    //   chart.cursor.lineX.strokeOpacity = 0;
    //   chart.cursor.lineX.fill = am4core.color("#000");
    //   chart.cursor.lineX.fillOpacity = 0.1;
