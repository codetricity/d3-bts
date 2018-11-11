class BtsChart {
  constructor(chartSettings, data) {
    this.width = chartSettings.width;
    this.height = chartSettings.height;
    this.imageSize = chartSettings.imageSize;
    this.idHtml = chartSettings.idHtml;
    this.data = data;
    this.margin = chartSettings.margin;

    this.svg = this.generateSvg();
    this.datapoints = this.generateDatapoints();
    this.createXaxis();
  }


  generateSvg() {
    const svg = d3.select(this.idHtml)
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate( ${this.margin.left}, ${this.margin.top} )`);
    return svg;
  }

  generateDatapoints() {
    const datapoints = this.svg.selectAll('image')
      .data(this.data)
      .enter()
      .append('image')
      .attr('x', d => this.xScale(d.name) - this.imageSize/2 + this.xScale.bandwidth() /2 )
      .attr('xlink:href', d => this.getImageFile(d))
      .attr('width', this.imageSize)
      .attr('height', this.imageSize);
    return datapoints;
  }

  // JavaScript Getter
  get memberNames() {
    const memberNames = [];
    this.data.forEach(eachMember => {
      memberNames.push(eachMember.name);
    });
    return memberNames;
  }
  
  get xScale() {
    const xScale = d3.scaleBand()
      .domain(this.memberNames)
      .range([0, this.width]);
    return xScale;
  }

  createXaxis() {
    const xAxis = d3.axisBottom(this.xScale);
    this.svg.append('g')
    .call(xAxis)
    .attr('transform', `translate(0, ${this.height})`);
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

  changeStats(selection) {
    console.log(`changing stats to ${selection}`);
  }
}
