
const statsButtons = d3.selectAll(".statsButton");

// read in data from file
d3.csv('data/bts-profiles.csv').then(data => {
  const chart = new BtsChart(600, 300, 60, "#chart", data);

  const heightScale = chart.generateHeightScale();
  const heightAxis = d3.axisLeft(heightScale);

  const weightScale = chart.generateWeightScale();
  const weightAxis = d3.axisLeft(weightScale);

  const yAxisLabel = chart.generateYaxisLabel();
  
  const memberNames = chart.getMemberNames();
  
  const xScale = chart.generateXscale(memberNames);
  
  const xAxis = d3.axisBottom(xScale);
  chart.svg.append('g')
    .call(xAxis)
    .attr('transform', `translate(0, ${chart.height})`);

  // const datapoints = chart.datapoints;
  const datapoints = chart.svg.selectAll('image')
    .data(data)
    .enter()
    .append('image')
    .attr('x', d => xScale(d.name) - chart.imageSize/2 + xScale.bandwidth() /2 )
    .attr('xlink:href', d => chart.getImageFile(d))
    .attr('width', chart.imageSize)
    .attr('height', chart.imageSize);

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
    chart.changeStats(statsSelection, chartValues);
  });
});
