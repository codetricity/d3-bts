
const statsButtons = d3.selectAll(".statsButton");

// read in data from file
d3.csv('data/bts-profiles.csv').then(data => {
  const chart = new BtsChart(600, 300, 60, "#chart", data);

  const heightAxis = d3.axisLeft(chart.heightScale);

  const weightAxis = d3.axisLeft(chart.weightScale);

  const yAxisLabel = chart.generateYaxisLabel();
  
  const xAxis = d3.axisBottom(chart.xScale);
  chart.svg.append('g')
    .call(xAxis)
    .attr('transform', `translate(0, ${chart.height})`);

  const chartValues = {
    weight: weightAxis, 
    height: heightAxis,
    label: yAxisLabel};


  statsButtons.on('change', function(d) {
    const statsSelection = this.value;
    chart.changeStats(statsSelection, chartValues);
  });
});
