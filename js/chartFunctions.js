function BtsChart(width, height) {
  this.width = width;
  this.height = height;


  this.generateHeightScale = function(data) {
    const heightMin = d3.min(data, d => d.height);
    const heightMax = d3.max(data, d => d.height);
    const heightScale = d3.scaleLinear()
      .domain([heightMin - 1, heightMax])
      .range([this.height, 0]);
    return heightScale;
  };

  this.generateWeightScale = function(data) {
    const weightMin = d3.min(data, d => d.weight);
    const weightMax = d3.max(data, d => d.weight);
    const weightScale = d3.scaleLinear()
      .domain([weightMin - 2, weightMax])
      .range([this.height, 0]);
    return weightScale;
  };

  this.generateYaxisLabel = function() {
    const yLabelHeight = this.height * 0.75;
    const yLabelOffset = -60;
    const yAxisLabel = svgChart.append('text')
      .attr('x', yLabelOffset)
      .attr('y', yLabelHeight)
      .attr('transform', `rotate(-90, ${yLabelOffset}, ${yLabelHeight})`);
    return yAxisLabel;
  };

  this.generateXscale = function(memberNames) {
    const xScale = d3.scaleBand()
      .domain(memberNames)
      .range([0, this.width]);
    return xScale;
  };

  this.getMemberNames = function(data) {
    const memberNames = [];
    data.forEach(eachMember => {
      memberNames.push(eachMember.name);
    });
    return memberNames;
  };


  this.getImageFile = function(d) {
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
  };
  

  this.changeStats = function(selection, chartValues) {
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
  };
}
