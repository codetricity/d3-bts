const chartSettings = {
  width: 600,
  height: 300,
  imageSize: 60,
  idHtml: '#chart',
  margin: {left: 100, right: 50, top: 50, bottom: 50}};


// read in data from file
d3.csv('data/bts-profiles.csv').then(data => {
  const chart = new BtsChart(chartSettings, data);

  const statsButtons = d3.selectAll(".statsButton");
  statsButtons.on('change', function(d) {
    const statsSelection = this.value;
    chart.changeStats(statsSelection);
  });
});