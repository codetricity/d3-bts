const chartHeight = 300;
const chartWidth = 600;
const margin = {left: 100, right: 50, top: 50, bottom: 50};

const statsButtons = d3.selectAll(".statsButton");

const svgChart = d3.select('#chart')
  .attr('width', 600 + margin.left + margin.right)
  .attr('height', chartHeight + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate( ${margin.left}, ${margin.top} )`);


// read in data from file
d3.csv('data/bts-profiles.csv').then(data => {
  const heightMinMax = d3.extent(data, d => d.height);
  const heightScale = d3.scaleLinear()
    .domain(heightMinMax)
    .range([chartHeight, 0]);
  const heightAxis = d3.axisLeft(heightScale);


  const weightMinMax = d3.extent(data, d => d.weight);
  const weightScale = d3.scaleLinear()
    .domain(weightMinMax)
    .range([chartHeight, 0]);
  const weightAxis = d3.axisLeft(weightScale);

  const yLabelHeight = chartHeight * 0.75;
  const yLabelOffset = -60;
  const yAxisLabel = svgChart.append('text')
    .text('BTS')
    .attr('x', yLabelOffset)
    .attr('y', yLabelHeight)
    .attr('transform', `rotate(-90, ${yLabelOffset}, ${yLabelHeight})`);

 
  
  const memberNames = [];
  data.forEach(eachMember => {
    memberNames.push(eachMember.name);
  });

  const xScale = d3.scaleBand()
    .domain(memberNames)
    .range([0, chartWidth]);
  
  const xAxis = d3.axisBottom(xScale);
  svgChart.append('g')
    .call(xAxis)
    .attr('transform', `translate(0, ${chartHeight})`);
  
  const datapoints = svgChart.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(d.name))
    .attr('r', '5');

  const chartValues = {
    weight: weightAxis, 
    height: heightAxis,
    label: yAxisLabel,
    xScale: xScale,
    heightScale: heightScale,
    weightScale: weightScale,
    datapoints: datapoints};


  statsButtons.on('change', function(d) {
    const statsSelection = this.value;
    changeStats(statsSelection, chartValues);
  });
});

function changeStats(selection, chartValues) {
  console.log(selection);
  d3.select('#yAxis').remove();
  const yAxisContainer = svgChart.append('g')
    .attr('id', 'yAxis');
  if (selection == 'height') {
    yAxisContainer
      .call(chartValues.height);
    chartValues.label.text('BTS Member Height (cm)');
    chartValues.datapoints
      .attr('cy', d => chartValues.heightScale(d.height));
  } else if (selection == 'weight') {
    yAxisContainer
      .call(chartValues.weight);
    chartValues.label.text('BTS Member Weight (lbs)');
    chartValues.datapoints
      .attr('cy', d => chartValues.weightScale(d.weight));
  }
}