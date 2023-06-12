/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React from "react";
import * as d3 from "d3";

async function drawChart(svgRef: React.RefObject<SVGSVGElement>) {
  const width = 800;
  const height = 750;

  const svg = d3.select(svgRef.current)
    .attr("width", width)
    .attr("height", height)

          
  await d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_network.json")
   .then((data: any) => {

  // Initialize the links
  
  const link = svg
    .selectAll("line")
    .data(data.links)
    .enter()
    .append("line")
      .style("stroke", "#aaa");

  // Initialize the nodes
  const node = svg
    .selectAll("circle")
    .data(data.nodes)
    .enter()
    .append("circle")
      .attr("r", 40)
      .style("fill", "#69b3a2");
  
  const label = svg
    .selectAll("text")
    .data(data.nodes)
    .enter()
    .append("text")
      .text(function (d) { return d.name; })
      .style("text-anchor", "middle")
      .style("fill", "#555")
      .style("font-family", "Arial")
      .style("font-size", 12);

  const firstLabel = svg.selectAll("text")
    .filter(function(d, i) {
      return i === 0;
    });
  firstLabel.style("fill", "blue");


  // Let's list the force we wanna apply on the network
  const simulation = d3.forceSimulation(data.nodes)                 // Force algorithm is applied to data.nodes
      .force("link", d3.forceLink()                               // This force provides links between nodes
            .id(function(d) { return d.id; })                     // This provide  the id of a node
            .links(data.links)                                    // and this the list of links
      )
      .force("charge", d3.forceManyBody().strength(-2000))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
      .force("center", d3.forceCenter(width / 2, height / 2))     // This force attracts nodes to the center of the svg area
      .on("tick", ticked);

  // This function is run at each iteration of the force algorithm, updating the nodes position.
  function ticked() {
    data.nodes[0].x = width / 2;
    data.nodes[0].y = height / 2;
    

    link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

    node
      .attr("cx", function (d) { return d.x+6; })
      .attr("cy", function(d) { return d.y-6; });

    label
      .attr("x", function(d){ return d.x + 5; })
      .attr("y", function (d) {return d.y - 10; });
  }

});
}


const Chart: React.FunctionComponent = () => {
  const svg = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    void drawChart(svg);
  }, [svg]);

  return (
    <div id="chart" className="flex justify-center">
      <svg ref={svg} /> 
    </div>
  );
};

export default Chart;