import colors, { subtleWheat } from "./colors";

export default {
  "plotOptions": { 
    "scatter": { "marker": { "radius": 5 }},
    "area": { "marker": { "radius": 3 }},
    "line": { "marker": { "radius": 3 }},
    "column": { "pointWidth": 30 },
    "series": { "stickyTracking": false },
    // "column": { "maxPointWidth": 40 },
    // "series": { "yAxis": { "stackLabels": { enabled: true } } },
  },
  "chart": {
    // "height": 400,
    "backgroundColor": "#FFFFFF",
    "plotBackgroundColor": "#F8F8F8",
    "style": {
      "color": "#000000",
      "fontFamily": "Arial, sans-serif"
      // "fontFamily": "Verdana, sans-serif"
    }
  },
  "legend": { "enabled": true },
  "credits": { "enabled": false },
  "colors": colors,
  "xAxis": {
    "stackLabels": { "enabled": true, "style": { "fontWeight": "bold", "color": "gray" } },
    "labels": {
      "style": {
        "color": "#666666"
      }
    },
    "title": {
      "style": {
        "color": "#000000"
      }
    },
    "startOnTick": false,
    "endOnTick": false,
    "gridLineColor": "#FFFFFF",
    "gridLineWidth": 1.5,
    "tickWidth": 1.5,
    "tickLength": 5,
    "tickColor": "#666666",
    "minorTickInterval": 0,
    "minorGridLineColor": "#FFFFFF",
    "minorGridLineWidth": 0.5
  },
  "yAxis": {
    "stackLabels": { "enabled": true, "style": { "fontWeight": "bold", "color": "gray" } },
    "labels": {
      "style": {
        "color": "#666666"
      }
    },
    "title": {
      "style": {
        "color": "#000000"
      }
    },
    "startOnTick": false,
    "endOnTick": false,
    "gridLineColor": "#FFFFFF",
    "gridLineWidth": 1.5,
    "tickWidth": 1.5,
    "tickLength": 5,
    "tickColor": "#666666",
    "minorTickInterval": 0,
    "minorGridLineColor": "#FFFFFF",
    "minorGridLineWidth": 0.5
  },
  "legendBackgroundColor": "rgba(0, 0, 0, 0.5)",
  "background2": "#505053",
  "dataLabelsColor": "#B0B0B3",
  "textColor": "#C0C0C0",
  "contrastTextColor": "#F0F0F3",
  "maskColor": "rgba(255,255,255,0.3)"
}
