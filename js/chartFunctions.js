function BtsChart() {
  this.generateHeightScale = function(data) {
    const heightMin = d3.min(data, d => d.height);
    const heightMax = d3.max(data, d => d.height);
    const heightScale = d3.scaleLinear()
      .domain([heightMin - 1, heightMax])
      .range([chartHeight, 0]);
    return heightScale;
  };

  this.generateWeightScale = function(data) {
    const weightMin = d3.min(data, d => d.weight);
    const weightMax = d3.max(data, d => d.weight);
    const weightScale = d3.scaleLinear()
      .domain([weightMin - 2, weightMax])
      .range([chartHeight, 0]);
    return weightScale;
  };
}

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
      .transition()
      .attr('y', d => chartValues.heightScale(d.height) - chartValues.imageSize/2)
      .duration(800);
  } else if (selection == 'weight') {
    yAxisContainer
      .call(chartValues.weight);
    chartValues.label.text('BTS Member Weight (lbs)');
    chartValues.datapoints
      .transition()
      .attr('y', d => chartValues.weightScale(d.weight) - chartValues.imageSize/2)
      .duration(800);
  }
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

function generateYaxisLabel(chartHeight) {
  const yLabelHeight = chartHeight * 0.75;
  const yLabelOffset = -60;
  const yAxisLabel = svgChart.append('text')
    .attr('x', yLabelOffset)
    .attr('y', yLabelHeight)
    .attr('transform', `rotate(-90, ${yLabelOffset}, ${yLabelHeight})`);
  return yAxisLabel;
}

function getMemberNames(data) {
  const memberNames = [];
  data.forEach(eachMember => {
    memberNames.push(eachMember.name);
  });
  return memberNames;
}

// not working
// trying to use svgChart global function
function getDatapoints(data, xScale) {
  const imageSize = 60;
  const datapoints = svgChart.selectAll('image')
    .data(data)
    .enter()
    .append('image')
    .attr('x', d => xScale(d.name) - imageSize/2 + xScale.bandwidth() /2 )
    .attr('xlink:href', d => getImageFile(d))
    .attr('width', imageSize)
    .attr('height', imageSize);
  return datapoints;
}

function generateXscale(memberNames, chartW) {
  const xScale = d3.scaleBand()
    .domain(memberNames)
    .range([0, chartW]);
  return xScale;
}
