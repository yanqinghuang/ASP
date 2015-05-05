/* function SwitchResultList(IsShow)
{
	var ResultList =  document.getElementById("ResultList")
	if(IsShow==true)
	{
		ResultList.style.display = "";
	}
	else
	{
		ResultList.style.display = "none";
	}
} */

$(document).ready(function(){
	if($("#ResultModule").length!=0)
	{
		$("#ResultList").show();
		$("#anchors").show();
	}
});