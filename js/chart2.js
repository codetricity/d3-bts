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

  const chartW = chartWidth;
  const heightScale = generateHeightScale(data);
  const heightAxis = d3.axisLeft(heightScale);

  const weightScale = generateWeightScale(data);
  const weightAxis = d3.axisLeft(weightScale);

  const yAxisLabel = generateYaxisLabel(chartHeight);
  
  const memberNames = getMemberNames(data);
  
  const xScale = generateXscale(memberNames, chartW);
  
  const xAxis = d3.axisBottom(xScale);
  svgChart.append('g')
    .call(xAxis)
    .attr('transform', `translate(0, ${chartHeight})`);
    
  const imageSize = 60;
  const datapoints = svgChart.selectAll('image')
    .data(data)
    .enter()
    .append('image')
    .attr('x', d => xScale(d.name) - imageSize/2 + xScale.bandwidth() /2 )
    .attr('xlink:href', d => getImageFile(d))
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
    changeStats(statsSelection, chartValues);
  });
});
