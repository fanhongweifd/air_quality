// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.13/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/metadata/types/inspire/srv/templates/ServiceResourceKeywords.html":'\x3cdiv data-dojo-attach-point\x3d"containerNode"\x3e\r\n\r\n\t\x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Tabs"\x3e\r\n\t\t  \r\n\t\t\x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/inspire/srv/ServiceCategoryKeywords"\r\n\t\t\tdata-dojo-props\x3d"label:\'${i18nInspire.keywordSections.serviceCategory}\'"\x3e\x3c/div\x3e\r\n\t\t\t\r\n\t\t\x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/inspire/gmd/identification/GemetConceptKeywords"\r\n\t\t\tdata-dojo-props\x3d"label:\'${i18nInspire.keywordSections.gemetConcept}\'"\x3e\x3c/div\x3e\r\n\t\t\t\r\n\t\t\x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/inspire/gmd/identification/OtherKeywords"\r\n\t\t\tdata-dojo-props\x3d"label:\'${i18nInspire.keywordSections.otherKeywords}\'"\x3e\x3c/div\x3e\r\n\t\t  \t\t\t\t\t\t\t\t\r\n\t\x3c/div\x3e\r\n\t\r\n\x3c/div\x3e'}});
define("esri/dijit/metadata/types/inspire/srv/ServiceResourceKeywords","dojo/_base/declare dojo/_base/lang dojo/has ../../../base/Descriptor ../../../form/Tabs ../gmd/identification/GemetConceptKeywords ../gmd/identification/OtherKeywords ./ServiceCategoryKeywords dojo/text!./templates/ServiceResourceKeywords.html ../../../../../kernel".split(" "),function(a,b,c,d,g,h,k,l,e,f){a=a(d,{templateString:e});c("extend-esri")&&b.setObject("dijit.metadata.types.inspire.srv.ServiceResourceKeywords",a,f);return a});