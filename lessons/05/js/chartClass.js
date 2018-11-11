class BtsChart {
  constructor(chartSettings, data) {
    this.width = chartSettings.width;
    this.height = chartSettings.height;
    this.imageSize = chartSettings.imageSize;
    this.idHtml = chartSettings.idHtml;
    this.data = data;
    this.margin = chartSettings.margin;

    this.svg = this.generateSvg();
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

  changeStats(selection) {
    console.log(`changing stats to ${selection}`);
  }
}
