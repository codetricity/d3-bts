const svg = d3.select('#profile')
  .attr('width', '800')
  .attr('height', '300');

const profileListing = svg.append('g');

const buttons = d3.selectAll('input');

d3.csv('data/bts-profiles.csv').then((data) => {
  buttons.on('change', function() {
    const memberName = this.value;
    showData(memberName, data);
    showImage(memberName);
  });
});

function showData(memberName, data) {
  profileListing.selectAll('text').remove();
 data.forEach(element => {
   console.log(element.name);
 });

}

function showImage(memberName) {
  console.log(`Showing image for ${memberName}`);
}