(function() {
  var $, cancelTooltip, closeAllTooltips, closeTooltip, iconPaths, loadCounties, loadMarkers, loadTooltips, map, maxZustand, moveTooltips, po, radius, resizeMap, showCounties, showLocations, showTooltips, styleCounties, styleFeatures, tips, toggleLegends, toggleTooltip, updateTooltip;
  $ = jQuery;
  po = org.polymaps;
  radius = 5;
  tips = {};
  maxZustand = 0;
  map = null;
  iconPaths = {
    abfall: ['M-3.448-15.771h0.218v0.812H3.23v-0.812h0.219c0.221,0,0.401-0.18,0.401-0.401c0-0.222-0.18-0.401-0.401-0.401H3.23h-6.459h-0.218c-0.222,0-0.401,0.179-0.401,0.401C-3.849-15.95-3.669-15.771-3.448-15.771z', 'M3.449-7.746H3.23V-8.56h-6.459v0.813h-0.218c-0.222,0-0.401,0.18-0.401,0.4c0,0.222,0.18,0.402,0.401,0.402h0.218H3.23h0.219c0.221,0,0.401-0.181,0.401-0.402S3.67-7.746,3.449-7.746z', 'M-3.229-9.304H3.23v-4.91h-6.459V-9.304z M-1.6-12.851c-0.14-0.141-0.14-0.368,0-0.509c0.141-0.141,0.368-0.141,0.508,0L0-12.267l1.092-1.093c0.14-0.141,0.368-0.141,0.508,0c0.141,0.141,0.141,0.369,0,0.509l-1.092,1.092l1.092,1.092c0.141,0.141,0.141,0.368,0,0.509c-0.07,0.07-0.162,0.105-0.254,0.105s-0.184-0.035-0.255-0.105L0-11.25l-1.093,1.092c-0.07,0.07-0.162,0.105-0.254,0.105c-0.092,0-0.184-0.035-0.254-0.105c-0.141-0.141-0.141-0.368,0-0.509l1.091-1.092L-1.6-12.851z'],
    betrieb: ['M2.048-10.678v-1.138l-2.298,1.138v-1.138l-2.298,1.138v-3.551c0-0.199-0.2-0.36-0.447-0.36h-0.904c-0.247,0-0.447,0.161-0.447,0.36v7.797c0,0.199,0.2,0.36,0.447,0.36h7.798c0.248,0,0.447-0.161,0.447-0.36v-4.246v-1.138L2.048-10.678z', 'M-2.964-15.275H1.01c0.286,0,0.518-0.231,0.518-0.518S1.297-16.31,1.01-16.31h-3.974c-0.286,0-0.518,0.231-0.518,0.518C-3.482-15.506-3.25-15.275-2.964-15.275z', 'M-0.2-16.852h2.421c0.286,0,0.518-0.231,0.518-0.518c0-0.286-0.231-0.518-0.518-0.518H-0.2c-0.286,0-0.518,0.231-0.518,0.518C-0.718-17.083-0.486-16.852-0.2-16.852z'],
    unfall: ['M-7.388-9.848l5.148,0.533l0.69,4.175l1.621-4.269l4.909,1.82l-2.623-2.936l5.03-1.146L2.5-13.019l1.993-3.375l-4.159,2.02l-2.637-3.259c0,0-0.614,4.967-0.697,5.092S-7.388-9.848-7.388-9.848z'],
    schiessplatz: ['M3.507-12.145h1.084h0.381h0.379c-0.179-2.559-2.226-4.61-4.783-4.796v0.379v0.381v1.085C2.111-14.921,3.338-13.689,3.507-12.145z', 'M-3.124-11.389h-1.088h-0.38H-4.97c0.191,2.547,2.233,4.584,4.782,4.769v-0.378V-7.38v-1.085C-1.722-8.639-2.944-9.855-3.124-11.389z', 'M0.568-14.332v2.188h2.176C2.583-13.272,1.693-14.166,0.568-14.332z', 'M-0.188-9.228v-2.161H-2.36C-2.189-10.273-1.305-9.393-0.188-9.228z', 'M-2.364-12.145h2.176v-2.188C-1.314-14.166-2.204-13.272-2.364-12.145z', 'M2.739-11.389H0.568v2.161C1.684-9.393,2.569-10.273,2.739-11.389z', 'M-4.973-12.145h0.379h0.382h1.085c0.169-1.545,1.396-2.776,2.939-2.951v-1.085v-0.381v-0.379C-2.746-16.755-4.793-14.703-4.973-12.145z', 'M4.589-11.389H3.502c-0.181,1.533-1.4,2.75-2.935,2.925v1.084v0.382v0.379c2.548-0.186,4.59-2.223,4.781-4.77H4.97H4.589L4.589-11.389z']
  };
  styleFeatures = po.stylist().attr("class", function(d) {
    return "vorgehen_" + d.properties.data['Vorgehen_Code'];
  });
  styleCounties = po.stylist().attr("class", function(d) {
    var z;
    z = d.properties.Zustand || 0;
    if (z === 0) {
      return "level_0";
    }
    if (z === 1) {
      return "level_1";
    }
    if (z <= 5) {
      return "level_2";
    }
    if (z <= 10) {
      return "level_3";
    }
    if (z <= 15) {
      return "level_4";
    }
    if (z <= 20) {
      return "level_5";
    }
    return "level_6";
  });
  loadCounties = function(e) {
    var f, _i, _len, _ref, _results;
    _ref = e.features;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      f = _ref[_i];
      _results.push(f.data.properties.Zustand > maxZustand ? maxZustand = f.data.properties.Zustand : void 0);
    }
    return _results;
  };
  loadMarkers = function(e) {
    var c, d, f, icon, marker, p, u, _i, _j, _k, _l, _len, _len2, _len3, _len4, _len5, _m, _ref, _ref2, _ref3, _ref4, _ref5, _results;
    _ref = e.features;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      f = _ref[_i];
      marker = po.svg('path');
      marker.setAttribute('d', "M6.042-17.578c-3.238-3.233-8.483-3.229-11.716,0.01s-3.229,8.483,0.01,11.715L0.2,0l5.853-5.863    	C9.285-9.102,9.281-14.347,6.042-17.578z");
      marker.setAttribute('class', 'markerBackground');
      icon = po.svg('g');
      icon.setAttribute('class', 'icon');
      switch (f.data.properties.data['Typ_Code']) {
        case 1:
          _ref2 = iconPaths.abfall;
          for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
            d = _ref2[_j];
            p = po.svg('path');
            p.setAttribute('d', d);
            icon.appendChild(p);
          }
          break;
        case 2:
          _ref3 = iconPaths.betrieb;
          for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
            d = _ref3[_k];
            p = po.svg('path');
            p.setAttribute('d', d);
            icon.appendChild(p);
          }
          break;
        case 3:
          _ref4 = iconPaths.unfall;
          for (_l = 0, _len4 = _ref4.length; _l < _len4; _l++) {
            d = _ref4[_l];
            p = po.svg('path');
            p.setAttribute('d', d);
            icon.appendChild(p);
          }
          break;
        case 4:
          _ref5 = iconPaths.schiessplatz;
          for (_m = 0, _len5 = _ref5.length; _m < _len5; _m++) {
            d = _ref5[_m];
            p = po.svg('path');
            p.setAttribute('d', d);
            icon.appendChild(p);
          }
      }
      d = f.data;
      c = f.element;
      p = c.parentNode;
      u = f.element = marker;
      f.icon = icon;
      u.setAttribute("transform", c.getAttribute("transform"));
      icon.setAttribute("transform", c.getAttribute("transform"));
      p.removeChild(c);
      p.appendChild(u);
      _results.push(p.appendChild(icon));
    }
    return _results;
  };
  loadTooltips = function(e) {
    var f, _i, _len, _ref, _results;
    _ref = e.features;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      f = _ref[_i];
      f.element.addEventListener("mousedown", toggleTooltip(f.data), false);
      f.icon.addEventListener("mousedown", toggleTooltip(f.data), false);
      _results.push(f.element.addEventListener("dblclick", cancelTooltip, false));
    }
    return _results;
  };
  showTooltips = function(e) {
    var f, tip, _i, _len, _ref, _results;
    _ref = e.features;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      f = _ref[_i];
      tip = tips[f.data.id];
      tip.feature = f.data;
      tip.location = {
        lat: f.data.geometry.coordinates[1],
        lon: f.data.geometry.coordinates[0]
      };
      _results.push(updateTooltip(tip));
    }
    return _results;
  };
  moveTooltips = function() {
    var id, tip, _results;
    _results = [];
    for (id in tips) {
      tip = tips[id];
      _results.push(updateTooltip(tip));
    }
    return _results;
  };
  cancelTooltip = function(e) {
    e.stopPropagation();
    return e.preventDefault();
  };
  updateTooltip = function(tip) {
    var p;
    if (!tip.visible) {
      return;
    }
    p = map.locationPoint(tip.location);
    tip.anchor.style.left = p.x - radius + "px";
    tip.anchor.style.top = p.y - 20 + "px";
    return $(tip.anchor).tipsy("show");
  };
  closeTooltip = function(tip) {
    if (!tip.visible) {
      return;
    }
    tip.visible = false;
    return $(tip.anchor).tipsy("hide");
  };
  closeAllTooltips = function(exceptTip) {
    var id, t, _results;
    _results = [];
    for (id in tips) {
      t = tips[id];
      _results.push(t !== exceptTip ? closeTooltip(t) : void 0);
    }
    return _results;
  };
  toggleTooltip = function(f) {
    var tip, tipContent, type_icon;
    tip = tips[f.id];
    if (!tip) {
      tip = {
        anchor: document.getElementById("map").appendChild(document.createElement("a")),
        visible: false,
        toggle: function(e) {
          tip.visible = !tip.visible;
          if (tip.visible) {
            updateTooltip(tip);
            $(tip.anchor).tipsy("show");
            closeAllTooltips(tip);
          } else {
            $(tip.anchor).tipsy("hide");
          }
          return cancelTooltip(e);
        }
      };
      tips[f.id] = tip;
      $(tip.anchor).css({
        position: 'absolute',
        visibility: 'hidden',
        width: radius * 2 + 'px',
        height: radius * 2 + 'px'
      });
      type_icon = "";
      switch (f.properties.data['Typ_Code']) {
        case 1:
          type_icon = "Abfallablagerung.png";
          break;
        case 2:
          type_icon = "Betriebsstandort.png";
          break;
        case 3:
          type_icon = "Unfallstandort.png";
          break;
        case 4:
          type_icon = "Schiessplatz.png";
      }
      tipContent = "<div class='type_icon'><img src='assets/app/images/icons/" + type_icon + "'/></div>" + "<h3>" + f.properties.data["Typ_Text"] + ": " + f.properties.data["Bezeichnung"] + "</h3><p>" + f.properties.data["Tätigkeit_Text"] + "<br/>" + f.properties.data["Gemeinde"] + "(" + f.properties.data["Kanton"] + "), " + f.properties.data["Betriebsdauer"] + "<br/>" + f.properties.data["Vorgehen_Text"] + "</p>";
      $(tip.anchor).tipsy({
        fallback: tipContent,
        gravity: $.fn.tipsy.autoNS,
        trigger: "hover",
        html: true
      });
    }
    return tip.toggle;
  };
  showCounties = function(e) {
    $('#show_locations').removeClass("active");
    $('#show_counties').addClass("active");
    $('#map').removeClass("show_locations").addClass("show_counties");
    e.stopPropagation();
    e.preventDefault();
    return toggleLegends();
  };
  showLocations = function(e) {
    $('#show_counties').removeClass("active");
    $('#show_locations').addClass("active");
    $('#map').removeClass("show_counties").addClass("show_locations");
    e.stopPropagation();
    e.preventDefault();
    return toggleLegends();
  };
  toggleLegends = function(e) {
    $('#legend_counties').fadeToggle();
    return $('#legend_locations').fadeToggle();
  };
  resizeMap = function(e) {
    var $map, map_height, map_offset;
    $map = $("#map");
    map_offset = $map.offset();
    map_height = $(window).height() - map_offset.top;
    $map.css({
      height: map_height,
      overflow: "hidden"
    });
    return $("body").css({
      height: map_height,
      overflow: "hidden"
    });
  };
  $(function() {
    if ($('html.svg').length === 0) {
      alert("Your Browser must support SVG. Please upgrade to a newer/other one.");
      return;
    }
    if ($("#map").length === 0) {
      return;
    }
    map = po.map().container(document.getElementById("map").appendChild(po.svg("svg"))).center({
      lon: 8.231944,
      lat: 46.798333
    }).zoom(8).zoomRange([8, 14]).add(po.interact()).on("move", moveTooltips).on("resize", moveTooltips);
    map.add(po.image().url(po.url("http://{S}tile.cloudmade.com/1a1b06b230af4efdbb989ea99e9841af/45763/256/{Z}/{X}/{Y}.png").hosts(["a.", "b.", "c.", ""])));
    $.getJSON("media/maps/schweiz_gemeinden_geojson_bereinigt.json", function(countyData) {
      map.add(po.geoJson().id("layer_counties").features(countyData.features).on("load", styleCounties).on("load", loadCounties));
      return $.getJSON("media/data/vbs-belastete-standorte_bereinigt.json", function(locationData) {
        var features, i, row, _i, _len, _ref;
        i = 0;
        features = [];
        _ref = locationData.rows;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          row = _ref[_i];
          features.push({
            id: "p" + i++,
            type: "Feature",
            geometry: {
              coordinates: [row['Longitude_WGS84'], row['Latitude_WGS84']],
              type: "Point"
            },
            properties: {
              data: row
            }
          });
        }
        map.add(po.geoJson().id("layer_locations").on("load", loadMarkers).on("load", loadTooltips).on("load", styleFeatures).on("show", showTooltips).features(features));
        map.add(po.compass().pan("none"));
        return $('#legend_locations').fadeToggle();
      });
    });
    $('#show_locations').click(showLocations);
    $('#show_counties').click(showCounties);
    $('.teaser').fitted();
    $('.tipsy').live('mousedown', function(e) {
      return closeAllTooltips();
    });
    $(window).resize(resizeMap);
    return resizeMap();
  });
}).call(this);
