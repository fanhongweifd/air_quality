// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.13/esri/copyright.txt for details.
//>>built
define("esri/tasks/PrintTask","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/json dojo/_base/Deferred dojo/has ../kernel ../lang ../layerUtils ../deferredUtils ../Color ./Task ../geometry/Polygon ../renderers/SimpleRenderer ../geometry/scaleUtils ./Geoprocessor ./PrintTemplate dojo/dom-construct dojox/gfx/_base dojox/gfx/canvas dojox/json/query dojo/has!extend-esri?./PrintParameters dojo/has!extend-esri?./LegendLayer".split(" "),function(t,l,p,u,z,v,A,w,x,B,C,D,E,F,G,H,I,J,s,y,K){t=
t(D,{declaredClass:"esri.tasks.PrintTask",constructor:function(b,f){this.url=b;this.printGp=new H(this.url);this._handler=l.hitch(this,this._handler);f&&f.async&&(this.async=f.async);this._colorEvaluator=K("$..color")},_handler:function(b,f,a,d,c){try{var m;this.async?"esriJobSucceeded"===b.jobStatus&&this.printGp.getResultData(b.jobId,"Output_File",l.hitch(this,function(b){m=b.value;this._successHandler([m],"onComplete",a,c)})):(m=b[0].value,this._successHandler([m],"onComplete",a,c))}catch(e){this._errorHandler(e,
d,c)}},execute:function(b,f,a){var d=this._handler,c=this._errorHandler,m=b.template||new I,e=m.exportOptions,g;e&&(g={outputSize:[e.width,e.height],dpi:e.dpi});this._outScale=m.outScale;this._preserveScale=!1!==m.preserveScale;var e=m.layoutOptions,h,k=[];if(e){this.legendAll=!1;e.legendLayers?p.forEach(e.legendLayers,function(a){var b={};b.id=a.layerId;a.subLayerIds&&(b.subLayerIds=a.subLayerIds);k.push(b)}):this.legendAll=!0;var n,q;if("Miles"===e.scalebarUnit||"Kilometers"===e.scalebarUnit)n=
"esriKilometers",q="esriMiles";else if("Meters"===e.scalebarUnit||"Feet"===e.scalebarUnit)n="esriMeters",q="esriFeet";h={esriMiles:"mi",esriKilometers:"km",esriFeet:"ft",esriMeters:"m"};h={titleText:e.titleText,authorText:e.authorText,copyrightText:e.copyrightText,customTextElements:e.customTextElements,scaleBarOptions:{metricUnit:n,metricLabel:h[n],nonMetricUnit:q,nonMetricLabel:h[q]},legendOptions:{operationalLayers:k}}}n=this._getPrintDefinition(b.map);b.outSpatialReference&&(n.mapOptions.spatialReference=
b.outSpatialReference.toJson());b.template&&w.isDefined(b.template.showAttribution)&&(n.mapOptions.showAttribution=b.template.showAttribution);l.mixin(n,{exportOptions:g,layoutOptions:h});this.allLayerslegend&&l.mixin(n.layoutOptions,{legendOptions:{operationalLayers:this.allLayerslegend}});m={Web_Map_as_JSON:u.toJson(w.fixJson(n)),Format:m.format,Layout_Template:m.layout};b.extraParameters&&(m=l.mixin(m,b.extraParameters));var r=new z(B._dfdCanceller);b=function(b,c){d(b,c,f,a,r)};g=function(b){c(b,
a,r)};r._pendingDfd=this.async?this.printGp.submitJob(m,b,null,g):this.printGp.execute(m,b,g);return r},onComplete:function(){},_createMultipointLayer:function(){return{layerDefinition:{name:"multipointLayer",geometryType:"esriGeometryMultipoint",drawingInfo:{renderer:null}},featureSet:{geometryType:"esriGeometryMultipoint",features:[]}}},_createPolygonLayer:function(){return{layerDefinition:{name:"polygonLayer",geometryType:"esriGeometryPolygon",drawingInfo:{renderer:null}},featureSet:{geometryType:"esriGeometryPolygon",
features:[]}}},_createPointLayer:function(){return{layerDefinition:{name:"pointLayer",geometryType:"esriGeometryPoint",drawingInfo:{renderer:null}},featureSet:{geometryType:"esriGeometryPoint",features:[]}}},_createPolylineLayer:function(){return{layerDefinition:{name:"polylineLayer",geometryType:"esriGeometryPolyline",drawingInfo:{renderer:null}},featureSet:{geometryType:"esriGeometryPolyline",features:[]}}},_convertSvgSymbol:function(b){if(!(8>=v("ie"))&&b.path){this._canvasHolder||(this._canvasHolder=
J.create("div"),this._canSurface=y.createSurface(this._canvasHolder,200,200));var f=this._canSurface.createObject(y.Path,b.path).setFill(b.color).setStroke(b.outline);"pendingRender"in this._canSurface&&this._canSurface._render(!0);var a=this._canSurface.rawNode.getContext("2d"),d=Math.ceil(f.getBoundingBox().width+f.getBoundingBox().x),c=Math.ceil(f.getBoundingBox().height+f.getBoundingBox().y),m=a.getImageData(f.getBoundingBox().x,f.getBoundingBox().y,d,c);a.canvas.width=d;a.canvas.height=c;a.putImageData(m,
0,0);a=a.canvas.toDataURL("image/png");return{type:"esriPMS",imageData:a.substr(22,a.length),angle:-b.angle,contentType:"image/png",height:b.size?b.size:c-f.getBoundingBox().y,width:b.size?b.size:d-f.getBoundingBox().x,xoffset:b.xoffset,yoffset:b.yoffset}}},_convertSvgRenderer:function(b){"simple"===b.type&&b.symbol&&b.symbol.path?b.symbol=this._convertSvgSymbol(b.symbol):"uniqueValue"===b.type?(b.defaultSymbol&&b.defaultSymbol.path&&(b.defaultSymbol=this._convertSvgSymbol(b.defaultSymbol)),b.uniqueValueInfos&&
p.forEach(b.uniqueValueInfos,function(b){b.symbol.path&&(b.symbol=this._convertSvgSymbol(b.symbol))},this)):"classBreaks"===b.type&&(b.defaultSymbol&&b.defaultSymbol.path&&(b.defaultSymbol=this._convertSvgSymbol(b.defaultSymbol)),b.classBreakInfos&&p.forEach(b.classBreakInfos,function(b){b.symbol.path&&(b.symbol=this._convertSvgSymbol(b.symbol))},this))},_createFeatureCollection:function(b,f,a){var d=this._createPolygonLayer(),c=this._createPolylineLayer(),m=this._createPointLayer(),e=this._createMultipointLayer(),
g=this._createPointLayer();g.layerDefinition.name="textLayer";delete g.layerDefinition.drawingInfo;if("esri.layers.FeatureLayer"===b.declaredClass||"esri.layers.StreamLayer"===b.declaredClass)d.layerDefinition.name=c.layerDefinition.name=m.layerDefinition.name=e.layerDefinition.name=l.getObject("arcgisProps.title",!1,b)||b.name||b.id;if(b.renderer&&!l.isFunction(b.renderer.attributeField)){var h=b.renderer.toJson();if("temporal"===h.type){var h={latestObservationRenderer:h.latestObservationRenderer,
trackLinesRenderer:h.trackRenderer,observationAger:h.observationAger,renderer:h.observationRenderer},k={};b._trackIdField&&(k.trackIdField=b._trackIdField);b._startTimeField&&(k.startTimeField=b._startTimeField);b._endTimeField&&(k.endTimeField=b._endTimeField);d.layerDefinition.drawingInfo=h;d.layerDefinition.timeInfo=k;c.layerDefinition.drawingInfo=h;c.layerDefinition.timeInfo=k;m.layerDefinition.drawingInfo=h;m.layerDefinition.timeInfo=k;e.layerDefinition.drawingInfo=h;e.layerDefinition.timeInfo=
k}else d.layerDefinition.drawingInfo.renderer=h,c.layerDefinition.drawingInfo.renderer=h,m.layerDefinition.drawingInfo.renderer=h,e.layerDefinition.drawingInfo.renderer=h}else delete d.layerDefinition.drawingInfo,delete c.layerDefinition.drawingInfo,delete m.layerDefinition.drawingInfo,delete e.layerDefinition.drawingInfo;h=b.fields;!h&&(b.renderer&&!l.isFunction(b.renderer.attributeField))&&("esri.renderer.ClassBreaksRenderer"===b.renderer.declaredClass?(h=[{name:b.renderer.attributeField,type:"esriFieldTypeDouble"}],
b.renderer.normalizationField&&h.push({name:b.renderer.normalizationField,type:"esriFieldTypeDouble"})):"esri.renderer.UniqueValueRenderer"===b.renderer.declaredClass&&(h=[{name:b.renderer.attributeField,type:"esriFieldTypeString"}],b.renderer.attributeField2&&h.push({name:b.renderer.attributeField2,type:"esriFieldTypeString"}),b.renderer.attributeField3&&h.push({name:b.renderer.attributeField3,type:"esriFieldTypeString"})));h&&(d.layerDefinition.fields=h,c.layerDefinition.fields=h,m.layerDefinition.fields=
h,e.layerDefinition.fields=h);var h=b.graphics.length,n;for(n=0;n<h;n++){var q=b.graphics[n];if(!1!==q.visible&&q.geometry&&(k=q.toJson(),!k.symbol||!(k.symbol.outline&&"esriCLS"===k.symbol.outline.type))){k.symbol&&(k.symbol.outline&&k.symbol.outline.color&&k.symbol.outline.color[3])&&(k.symbol.outline.color[3]=255);if(b.renderer&&!k.symbol&&(l.isFunction(b.renderer.attributeField)||b.renderer.hasVisualVariables()||"esri.renderer.DotDensityRenderer"===b.renderer.declaredClass||a)){a=a||b.renderer;
var r=a.getSymbol(q);if(!r)continue;k.symbol=r.toJson();a.hasVisualVariables()&&this._applyVisualVariables(k.symbol,{renderer:a,graphic:q,symbol:r,mapResolution:f&&f.getResolutionInMeters()})}k.symbol&&(k.symbol.path?k.symbol=this._convertSvgSymbol(k.symbol):k.symbol.text&&delete k.attributes);switch(q.geometry.type){case "polygon":d.featureSet.features.push(k);break;case "polyline":c.featureSet.features.push(k);break;case "point":k.symbol&&k.symbol.text?g.featureSet.features.push(k):m.featureSet.features.push(k);
break;case "multipoint":e.featureSet.features.push(k);break;case "extent":k.geometry=E.fromExtent(q.geometry).toJson(),d.featureSet.features.push(k)}}}f=[];0<d.featureSet.features.length&&f.push(d);0<c.featureSet.features.length&&f.push(c);0<e.featureSet.features.length&&f.push(e);0<m.featureSet.features.length&&f.push(m);0<g.featureSet.features.length&&f.push(g);p.forEach(f,function(a){a.layerDefinition.drawingInfo&&a.layerDefinition.drawingInfo.renderer&&this._convertSvgRenderer(a.layerDefinition.drawingInfo.renderer)},
this);return{id:b.id,opacity:b.opacity,minScale:b.minScale||0,maxScale:b.maxScale||0,featureCollection:{layers:f}}},_getPrintDefinition:function(b){var f={operationalLayers:this._createOperationalLayers(b)},a=b.extent,d=b.spatialReference;b.spatialReference._isWrappable()&&(a=a._normalize(!0),d=a.spatialReference);a={mapOptions:{showAttribution:b.showAttribution,extent:a.toJson(),spatialReference:d.toJson()}};this._preserveScale&&l.mixin(a.mapOptions,{scale:this._outScale||G.getScale(b)});b.timeExtent&&
l.mixin(a.mapOptions,{time:[b.timeExtent.startTime.getTime(),b.timeExtent.endTime.getTime()]});b={};l.mixin(b,a,f);return b},_createOperationalLayers:function(b){var f,a,d,c,m=[],e=[];this.allLayerslegend=this.legendAll?[]:null;var g=p.map(b.layerIds,b.getLayer,b);b._mapImageLyr&&g.push(b._mapImageLyr);for(f=0;f<g.length;f++)if(a=g[f],a.loaded&&a.visible&&-1===p.indexOf(m,a.id))switch(d=a.declaredClass,c={id:a.id,title:l.getObject("arcgisProps.title",!1,a)||a.id,opacity:a.opacity,minScale:a.minScale||
0,maxScale:a.maxScale||0},c=l.mixin(c,this._getUrlAndToken(a)),d){case "esri.layers.ArcGISDynamicMapServiceLayer":var h=[];d=!!a._params.layers;if(a._params.dynamicLayers)d=u.fromJson(a._params.dynamicLayers),p.forEach(d,function(a){h.push({id:a.id,name:a.name,layerDefinition:a});delete a.id;delete a.name;delete a.maxScale;delete a.minScale});else if(a.supportsDynamicLayers){if(d||a.layerDefinitions||a.layerTimeOptions){var k=a.createDynamicLayerInfosFromLayerInfos(),n=null;d&&(n=a.visibleLayers);
var n=x._getVisibleLayers(k,n),q=x._getLayersForScale(this._outScale||b.getScale(),k);p.forEach(k,function(b){if(!b.subLayerIds){var c=b.id;-1<p.indexOf(n,c)&&-1<p.indexOf(q,c)&&(b={source:b.source.toJson()},a.layerDefinitions&&a.layerDefinitions[c]&&(b.definitionExpression=a.layerDefinitions[c]),a.layerTimeOptions&&a.layerTimeOptions[c]&&(b.layerTimeOptions=a.layerTimeOptions[c].toJson()),h.push({id:c,layerDefinition:b}))}});0===h.length&&(c.visibleLayers=[-1])}}else p.forEach(a.layerInfos,function(b){var c=
{id:b.id,layerDefinition:{}};a.layerDefinitions&&a.layerDefinitions[b.id]&&(c.layerDefinition.definitionExpression=a.layerDefinitions[b.id]);a.layerTimeOptions&&a.layerTimeOptions[b.id]&&(c.layerDefinition.layerTimeOptions=a.layerTimeOptions[b.id].toJson());(c.layerDefinition.definitionExpression||c.layerDefinition.layerTimeOptions)&&h.push(c)}),d&&(c.visibleLayers=a.visibleLayers);h.length&&(c.layers=h);e.push(c);this.allLayerslegend&&this.allLayerslegend.push({id:a.id,subLayerIds:a.visibleLayers});
break;case "esri.layers.ArcGISImageServiceLayer":c=l.mixin(c,{url:a.url,bandIds:a.bandIds,compressionQuality:a.compressionQuality,format:a.format,interpolation:a.interpolation});a.mosaicRule&&l.mixin(c,{mosaicRule:a.mosaicRule.toJson()});a.renderingRule&&l.mixin(c,{renderingRule:a.renderingRule.toJson()});e.push(c);this.allLayerslegend&&this.allLayerslegend.push({id:a.id});break;case "esri.layers.WMSLayer":c=l.mixin(c,{url:a.url,title:a.title,type:"wms",version:a.version,transparentBackground:a.imageTransparency,
visibleLayers:a.visibleLayers});e.push(c);this.allLayerslegend&&this.allLayerslegend.push({id:a.id,subLayerIds:a.visibleLayers});break;case "esri.virtualearth.VETiledLayer":d=a.mapStyle;"aerialWithLabels"===d&&(d="Hybrid");c=l.mixin(c,{visibility:a.visible,type:"BingMaps"+d,culture:a.culture,key:a.bingMapsKey});e.push(c);break;case "esri.layers.OpenStreetMapLayer":c=l.mixin(c,{type:"OpenStreetMap",url:a.tileServers[0]});e.push(c);break;case "esri.layers.WMTSLayer":c=l.mixin(c,{url:a.url,type:"wmts",
layer:a._identifier,style:a._style,format:a.format,tileMatrixSet:a._tileMatrixSetId});e.push(c);break;case "esri.layers.MapImageLayer":d=a.getImages();p.forEach(d,function(b,d){b.href&&(c={id:a.id+"_image"+d,type:"image",title:a.id,minScale:a.minScale||0,maxScale:a.maxScale||0,opacity:a.opacity*b.opacity,extent:b.extent.toJson()},"data:image/png;base64,"===b.href.substr(0,22)?c.imageData=b.href.substr(22):c.url=b.href,e.push(c))});break;case "esri.layers.WebTiledLayer":d=a.url.replace(/\$\{/g,"{");
c=l.mixin(c,{type:"WebTiledLayer",urlTemplate:d,credits:a.copyright});a.subDomains&&0<a.subDomains.length&&(c.subDomains=a.subDomains);e.push(c);break;default:if(a.getTileUrl||a.getImageUrl)c=l.mixin(c,{url:a.url}),e.push(c)}for(f=0;f<b.graphicsLayerIds.length;f++)if(a=b.getLayer(b.graphicsLayerIds[f]),a.loaded&&a.visible&&-1===p.indexOf(m,a.id))switch(d=a.declaredClass,d){case "esri.layers.FeatureLayer":case "esri.layers.LabelLayer":case "esri.layers.CSVLayer":case "esri.layers.StreamLayer":if(a.renderer&&
"esri.renderer.HeatmapRenderer"===a.renderer.declaredClass)continue;g=null;a.url&&a.renderer&&("esri.renderer.ScaleDependentRenderer"===a.renderer.declaredClass?"scale"===a.renderer.rangeType?g=a.renderer.getRendererInfoByScale(b.getScale())&&a.renderer.getRendererInfoByScale(b.getScale()).renderer:"zoom"===a.renderer.rangeType&&(g=a.renderer.getRendererInfoByZoom(b.getZoom())&&a.renderer.getRendererInfoByZoom(b.getZoom()).renderer):g=a.renderer);if(g&&("esri.renderer.SimpleRenderer"===g.declaredClass||
"esri.renderer.TemporalRenderer"===g.declaredClass||l.isString(g.attributeField)&&a._getField(g.attributeField,!0))&&!g.hasVisualVariables()&&"esri.renderer.DotDensityRenderer"!==g.declaredClass&&"esri.layers.CSVLayer"!==a.declaredClass&&"esri.layers.StreamLayer"!==a.declaredClass)if(c={id:a.id,title:l.getObject("arcgisProps.title",!1,a)||a.id,opacity:a.opacity,minScale:a.minScale||0,maxScale:a.maxScale||0,layerDefinition:{drawingInfo:{renderer:g.toJson()}}},c=l.mixin(c,this._getUrlAndToken(a)),"esri.renderer.TemporalRenderer"===
g.declaredClass&&(d=c.layerDefinition.drawingInfo,d.latestObservationRenderer=d.renderer.latestObservationRenderer,d.trackLinesRenderer=d.renderer.trackRenderer,d.observationAger=d.renderer.observationAger,d.renderer=d.renderer.observationRenderer,a._trackIdField&&(c.layerDefinition.timeInfo={trackIdField:a._trackIdField})),this._convertSvgRenderer(c.layerDefinition.drawingInfo.renderer),1>a.opacity||"esri.renderer.TemporalRenderer"===g.declaredClass||this._updateLayerOpacity(c))if(a._params.source&&
(g=a._params.source.toJson(),l.mixin(c.layerDefinition,{source:g})),a.getDefinitionExpression()&&l.mixin(c.layerDefinition,{definitionExpression:a.getDefinitionExpression()}),2!==a.mode)0<a.getSelectedFeatures().length&&(g=p.map(a.getSelectedFeatures(),function(b){return b.attributes[a.objectIdField]}),0<g.length&&a.getSelectionSymbol()&&l.mixin(c,{selectionObjectIds:g,selectionSymbol:a.getSelectionSymbol().toJson()}));else{g=p.map(a.getSelectedFeatures(),function(b){return b.attributes[a.objectIdField]});
if(0===g.length||!a._params.drawMode)break;l.mixin(c.layerDefinition,{objectIds:g});g=null;a.getSelectionSymbol()&&(g=new F(a.getSelectionSymbol()));l.mixin(c.layerDefinition.drawingInfo,{renderer:g&&g.toJson()})}else c=this._createFeatureCollection(a);else c=g&&(g.hasVisualVariables()||"esri.renderer.DotDensityRenderer"===g.declaredClass)?this._createFeatureCollection(a,b,g):this._createFeatureCollection(a);e.push(c);this.allLayerslegend&&this.allLayerslegend.push({id:a.id});break;case "esri.layers.GraphicsLayer":c=
this._createFeatureCollection(a),e.push(c),this.allLayerslegend&&this.allLayerslegend.push({id:a.id})}b.graphics&&0<b.graphics.graphics.length&&(c=this._createFeatureCollection(b.graphics),e.push(c));b._labels&&(c=this._createFeatureCollection(b._labels),e.push(c));return e},_getUrlAndToken:function(b){return{token:b._getToken(),url:b._url?b._url.path:null}},_updateLayerOpacity:function(b){var f=this._colorEvaluator(b),f=p.filter(f,function(a){return l.isArray(a)&&4===a.length}),a=!0;if(f.length){var d=
f[0][3],c;for(c=1;c<f.length;c++)if(d!==f[c][3]){a=!1;break}if(a){b.opacity=d/255;for(c=0;c<f.length;c++)f[c][3]=255}}return a},_applyVisualVariables:function(b,f){var a=f.renderer,d=f.graphic,c=f.symbol,l=f.mapResolution,e=c.type;if(!("textsymbol"===e||"shieldlabelsymbol"===e)){var g=a.getVisualVariablesForType("sizeInfo"),h=a.getVisualVariablesForType("colorInfo"),k=a.getVisualVariablesForType("opacityInfo"),g=g&&g[0],h=h&&h[0],k=k&&k[0];g&&(c=a.getSize(d,{sizeInfo:g,shape:"simplemarkersymbol"===
e?c.style:null,resolution:l}),null!=c&&("simplemarkersymbol"===e?b.size=s.px2pt(c):"picturemarkersymbol"===e?(b.width=s.px2pt(c),b.height=s.px2pt(c)):"simplelinesymbol"===e?b.width=s.px2pt(c):b.outline&&(b.outline.width=s.px2pt(c))));if(h&&(c=a.getColor(d,{colorInfo:h}))&&("simplemarkersymbol"===e||"simplelinesymbol"===e||"simplefillsymbol"===e))b.color=C.toJsonColor(c);k&&(a=a.getOpacity(d,{opacityInfo:k}),null!=a&&b.color&&(b.color[3]=Math.round(255*a)))}}});v("extend-esri")&&l.setObject("tasks.PrintTask",
t,A);return t});