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
     // D3d. Create a variable to hold washing frequency
     var cardio_disease = output.cardio_disease;
     console.log(cardio_disease);



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
// Creating the layout for the gauge chart.
  var gaugeLayout = { 

  font: { color: "darkblue", family: "Arial", size: 14},
  paper_bgcolor: "lightcoral",
  automargin: true
};

    // Using Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);

  });
}
//*******************************************************************/