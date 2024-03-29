var GENERATING = false

function generate_stamp () {
  if (GENERATING) return
  GENERATING = true

  // clear existing scallops
  $('.scallop').remove()

  var stmp = document.getElementById('plain-html'),
      stmp_offset = {
        left: stmp.offsetLeft,
        top:  stmp.offsetTop,
        radius: stmp.offsetWidth / 2,
        diameter: stmp.offsetWidth,
        center: {
          left: stmp.offsetLeft + stmp.offsetWidth / 2,
          top:  stmp.offsetTop  + stmp.offsetWidth / 2
        }
      },
      sclp_size = { width: 0, height: 0 },
      stmp_center = {
        x: stmp_offset.left + (stmp_offset.radius),
        y: stmp_offset.top  + (stmp_offset.radius)
      },
      total_scallops = 8 * 4,
      scallop_progression_deg = 360 / total_scallops,
      scallop_progression_rad = scallop_progression_deg * (Math.PI / 180)

  // place scallop with origin at (theta, {radius, center})
  var place_scallop = function (offset, origin_element) {
    /*
     * Polar to Rectangular coordinate conversions:
     *
     *   x = r cos(q),  y = r sin(q),
     *
     * where r is radius and q is angle in radians.
     */
    var sclp = document.createElement('div'),
        sclp_size = { height: 0, width: 0 },
        sclp_offset = { x: 0, y: 0 }

    sclp.className = 'scallop'
    document.body.appendChild(sclp)

    // calculate dimensions after placement
    sclp_size = {
      radius: sclp.offsetHeight / 2
    }

    // centered on 0, 0.
    // push scallop out slightly
    sclp_offset = {
      left: (origin_element.radius + 22) * Math.cos(offset),
      top:  (origin_element.radius + 22) * Math.sin(offset)
    }

    // move center to origin_element
    sclp_offset.top  += origin_element.center.top - sclp_size.radius
    sclp_offset.left += origin_element.center.left - sclp_size.radius

    sclp.style.top  = sclp_offset.top + 'px'
    sclp.style.left = sclp_offset.left + 'px'

    return sclp
  }

  for (var n=0; n <= total_scallops; n++) {
    place_scallop(n * scallop_progression_rad, stmp_offset)
  }

  GENERATING = false;
}
