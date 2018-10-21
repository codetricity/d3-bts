const chartHeight = 300;
const chartWidth = 600;
const margin = {left: 100, right: 50, top: 50, bottom: 100};


const svgChart = d3.select('#chart')
  .attr('width', 600 + margin.left + margin.right)
  .attr('height', 400 + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate( ${margin.left}, ${margin.top} )`);

  d3.csv('data/bts-profiles.csv').then(data => {
    const memberList = []; 
    data.forEach(element => memberList.push(element.name));
    xScale = d3.scaleBand()
      .domain(memberList)
      .range([0, chartWidth]);
    
    yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.height))
      .range([chartHeight, 0]);
    xAxis = d3.axisBottom(xScale);

    svgChart.append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${chartHeight})`);

    let images = svgChart.selectAll('image')
      .data(data);

    images
      .enter()
      .append('image')
      .attr('x', (d, i) => {
        return i * xScale.bandwidth() + xScale.bandwidth()/4;
      })
      .attr('y', chartHeight)
      .attr('width', 50)
      .attr('height', 50)
      .attr('xlink:href', d => {
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
      })
      .transition()
      .attr('y', (d, i) => {
        return yScale(d.height) - 50;
      })
      .duration(1200);
    console.log(images);

  });
