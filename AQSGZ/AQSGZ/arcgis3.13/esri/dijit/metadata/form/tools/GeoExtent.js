// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.13/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/metadata/form/tools/templates/GeoExtent.html":'\x3cdiv class\x3d"gxeGeoExtent"\x3e\r\n\r\n\t\x3cdiv class\x3d"gxeTop" data-dojo-attach-point\x3d"topNode"\x3e\r\n\t  \x3cdiv class\x3d"gxeLeft gxeFloatLeft"\x3e\r\n\t\t  \x3cdiv class\x3d"gxeTabButton current" \r\n\t\t  \tdata-dojo-attach-point\x3d"drawButton"\r\n\t\t    data-dojo-attach-event\x3d"onclick: _onDrawClick"\r\n\t\t  \t\x3e${i18nBase.geoExtent.draw}\r\n\t\t  \x3c/div\x3e\x3cdiv class\x3d"gxeTabButton" \r\n\t\t  \tdata-dojo-attach-point\x3d"navigateButton"\r\n\t\t    data-dojo-attach-event\x3d"onclick: _onNavigateClick"\r\n\t\t  \t\x3e${i18nBase.geoExtent.navigate}\x3c/div\x3e\r\n\t  \x3c/div\x3e\r\n\t  \x3cdiv class\x3d"gxeRight gxeFloatRight"\x3e\r\n\t  \t\x3cdiv class\x3d"gxeGeocoder" id\x3d"${id}_geocoder"\x3e\x3c/div\x3e\r\n\t  \x3c/div\x3e\r\n\t  \x3cdiv class\x3d"gxeClear"\x3e\x3c/div\x3e\r\n\t\x3c/div\x3e\r\n  \r\n  \x3cdiv class\x3d"gxeMap" id\x3d"${id}_map" data-dojo-attach-point\x3d"mapNode"\x3e\x3c/div\x3e\r\n  \r\n  \x3cdiv class\x3d"gxeDialogActionBar" data-dojo-attach-point\x3d"bottomNode"\x3e\r\n    \x3cdiv class\x3d"gxeLeft gxeFloatLeft"\x3e\r\n      \x3cspan class\x3d"gxeMessage" data-dojo-attach-point\x3d"drawHint"\r\n      \t\x3e${i18nBase.geoExtent.drawHint}\x3c/span\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"gxeRight gxeFloatRight gxeButtons"\x3e\r\n\t    \x3cbutton class\x3d"gxeButton prominent" data-dojo-attach-point\x3d"okButton"\r\n\t      data-dojo-attach-event\x3d"onclick: _onOkClick"\x3e${i18nBase.general.ok}\x3c/button\x3e\r\n\t    \x3cbutton class\x3d"gxeButton" data-dojo-attach-point\x3d"cancelButton"\r\n\t      data-dojo-attach-event\x3d"onclick: _onCancelClick"\x3e${i18nBase.general.cancel}\x3c/button\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"gxeClear"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n   \r\n\x3c/div\x3e'}});
define("esri/dijit/metadata/form/tools/GeoExtent","dojo/_base/declare dojo/_base/lang dojo/_base/fx dojo/dom-class dojo/dom-geometry dojo/dom-style dojo/has dojo/window ./geoExtentUtil ../../base/Templated dojo/text!./templates/GeoExtent.html dojo/i18n!../../nls/i18nBase ../../../../map ../../../../dijit/Geocoder ../../../../toolbars/draw ../../../../geometry/Extent ../../../../geometry/webMercatorUtils ../../../../kernel".split(" "),function(e,f,n,b,g,h,p,q,l,r,s,t,u,v,w,x,m,y){e=e([r],{_drawnExtent:null,
_drawtb:null,_fitExtent:!1,_geocoder:null,_initialExtent:null,_map:null,dialogBroker:null,gxeDocument:null,i18nBase:t,templateString:s,basemap:"streets",wrapAround180:!1,xmin:null,ymin:null,xmax:null,ymax:null,postCreate:function(){this.inherited(arguments);this.okButton.disabled=!0;h.set(this.mapNode,"opacity",0)},destroyRecursive:function(){this._geocoder&&this._geocoder.destroyRecursive(!1);this._map&&this._map.destroy();this.inherited(arguments)},initialize:function(){if(this.gxeDocument&&this.gxeDocument.gxeContext){this._initialExtent=
l.makeGeographicExtent(this.xmin,this.ymin,this.xmax,this.ymax);var a=this.gxeDocument.gxeContext,k=this.id+"_map",c={autoResize:!1,wrapAround180:!1,slider:!0,logo:!0,showAttribution:!0};a.wrapAround180&&(c.wrapAround180=a.wrapAround180);a.showMapLogo||(c.logo=!1);a.showMapAttribution||(c.showAttribution=!1);c.basemap=a.basemap?a.basemap:"streets";var b=this._map=new u(k,c),k=this.id+"_geocoder",d={map:b};a.arcgisGeocoder&&(c.arcgisGeocoder=a.arcgisGeocoder);this._geocoder=new v(d,k);this._geocoder.startup();
this.own(b.on("load",f.hitch(this,function(){var a=null;this._initialExtent?(a=this._asWebMercatorExtent(this._initialExtent,!0),b.setExtent(a,this._fitExtent).then(f.hitch(this,function(){this._addGraphic(this._asWebMercatorExtent(this._initialExtent,!1));this._fadeIn()}))):this._fadeIn();this._drawtb=new w(b,{showTooltips:!1});this._onDrawClick();this.own(this._drawtb.on("draw-end",f.hitch(this,function(a){a.geometry&&(this._drawnExtent=new x(a.geometry.toJson()),this._addGraphic(a.geometry),this.okButton.disabled=
!1)})))})))}},_addGraphic:function(a){this._map&&a&&l.addGraphic(this._map,a,!0)},_asGeographicExtent:function(a){return m.webMercatorToGeographic(a)},_asWebMercatorExtent:function(a,b){var c=a;b&&(-170<=c.xmin&&170>=c.xmax&&-80<=c.ymin&&80>=c.ymax)&&(c=c.expand(1.05),this._fitExtent=!0);return m.geographicToWebMercator(c)},_fadeIn:function(){n.fadeIn({node:this.mapNode,onEnd:function(){}}).play()},_onCancelClick:function(a){this.onCancelClick(a)},onCancelClick:function(a){},_onDrawClick:function(a){this._map&&
this._drawtb&&(b.remove(this.navigateButton,"current"),b.add(this.drawButton,"current"),b.remove(this.drawHint,"gxeDisplayNone"),this._drawtb.deactivate(),this._drawtb.activate("extent"),this._map.disableMapNavigation(),this._map.hideZoomSlider())},_onNavigateClick:function(a){this._map&&this._drawtb&&(b.remove(this.drawButton,"current"),b.add(this.navigateButton,"current"),b.add(this.drawHint,"gxeDisplayNone"),this._drawtb.deactivate(),this._map.enableMapNavigation(),this._map.showZoomSlider())},
_onOkClick:function(a){a=null;this._drawnExtent&&(a=this._asGeographicExtent(this._drawnExtent));this.onOkClick(a)},onOkClick:function(a){},resize:function(){if(this.dialogBroker){var a=q.getBox(this.ownerDocument),b=g.getMarginBox(this.domNode),c=g.getMarginBox(this.topNode),e=g.getMarginBox(this.bottomNode),d=b.l,f=a.w-100,a=a.h-b.t-d-50-80-(c.h+e.h);50>a&&(a=50);d=f-2*d;450>d&&(d=450);1E3<d&&(d=1E3);h.set(this.mapNode,"width",d+"px");h.set(this.mapNode,"height",a+"px");this._map&&(this._map.resize(),
this._map.reposition())}}});p("extend-esri")&&f.setObject("dijit.metadata.form.tools.GeoExtent",e,y);return e});