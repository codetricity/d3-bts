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
  } else if (memberName == 'Jung Hoseok') {
    imageFile = 'assets/jung-hoseok-150x150-circle.png';
  } else if (memberName == 'Jeon Jeong-guk') {
    imageFile = 'assets/jeon-jeong-guk-150x150-circle.png';
  } else if (memberName == 'Kim Taehyung') {
    imageFile = 'assets/kim-taehyung-150x150.png';
  } else if (memberName == 'Min Yoongi') {
    imageFile = 'assets/min-yoongi.png';
  } else if (memberName == 'Park Jimin') {
    imageFile = 'assets/park-jimin-150x150-circle.png';
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

  
  const images = svg.selectAll('image')  // step 1: select
    .data([imageFile]); // step 2: data
  images.exit().remove(); // step 3: exit

  images  // step 4: update
    .attr('xlink:href', d => d) // you could use imageFile here
    .attr('x', 0)
    .attr('opacity', '0.1')
    .transition()
    .attr('x', 300)
    .attr('opacity', '1.0')
    .duration(800);
  
  images.enter()  // step 5: enter
    .append('image')   // step 6: append
    .attr('xlink:href', d => d) // this is for practice. you can use imageFile
    .attr('x', '0')
    .attr('y', '50')
    .attr('opacity', '0.1')
    .attr('height', '150')
    .attr('width', '150')
    .transition()
    .attr('x', '300')
    .attr('opacity', '1.0')
    .duration(800);
}
