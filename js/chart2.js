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

  const heightScale = generateHeightScale(data);
  const heightAxis = d3.axisLeft(heightScale);

  const weightScale = generateWeightScale(data);
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
      .attr('y', d => chartValues.heightScale(d.height) - chartValues.imageSize/2);
  } else if (selection == 'weight') {
    yAxisContainer
      .call(chartValues.weight);
    chartValues.label.text('BTS Member Weight (lbs)');
    chartValues.datapoints
      .attr('y', d => chartValues.weightScale(d.weight) - chartValues.imageSize/2);
  }
}

function generateHeightScale(data) {
  const heightMin = d3.min(data, d => d.height);
  const heightMax = d3.max(data, d => d.height);
  const heightScale = d3.scaleLinear()
    .domain([heightMin - 1, heightMax])
    .range([chartHeight, 0]);
  return heightScale;
}

function generateWeightScale(data) {
  const weightMin = d3.min(data, d => d.weight);
  const weightMax = d3.max(data, d => d.weight);
  const weightScale = d3.scaleLinear()
    .domain([weightMin - 2, weightMax])
    .range([chartHeight, 0]);
  return weightScale;
}

function getImageFile(d) {
    if (d.name == 'Kim Namjoon') {
      return 'assets/kim-namjoon-150x150-circle.png';
    } else if (d.name == 'Kim Seokjin') {
      return 'assets/kim-seokjin.png';
    } else if (d.name == 'Jung Hoseok') {
      return 'assets/jung-hoseok-150x150-circle.png';
    } else if (d.name == 'Jeon Jeong-guk') {
      return 'assets/jungkook-150x150-circle.png';
    } else if (d.name == 'Kim Taehyung') {
      return 'assets/kim-taehyung-150x150.png';
    } else if (d.name == 'Min Yoongi') {
      return 'assets/min-yoongi.png';
    } else if (d.name == 'Park Jimin') {
      return 'assets/park-jimin-150x150-circle.png';
    }
}