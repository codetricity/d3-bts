const chart = new BtsChart(600, 300);
const margin = {left: 100, right: 50, top: 50, bottom: 50};

const statsButtons = d3.selectAll(".statsButton");

const svgChart = d3.select('#chart')
  .attr('width', chart.width + margin.left + margin.right)
  .attr('height', chart.height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate( ${margin.left}, ${margin.top} )`);

// read in data from file
d3.csv('data/bts-profiles.csv').then(data => {
  const heightScale = chart.generateHeightScale(data);
  const heightAxis = d3.axisLeft(heightScale);

  const weightScale = chart.generateWeightScale(data);
  const weightAxis = d3.axisLeft(weightScale);

  const yAxisLabel = chart.generateYaxisLabel();
  
  const memberNames = chart.getMemberNames(data);
  
  const xScale = chart.generateXscale(memberNames);
  
  const xAxis = d3.axisBottom(xScale);
  svgChart.append('g')
    .call(xAxis)
    .attr('transform', `translate(0, ${chart.height})`);
    
  const imageSize = 60;
  const datapoints = svgChart.selectAll('image')
    .data(data)
    .enter()
    .append('image')
    .attr('x', d => xScale(d.name) - imageSize/2 + xScale.bandwidth() /2 )
    .attr('xlink:href', d => chart.getImageFile(d))
    .attr('width', imageSize)
    .attr('height', imageSize);

  const chartValues = {
    weight: weightAxis, 
    height: heightAxis,
    label: yAxisLabel,
    xScale: xScale,
    heightScale: heightScale,
    weightScale: weightScale,
    datapoints: datapoints,
    imageSize: imageSize};


  statsButtons.on('change', function(d) {
    const statsSelection = this.value;
    chart.changeStats(statsSelection, chartValues);
  });
});
