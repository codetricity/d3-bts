const svg = d3.select('svg')
  .attr('width', '600')
  .attr('height', '400');

const buttons = d3.selectAll('input');

buttons.on('change', function(d) {
  let memberName = this.value;
  showImage(memberName);
})

function showImage(memberName) {
  let imageFile;
  if (memberName == "kim namjoon") {
    imageFile = 'assets/kim-namjoon-150x150-circle.png';
  } else if (memberName == 'kim seokjin') {
    imageFile = 'assets/kim-seokjin.png';
  }

  svg.append('image')
    .attr('xlink:href', imageFile)
    .attr('x', '0')
    .attr('y', '100')
    .attr('width', '150')
    .attr('height', '150')
    .attr('opacity', '0.1')
    .transition()
    .attr('x', '300')
    .attr('opacity', '1.0')
    .duration(700);
}