/**
* ɾ���������˵Ŀո�
*/
String.prototype.trim=function()
{
     return this.replace(/(^\s*)|(\s*$)/g, "");
}
/**
* ɾ����ߵĿո�
*/
String.prototype.ltrim=function()
{
     return this.replace(/(^\s*)/g,"");
}
/**
* ɾ���ұߵĿո�
*/
String.prototype.rtrim=function()
{
     return this.replace(/(\s*$)/g,"");
}
