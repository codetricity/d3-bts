class BtsChart {
  constructor(chartSettings, data) {
    this.width = chartSettings.width;
    this.height = chartSettings.height;
    this.imageSize = chartSettings.imageSize;
    this.idHtml = chartSettings.idHtml;
    this.data = data;
    this.margin = chartSettings.margin;
  }

  changeStats(selection) {
    console.log(`changing stats to ${selection}`);
  }
}