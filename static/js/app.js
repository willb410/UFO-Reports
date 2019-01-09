// from data.js
var tableData = data;

// Set reference for table body
var tbody = d3.select("tbody");

// Display all data in the table
data.forEach((ufoSighting) => {
    var row = tbody.append("tr");
    Object.entries(ufoSighting).forEach(([key, value]) => {
      var cell = tbody.append("td");
      cell.text(value);
    });
  });

// Filter for specific date
var submit = d3.select('#filter-btn');


function multiSearch () {
  // Prevent default actions
  d3.event.preventDefault();

  // Select input element and get value
  colIds = []
  colValues = []

  // Gather column ids
  d3.selectAll('.form-control').each(function(input) {
    colIds.push('#' + this.id);
  });
  
  // Gather inputted values
  colIds.forEach(item => {
    colValues.push(d3.select(item).node().value.trim().toLowerCase());
  });

  console.log('colIDs: ', JSON.parse(JSON.stringify(colIds)));
  console.log('colValues: ', JSON.parse(JSON.stringify(colValues)));
 
  // Grab column names
  var colKeys = Object.keys(tableData[0]);
  console.log('colKeys: ', JSON.parse(JSON.stringify(colKeys)));

  // Filter on multiple criteria
  var initialData = [];
  var filteredData = [];

  for (var i = 0; i < colValues.length; i++) {
    
    if (colValues[i] === '') {
        console.log('do nothing');
    } else if (initialData.length === 0) {
      var filteredRow = tableData.filter(sighting => sighting[colKeys[i]].includes(colValues[i]));
      console.log('filteredRow in else if: ', JSON.parse(JSON.stringify(filteredRow)));
      
      initialData.push(filteredRow);
      console.log('initialData after initial data addition: ', JSON.parse(JSON.stringify(initialData)));
    } else {
      var filteredRow = tableData.filter(sighting => sighting[colKeys[i]].includes(colValues[i]));
      console.log('filteredRow in else: ', JSON.parse(JSON.stringify(filteredRow)));
      
      for (var j = 0; j < initialData[0].length; j++) {
        for (var k = 0; k < filteredRow.length; k++) {
          if (filteredRow.length === 1) {  
            if (filteredRow[k] !== initialData[0][j]) {            
              } else {
                filteredData.push(filteredRow[k]);
                console.log('filteredRow inner loops: ', JSON.parse(JSON.stringify(filteredRow[k])));
            };
          } else {
            if (filteredRow[k] !== initialData[j]) {            
            } else {
              filteredData.push(filteredRow[k]);
              console.log('filteredRow inner loops: ', JSON.parse(JSON.stringify(filteredRow[k])));
            };
          }; 
        };
      };
    };
  };
  
  // Remove display of full data
  d3.selectAll('td').remove();

  if (filteredData.length === 0) {
    console.log('final data: ', initialData[0]);
    var filteredData = initialData; 

    // Display filtered data
    var outputData = filteredData[0];
    outputData.forEach((ufoSighting) => {
      var row = tbody.append("tr");
      Object.entries(ufoSighting).forEach(([key, value]) => {
        var cell = tbody.append("td");
        cell.text(value);
      });
    }); 

  } else {console.log('final data: ', filteredData)
    // Display filtered data
    var outputData = filteredData;
    outputData.forEach((ufoSighting) => {
      var row = tbody.append("tr");
      Object.entries(ufoSighting).forEach(([key, value]) => {
        var cell = tbody.append("td");
        cell.text(value);
      });
    }); 
  };
};

submit.on('click', function() {
  multiSearch();
});