// Initial Javascript dasboard:
d3.json("cardio_complete.json").then(function(data){
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
    d3.json("cardio_complete.json").then((data) => {
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
  buildDemographic(1);
  //--------------------------------------------------------------------------------  
  // Initialize the dashboard
function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildDemographic(newSample);
  buildCharts(newSample); 
}
//-----------------------------------------------------------------------------------
//Demographics Panel 
function buildDemographic(sample) {
  d3.json("cardio_complete.json").then((data) => {
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