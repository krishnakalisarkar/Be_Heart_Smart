// Initial Javascript dasboard:
d3.json("https://raw.githubusercontent.com/krishnakalisarkar/Be_Heart_Smart/main/Resources/final_cardio_bmi_complete.json").then(function(data){
    console.log(data);
    var arrayObject = Object.values(data);
    console.log(arrayObject)
    console.log(arrayObject[0].age)
    // array of id 
    var id_names = arrayObject.map(i => i.id)
    console.log(id_names)
    // slice the first 100 values
    var hundred = arrayObject.slice(0, 100);
    console.log(hundred);
    // first person data:(checking)
    firstPerson = hundred[0];
    Object.entries(firstPerson).forEach(([key, value]) =>
      {console.log(key + ': ' + value);});
});
//--------------------------------------------------------------------------------
// Grab a reference to the dropdown select element
function init() {
    //
    var selector = d3.select("#selDataset");
    // Use the list of sample names to populate the select options
    d3.json("https://raw.githubusercontent.com/krishnakalisarkar/Be_Heart_Smart/main/Resources/final_cardio_bmi_complete.json").then((data) => {
      console.log(data);
      var arrayObject = Object.values(data);
      // slice the first 100 values
      var hundred = arrayObject.slice(0, 100);
      console.log(hundred);
      var sampleNames = hundred.map(i => i.id);
      console.log(sampleNames);
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });

  })}
  init();
  buildDemographic(0);
  buildCharts(0);
  //--------------------------------------------------------------------------------  
  // Initialize the dashboard
function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildDemographic(newSample);
  buildCharts(newSample); 
}
//
//-----------------------------------------------------------------------------------
//*******************************************************************************
//Demographics Panel
//*******************************************************************************
function buildDemographic(sample) {
  d3.json("https://raw.githubusercontent.com/krishnakalisarkar/Be_Heart_Smart/main/Resources/final_cardio_bmi_complete.json").then((data) => {
    var arrayObject = Object.values(data);
    // slice the first 100 values
    var hundred = arrayObject.slice(0, 100);
    // Filter the data for the object with the desired sample number
    var resultArray = hundred.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    console.log(result);

    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-demographic");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Appending the Demographic info.
    Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  
  });
}
//----------------------------------------------------------------------------------
//*********************************************************************************
// Gauge Panel 
//********************************************************************************* 
function buildCharts(sample) {
  d3.json("https://raw.githubusercontent.com/krishnakalisarkar/Be_Heart_Smart/main/Resources/final_cardio_bmi_complete.json").then((data) => {
    var arrayObject = Object.values(data);
    // slice the first 100 values
    var hundred = arrayObject.slice(0, 100);
    // Filter the data for the object with the desired sample number
    var resultArray = hundred.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    console.log(result);
    // Create a variable to hold cardio_disease
    var cardio  = hundred.filter(sampleObj => sampleObj.id == sample);
      // Create a variable that holds the first sample in the array.
    var output = cardio[0];
    console.log(output);
     // Create a variable to hold cardio_disease
     var cardio_disease = output.cardio_disease;
     console.log(cardio_disease);
    // Create a variable to holds height
     var height = output.height;
     console.log(height);
     // Create a variable to holds weight
     var weight = output.weight;
     console.log(weight);
     // Create a variable to hold id
     var id = output.id;
     console.log(id);
     // Systolic_bp diastolic_bp
     var systolic = output.systolic_bp;
     console.log(systolic);
     var diastolic = output.diastolic_bp;
     console.log(diastolic);
    // bmi
     var bmi = output.bmi;
     console.log(bmi);
    // age
    var age = output.age;
    console.log(age);
    // cholesterol
    var cholesterol = output.cholesterol;
    console.log(cholesterol);
    // glucose
    var glucose = output.glucose;
    console.log(glucose);
    // smoker
    var smoker = output.smoker;
    console.log(smoker);
    // alcohol intake
    var alcoholIntake = output.alcohol_intake;
    console.log(alcoholIntake);
    // active
    var active = output.active;
    console.log(active);
//*******************************************************************/
//  Creating the trace for the gauge chart.
      var gaugeData = [{
      value: cardio_disease,
      title: "<b>Cardiac Disease</b> <br> Indicator",
      type: "indicator",
      mode: "gauge+number",
      gauge:{
      axis:{ range:[null,1], tickwidth: 1, tickcolor: "black",

    //Set the placement of the first tick//
    tick0: '0',
    //Set the step in-between ticks//
    dtick: '0.5',
    // Specifies the maximum number of ticks //
    nticks: 1},
    bar: { color: "RebeccaPurple"},
    bgcolor: "white",
    borderwidth: 2,
    bordercolor: "black",
    steps: [
      {range: [0,0.5], color: "green"},
      {range: [0.5,1], color: "red"},
    ]
  }
} 
];
//****************************************************************/
// Creating the layout for the gauge chart.
  var gaugeLayout = { 

  font: { color: "rgb(136, 2, 2)", family: "Arial", size: 14},
  paper_bgcolor: "antiquewhite",
  automargin: true,
  width: 700,
  height: 500,
  margin: {
    l: 25,
    r: 25,
    b: 25,
    t: 25,
  
}};

    // Using Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);

  //});
//}
//*******************************************************************/
//  Create the trace for the bar chart. 
  var yticks = ['Diastolic','Systolic','Weight','Height','BMI','Age'];
  const x_data = [diastolic,systolic,weight,height,bmi,age];
  console.log(yticks);
  var barData = [{
  y: yticks,
  x: x_data,
  text: "",
  type: "bar",
  orientation: "h",
  text: x_data.map(String),
  textposition: 'auto',
  hoverinfo: 'none',
  marker: {color: "rgb(136, 2, 2"}
  }];
  var barLayout = {
    //title: "<b>Factors that cause Heart Disease</b>",
    title : {"text": "<b> Systolic BP </b>", "x": 0.5, "xanchor": "center", "y": 0.85, "yanchor":"top"},
    paper_bgcolor: "antiquewhite",
    font: { color: "rgb(136, 2, 2)", family: "Arial" , size: 14}

  };
  // 10. Use Plotly to plot the data with the layout. 
  Plotly.newPlot("bar", barData, barLayout);
//});
//}
//--------------------------------------------------------------------
 // Create the trace for the bubble chart.
    var xvalues = ['Cholesterol','Glucose','Smoker','Alcohol Intake','Active'];
    var y_data = [cholesterol, glucose, smoker, alcoholIntake, active];
    var colorscale = ["red","orange","cyan","green","darkblue"];
    console.log(y_data);
    var bubbleData = [{
      x: xvalues,
      y: y_data,
      type: "scatter",
      mode: 'markers',
      marker: {
      size: 20,
      sizemode: "area",
      color: colorscale,
      
    }
  }];
     var bubblelayout = {
      title : {"text": "<b> Factors that cause Heart Disease </b>", "x": 0.5, "xanchor": "center", "y": 0.85, "yanchor":"top", "font": {"size": 26}},
      showlegend: false,
      xaxis: { title: "Factors" },
      yaxis: { title: "Count" },
      hovermode: "closest",
      autosize: "true",
      paper_bgcolor: "antiquewhite",
      font: { color: "rgb(136, 2, 2)", family: "Arial",size: 14 },
      margin: {
        l: 20,
        r: 20,
        b: 50,
        t: 50,
        pad: 4
      },
  };
  
  Plotly.newPlot('bubble', bubbleData, bubblelayout);
});
} 
//***************************************************************** */