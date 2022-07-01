console.log("loaded");

const svg = d3.select("svg");

svg.attr("width", 800);
svg.attr("height", data.length * 150); //height of SVG tag is number of cities * 150px each

//adding a colour scale for our chart here

const colorScale = d3.scaleLinear()
    .domain([-10, 0, 7, 14, 21, 24]) //our range of temperatures
    .range(["#3f24ec", "#3f24ec", "#79e87C", "#fbe157", "#ff9737", "#fe3b3b"])

const boxScale = d3.scaleLinear() //set scale to slightly bump circle position
    .domain([-20, 45]) 
    .range([150, 0])

const lineGenerator = d3.line()
    .x((d,i) =>{ return 225 + 50*i})
    .y((d,i) => {return boxScale(d)})

const unitScale = d3.scaleLinear()
    .domain([0, 100])
    .rangeRound([32, 212])

const dataPoints = svg
  .selectAll("g.data-point") //select all data-point groups
  .data(data) //using data function on our data object
  .enter() // enter any data source which hasnt been added to page
  .append("g") //append a group to the end of this
  .attr("class", "data-point") // add data-point class to each group groups do NOT have an x and y
  .attr("transform", (d, i) => {
    return `translate(0, ${i * 150})`;
  });

dataPoints
  .append("text") // append a text element to each data point
  .attr("x", 175)
  .attr("y", 70)
  .attr("class", "city")
  .text((d, i) => {
    return d.city;
  }); //i is for index, d is for data at index

dataPoints
  .append("text")
  .attr("x", 175)
  .attr("y", 100)
  .attr("class", "country")
  .text((d, i) => {
    return d.country;
  }); //i is for index, d is for data at index


  //adding the line



const months = dataPoints
  .append("g")
  .attr("class", "months")
  .attr("transform", "translate(200, 0)")

const monthGroups = months
  .selectAll("g.month")
  .data((d,i) => {return d.months}) //what data so we want to give the monthsGroup?
  .enter()
  .append("g")
  .attr("class", "month")
  .attr("transform", (d, i) =>{return `translate(${i * 50}, 0)`})

  monthGroups
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 50)
    .attr("height", 140)
    .style("fill", (d,i)=>{ 
        // d here is the actual number of the data point
        return colorScale(d)
    } ) //base our fills on our linear colour scale

monthGroups
    .append("circle")
    .attr("cx", 25)
    .attr("cy", (d,i)=>{ return boxScale(d)})
    .attr("r", 15)
    .attr("class", "circle")

const temperatures = monthGroups
    .append("text")
    .attr("class", "temp")
    .attr( "x", 25)
    .attr("y", (d,i)=>{ return boxScale(d) + 2})
    .text((d,i) =>{
        return d
    })
    .style("fill", (d,i)=>{ 
        // d here is the actual number of the data point
        return colorScale(d)
    } ) //base our fills on our linear colour scale


    dataPoints
    .append("path")
    .datum((d,i) =>{return d.months})
    .attr("d", (d,i)=>{return lineGenerator(d)})


const selectTag = document.querySelector("select")
selectTag.addEventListener("input", ()=>{
    if(selectTag.value === "c"){
        temperatures.text((d,i) => {return d})
    } else{
        temperatures.text((d,i) => {return unitScale(d)})
    }
})