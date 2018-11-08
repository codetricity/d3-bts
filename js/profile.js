const svg = d3.select('#profile')
  .attr('width', '800')
  .attr('height', '300');

const profileListing = svg.append('g');

const buttons = d3.selectAll('input');


d3.csv('data/bts-profiles.csv').then((data) => {

  buttons.on('change', function(d) {
    let memberName = this.value;
    showImage(memberName);
    showData(memberName, data);
  });
});


function showData(memberName, data) {
  profileListing.selectAll('text').remove();
  data.forEach((element) => {
    if (element.name == memberName) {
      var yPosition = 50;
      for (var memberInfo in element) {
        let memberValue = element[memberInfo];
        profileListing
          .append('text')
          .attr('x', '50')
          .attr('y', yPosition)
          .text(`${memberInfo}:  ${memberValue}`);
        yPosition += 50;
      }
    }
  });
}

function showImage(memberName) {
  let imageFile;
  if (memberName == "Kim Namjoon") {
    imageFile = 'assets/kim-namjoon-150x150-circle.png';
  } else if (memberName == 'Kim Seokjin') {
    imageFile = 'assets/kim-seokjin.png';
  }

  /**
   * As there is only a single image, there is an easier way
   * to do this.  We are using the 6 step pattern for practice.
   * it is longer to do it this way, but good practice for future 
   * projects where there is a larger dataset
   * 
   *  1. select
   *  2. data
   *  3. exit
   *  4. update
   *  5. enter
   *  6. append
   */

  const images = svg.selectAll('image')  // 1. select all images 
    .data([imageFile]);  // 2. bind all images to data 
  
  images
    .exit().remove();   // 3. exit and remove unused elements

  images                // 4. update image elements on screen
    .attr('xlink:href', d => d)
    .attr('x', '0')
    .attr('y', '50')
    .attr('width', '150')
    .attr('height', '150')
    .attr('opacity', '0.1')
    .transition()
    .attr('x', '300')      // if there were multiple images, we'd need to update this
    .attr('opacity', '1.0')
    .duration(700);

  images.enter()    // 5. enter and return images to print to screen (none)
    .append('image')   // 6. append new images to screen (there are none)
    .attr('xlink:href', d => d)
    .attr('x', '0')
    .attr('y', '50')
    .attr('width', '150')
    .attr('height', '150')
    .attr('opacity', '0.1')
    .transition()
    .attr('x', '300')
    .attr('opacity', '1.0')
    .duration(700);
}