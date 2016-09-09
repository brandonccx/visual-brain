function drawTree(data) {
  var root = d3.hierarchy(data);
  var r = 510,
    r2 = r * 2,
    l = 400,
    pr = 6;
  var svg = d3.select('#container')
    .append('svg')
    .attr('width', r2).attr('height', r2)
    .append('g')
    .attr('transform', 'translate(' + r + ',' + r + ')');
  var tree = d3.cluster();
  console.log(root)
  tree.size([360, l - 90])
    .separation(function (a, b) {
      return (a.parent == b.parent ? 1 : 2) / a.depth;
    });
  tree(root);
  var link = svg.selectAll('.link')
    .data(root.descendants().slice(1))
    .enter().append('path')
    .attr('class', 'link')
    .attr('d', function (d) {
      var attr = [
        'M' + project(d.x, d.y),
        'C' + project(d.x, (d.y + d.parent.y) / 2),
        ' ' + project(d.parent.x, (d.y + d.parent.y) / 2),
        ' ' + project(d.parent.x, d.parent.y)
      ].join('');
      console.log(attr);
      return attr;
    });

  var node = svg.selectAll('.node')
    .data(root.descendants())
    .enter().append('g')
    .attr('class', 'node')
    .attr('transform', function (d) {
      return 'translate(' + project(d.x, d.y) + ')';
    });

  node.append('circle').attr('r', pr);

  node.append('text')
    .attr('dy', '.31em')
    .attr('x', function (d) {
      return d.x < 180 === !d.children ? pr + 4 : -pr - 4;
    })
    .style('text-anchor', function (d) {
      return d.x < 180 === !d.children ? 'start' : 'end';
    })
    .attr('transform', function (d) {
      return 'rotate(' + (d.x < 180 ? d.x - 90 : d.x + 90) + ')';
    })
    .text(function (d) {
      return d.data.name;
    });
}

function project(x, y) {
  var angle = (x - 90) / 180 * Math.PI,
    radius = y;
  return [radius * Math.cos(angle), radius * Math.sin(angle)];
}
