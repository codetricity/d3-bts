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
  statsButtons.on('change', function(d) {
    const statsSelection = this.value;
    changeStats(statsSelection, data);
  });
});

function changeStats(selection, data) {

  const chartTitle = document.getElementById('statsTitle');

  const memberList = []; 
  data.forEach(element => memberList.push(element.name));
  xScale = d3.scaleBand()
    .domain(memberList)
    .range([0, chartWidth]);
  
  yScale = d3.scaleLinear()
    .range([chartHeight, 0]);

  xAxis = d3.axisBottom(xScale);

  svgChart.append('g')
    .call(xAxis)
    .attr('transform', `translate(0, ${chartWidth})`);

  svgChart.append('g')
    .attr('id', '#yAxis')

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
    });


  if (selection == 'weight') {
    chartTitle.innerHTML = ('Member Weight');
    d3.selectAll('#yAxis').remove();
    yScale
     .domain(d3.extent(data, d => d.weight));
      
     yAxis = d3.axisLeft(yScale);

     svgChart.append('g')
       .attr('id', '#yAxis')
       .call(yAxis);
     images
       .transition()
       .attr('y', (d, i) => {
         return yScale(d.weight) - 50;
       })
       .duration(1200); 
  } else if (selection == 'height') {
    d3.selectAll('#yAxis').remove();

    chartTitle.innerHTML = ('Member Height');
    yScale
      .domain(d3.extent(data, d => d.height));

  yAxis = d3.axisLeft(yScale);

  svgChart.append('g')
    .attr('id', '#yAxis')
    .call(yAxis);
  images
    .transition()
    .attr('y', (d, i) => {
      return yScale(d.height) - 50;
    })
    .duration(1200);
  }



}