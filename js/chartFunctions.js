class BtsChart {
  constructor(width, height, imageSize, id, data) {
    this.width = width;
    this.height = height;
    this.margin = {left: 100, right: 50, top: 50, bottom: 50};
    this.svg = d3.select(id)
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate( ${this.margin.left}, ${this.margin.top} )`);
    this.data = data;
    this.imageSize = imageSize;
    this.heightScale = this.generateHeightScale();
    this.weightScale = this.generateWeightScale();
    this.memberNames = this.getMemberNames();
    this.xScale = this.generateXscale();

    this.datapoints = this.svg.selectAll('image')
      .data(this.data)
      .enter()
      .append('image')
      .attr('x', d => this.xScale(d.name) - this.imageSize/2 + this.xScale.bandwidth() /2 )
      .attr('xlink:href', d => this.getImageFile(d))
      .attr('width', this.imageSize)
      .attr('height', this.imageSize);
  }

  generateHeightScale() {
    const heightMin = d3.min(this.data, d => d.height);
    const heightMax = d3.max(this.data, d => d.height);
    const heightScale = d3.scaleLinear()
      .domain([heightMin - 1, heightMax])
      .range([this.height, 0]);
    return heightScale;
  }

  generateWeightScale() {
    const weightMin = d3.min(this.data, d => d.weight);
    const weightMax = d3.max(this.data, d => d.weight);
    const weightScale = d3.scaleLinear()
      .domain([weightMin - 2, weightMax])
      .range([this.height, 0]);
    return weightScale;
  }

  generateYaxisLabel() {
    const yLabelHeight = this.height * 0.75;
    const yLabelOffset = -60;
    const yAxisLabel = this.svg.append('text')
      .attr('x', yLabelOffset)
      .attr('y', yLabelHeight)
      .attr('transform', `rotate(-90, ${yLabelOffset}, ${yLabelHeight})`);
    return yAxisLabel;
  }

  getMemberNames() {
    const memberNames = [];
    this.data.forEach(eachMember => {
      memberNames.push(eachMember.name);
    });
    return memberNames;
  }


  generateXscale() {
    const xScale = d3.scaleBand()
      .domain(this.memberNames)
      .range([0, this.width]);
    return xScale;
  }


  getImageFile(d) {
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


  changeStats(selection, chartValues) {
    d3.select('#yAxis').remove();
    const yAxisContainer = this.svg.append('g')
      .attr('id', 'yAxis');
    if (selection == 'height') {
      yAxisContainer
        .call(chartValues.height);
      chartValues.label.text('BTS Member Height (cm)');
      
      this.datapoints
        .transition()
        .attr('y', d => this.heightScale(d.height) - this.imageSize/2)
        .duration(800);
    } else if (selection == 'weight') {
      yAxisContainer
        .call(chartValues.weight);
      chartValues.label.text('BTS Member Weight (lbs)');
      this.datapoints
        .transition()
        .attr('y', d => this.weightScale(d.weight) - this.imageSize/2)
        .duration(800);
    }
  }
}
