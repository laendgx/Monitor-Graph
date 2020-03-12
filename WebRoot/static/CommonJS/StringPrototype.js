/**
* É¾³ý×óÓÒÁ½¶ËµÄ¿Õ¸ñ
*/
String.prototype.trim=function()
{
     return this.replace(/(^\s*)|(\s*$)/g, "");
}
/**
* É¾³ý×ó±ßµÄ¿Õ¸ñ
*/
String.prototype.ltrim=function()
{
     return this.replace(/(^\s*)/g,"");
}
/**
* É¾³ýÓÒ±ßµÄ¿Õ¸ñ
*/
String.prototype.rtrim=function()
{
     return this.replace(/(\s*$)/g,"");
}
