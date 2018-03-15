// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.13/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/editor/PrimaryToolbarMixin","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/dom-class dojo/dom-style dojo/has dojo/i18n!../nls/i18nBase ../base/ValidationTracker ../base/xml/XmlInterrogator ../base/xml/xmlUtil ./util/DownloadXmlDialog ./util/LoadDocumentDialog ./util/MessageDialog ./util/SaveDocumentDialog ./util/TransformDialog ../base/transform/Iso2IsoTransformer ../../../kernel".split(" "),function(k,c,q,m,r,s,d,n,t,p,u,v,l,w,x,y,z){k=k(null,{constructor:function(a){c.mixin(this,
a)},_confirmAndDelete:function(){if(this.editor.gxeAdaptor.getAllowEditMetadata()&&this.editor.gxeAdaptor.getAllowDeleteMetadata()){var a=this.editor&&this.editor.dialogBroker;(new l({title:d.editor.del.dialogTitle,okLabel:d.editor.del.caption,onOkClick:c.hitch(this,function(){var b=new l({title:d.editor.del.dialogTitle,showOkCancelBar:!1});b.show(d.editor.del.working).then(c.hitch(this,function(){this.editor.gxeAdaptor.deleteMetadata({}).then(c.hitch(this,function(){this.lastSavedXml=null;setTimeout(c.hitch(this,
function(){b.hide();a&&this._close()}),1500)}),c.hitch(this,function(a){b.hide();this._handleError(d.editor.del.errorDeleting,a,!0)}))}))})})).show(d.editor.del.prompt)}},_executeSave:function(a,b,g,e){if(this.editor.gxeAdaptor.getAllowEditMetadata()){var f=new l({title:d.editor.save.dialogTitle,showOkCancelBar:!1});f.show(d.editor.save.working).then(c.hitch(this,function(){this.editor.gxeAdaptor.saveXml(a,b,e).then(c.hitch(this,function(){this.lastSavedXml=b;setTimeout(c.hitch(this,function(){f.hide();
g&&this._close()}),1500)}),c.hitch(this,function(a){f.hide();this._handleError(d.editor.save.errorSaving,a,!0)}))}))}},_download:function(a,b,c){null===b&&(b="metadata");var e;e=b+".xml";window.navigator&&window.navigator.msSaveOrOpenBlob?window.navigator.msSaveOrOpenBlob(new Blob([a],{type:"text/xml"}),e):(e=d.editor.download.dialogTitle,c&&(e=d.editor.saveDraft.dialogTitle),c=new u({dialogTitle:e}),c.show(a,b))},_getTransformationTypes:function(a){var b=[];a=this.editor.getEditDocument();if(!a||
!a.documentType.isIso)return b;q.forEach(this.editor.gxeContext.filterDocumentTypes(),function(c){c.key!==a.documentType.key&&c.isIso&&a.documentType.isIso&&b.push(c)});return b},_handleError:function(a,b,c){b&&console.error(b);c&&(new l({title:d.editor.errorDialog.dialogTitle,showOk:!1,cancelLabel:d.general.close})).show(a,"gxeIconError",b)},_initializeView:function(){var a=c.hitch(this,function(a,b){r.set(this.commonToolset,"display","");b&&this.editor.gxeAdaptor.getAllowEditMetadata()?(this._setMode("edit"),
this._fadeIn(c.hitch(this,function(){this._showLoadDialog(d.editor.load.noMetadata)}))):(this._setMode(a),this._fadeIn())}),b=this.editor.viewDocumentPane,g,e=null,f,h=this._parseXml(this.editor.gxeAdaptor.getOriginalXml());h.documentType?(g=h.documentType,e=h.xmlString,f=h.xmlDocument,this._fadeOut(d.editor.primaryToolbar.initializing,c.hitch(this,function(){this.editor.loadView(g,f,!0).then(c.hitch(this,function(c){b.xmlString=e;this.editor.xmlPane.setXml(e,c.originalTitle);a("view")}),c.hitch(this,
function(b){a("view");this._handleError(d.editor.primaryToolbar.errors.errorGeneratingView,b,!0)}))}))):h.xmlDocument?(b.showMessage(d.editor.xmlViewOnly),a("viewXml")):(b.showMessage(d.editor.noMetadata),a("view",!0))},_loadEditor:function(){if(this.editor.gxeAdaptor.getAllowEditMetadata()){var a,b=this._parseXml(this.editor.gxeAdaptor.getOriginalXml());b.documentType?this._fadeOut(d.editor.primaryToolbar.startingEditor,c.hitch(this,function(){this.editor.loadEditor(b.documentType,b.xmlDocument,
!1,!0).then(c.hitch(this,function(){this._fadeIn()}),c.hitch(this,function(a){this._fadeIn();this._handleError(d.editor.primaryToolbar.errors.errorLoadingDocument,a,!0)}))})):(a=d.editor.load.noMetadata,b.xmlDocument&&(a=d.editor.load.unrecognizedMetadata),this._showLoadDialog(a))}},_loadView:function(){var a=this.editor.getEditDocument();if(a){var b=this.editor.viewDocumentPane,g=new n({ignoreErrors:!0}),e=a.generateXml(g);e&&e===b.xmlString?this._setMode("view"):(m.add(this.viewButton.domNode,"current"),
m.remove(this.viewXmlButton.domNode,"current"),m.remove(this.editButton.domNode,"current"),this._fadeOut(d.editor.primaryToolbar.generatingView,c.hitch(this,function(){this._setMode("view");var f=a.documentType,g=p.parseFromString(e);this.editor.loadView(f,g,!1).then(c.hitch(this,function(a){b.xmlString=e;b.hideMessage();this.editor.xmlPane.setXml(e,a.originalTitle);this._fadeIn()}),c.hitch(this,function(a){b.hideMessage();this._fadeIn();this._handleError(d.editor.primaryToolbar.errors.errorGeneratingView,
a,!0)}))})))}else this._setMode("view")},_parseXml:function(a){var b={documentType:null,xmlString:a,xmlDocument:null};if(!a)return b;var c=null;try{c=p.parseFromString(a)}catch(d){return b}b.xmlDocument=c;a=this.editor.gxeContext.filterDocumentTypes();var f=new t;b.documentType=f.interrogate(c,a);return b},_save:function(a){if(this.editor.gxeAdaptor.getAllowEditMetadata()){var b=this.editor.getEditDocument();if(b){this.editor.validationPane.clearMessages();var d=new n({isSaveAsDraft:a.isSaveAsDraft,
validationPane:this.editor.validationPane}),e=b.generateXml(d),f=d.documentTitle;if(!d.hadValidationErrors&&!(null===f||0===f.length))a.isSaveAsDraft?this._download(e,f,!0):a.showDialog?(a=new w({editor:this.editor,gxeDocument:b,onSave:c.hitch(this,function(a,c,d){a.hide();this._executeSave(b,e,c,d)})}),a.show()):this._executeSave(b,e,a.isSaveAndClose,a.bPushToItem)}}},_showLoadDialog:function(a){(new v({editor:this.editor,prompt:a,onSelect:c.hitch(this,function(a,g,e,f){a.hide();this._fadeOut(d.editor.primaryToolbar.loadingDocument,
c.hitch(this,function(){this.editor.loadEditor(g,e,f,!1).then(c.hitch(this,function(){this._fadeIn()}),c.hitch(this,function(a){this._fadeIn();this._handleError(d.editor.primaryToolbar.errors.errorLoadingDocument,a,!0)}))}))}),onSelectPullItem:c.hitch(this,function(a){a.hide();this.editor.gxeAdaptor.pullItem(this.editor.getEditDocument())})})).show()},_showTransformDialog:function(a,b){(new x({editor:this.editor,documentTypes:b,prompt:null,onSelect:c.hitch(this,function(b,e){b.hide();this._fadeOut(d.editor.transform.working,
c.hitch(this,function(){var b=new y({gxeDocument:a,toDocumentType:e}),h=new n({ignoreErrors:!0}),b=a.generateXml(h,b),h=null;if(b)try{h=p.parseFromString(b)}catch(g){h=null,console.error(g)}this.editor.loadEditor(e,h,!1,!1).then(c.hitch(this,function(b){b.documentType.afterTransform(b,a);this._fadeIn()}),c.hitch(this,function(a){this._fadeIn();this._handleError(d.editor.transform.errorTransforming,a,!0)}))}))})})).show()}});s("extend-esri")&&c.setObject("dijit.metadata.editor.PrimaryToolbarMixin",
k,z);return k});