const margin = { top: 200, bottom: 10, left: 300, right: 10 }
const gap = 6;

let keys = Object.keys(data["1996-97"])
let keyDict = {"Asian": "Asian", "White": "White", "International": "International", "Chicano_Latino": "Chicanx/Latinx", "African_American": "African American", "Decline_to_State": "Unknown", "Native_American_Alaska_Native": "Native American/Alaska Native", "Pacific_Islander": "Pacific Islander"}

let selectedCategory = "2019-20"

const select = d3.select('#select-div')
.append('select')
.attr('id', 'category-select')

select
  .selectAll('option')
  .data(Object.keys(data))
  .enter()
  .append('option')
  .attr('value', function (d) {
    return d
  })
  .text(function (d) {
    return d
  })

const svg2 = d3
  .select('#chart')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)

const g2 = svg2
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const tooltip2 = d3.select("#chart").append("div")
  .attr("class", "tooltip");

update()

select.on("change", function (d) {
      selectedCategory = d3.select(this).property("value");
      update()
  })

function update(d, i) {
  let ls = data[selectedCategory]
  let values = Object.keys(ls).map(function(key){
    return ls[key];
  });
  let pie2 = d3.pie();
  let arc2 = d3.arc()
    .innerRadius(radius * 0.5)
    .outerRadius(radius);
  let arcs2 = g2.selectAll("arc")
    .data(pie(values))
    .enter()
    .append("g")
    .attr("class", "arc")
  arcs2.append("path")
    .attr("fill", function(d, i) {
        return color(i);
    })
    .attr("d", arc2)
    .on("mouseover", function(d, i) {
        d3.select(this)
          .style("opacity", 0.7)
        tooltip2.transition()
          .style("opacity", 1)
        tooltip2.html("<strong>Hello</strong>") // keyDict[keys[i]]
          .style("left", (d3.event.pageX + 10) + "px")
          .style("top", (d3.event.pageY - 15) + "px")
          .style("background-color", "#FF0000")
          .style("color", "#FF0000")
        console.log(keyDict[keys[i]])
      })
    .on("mouseout", function(d) {
      d3.select(this)
        .style("opacity", 1)
      tooltip2.transition()
        .style("opacity", 0)
      })
};