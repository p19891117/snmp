var helloDiv;
function divLoadInit(div) {
	helloDiv = $(div);
	helloDiv.openMask("...正在加载...");
    
}

function closeMask() {
	helloDiv.closeMask("");
	hiddenLoadingDiv();
}

var docEle = function() {  
    return document.getElementById(arguments[0]) || false;  
} 

function showLoadingDiv(){
     var m = "mask";  
     var _id ="newDiv";
     if (docEle(_id)) document.body.removeChild(docEle(_id));  
     if (docEle(m)) document.body.removeChild(docEle(m));  

     //mask遮罩层  

     var newMask = document.createElement("div");  
     newMask.id = m;  
     newMask.style.position = "absolute";  
     newMask.style.zIndex = "1";  
     _scrollWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);  
     _scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);  
     newMask.style.width = _scrollWidth + "px";  
     newMask.style.height = _scrollHeight + "px";  
     newMask.style.top = "0px";  
     newMask.style.left = "0px";  
     newMask.style.background = "#ffffff";  
     newMask.style.filter = "alpha(opacity=40)";  
     newMask.style.opacity = "0.50";  
     document.body.appendChild(newMask);  

     //新弹出层  

     var newDiv = document.createElement("div");  
     newDiv.id = _id;  
     newDiv.style.position = "absolute";  
     newDiv.style.zIndex = "9999";  
     newDivWidth = 30;  
     newDivHeight = 30;  
     newDiv.style.width = newDivWidth + "px";  
     newDiv.style.height = newDivHeight + "px";  
     newDiv.style.top = (document.body.scrollTop + document.body.clientHeight / 2 - newDivHeight / 2) + "px";  
     newDiv.style.left = (document.body.scrollLeft + document.body.clientWidth / 2 - newDivWidth / 2) + "px";  
     newDiv.style.background = "#ffffff";  
     newDiv.style.border = "0px solid #860001";  
     newDiv.style.padding = "5px";  
     document.body.appendChild(newDiv);  

     //弹出层滚动居中  

     function newDivCenter() {  
         newDiv.style.top = (document.body.scrollTop + document.body.clientHeight / 2 - newDivHeight / 2) + "px";  
         newDiv.style.left = (document.body.scrollLeft + document.body.clientWidth / 2 - newDivWidth / 2) + "px";  
     }  
     if (document.all) {  
         window.attachEvent("onscroll", newDivCenter);  
     }  
     else {  
         window.addEventListener('scroll', newDivCenter, false);  
     }  
}
//关闭新图层和mask遮罩层  
function hiddenLoadingDiv(){
	document.getElementById("newDiv").style.display="none";
	document.getElementById("mask").style.display="none";
}



(function($){
	$.fn.extend({
		/**
		 * 打开遮罩，并显示一段文字。
		 * @param  {String} msg    [显示的文字]
		 * @param  {String} imgsrc [图片的位置]
		 * @return {void}       
		 */
		openMask:function(msg, imgsrc){
//			var loadDiv=$("body").find("._mask_loadDiv");
			showLoadingDiv();
			var loadDiv=this.find("._mask_loadDiv");
			if(!loadDiv || !loadDiv[0]){	// add Mask 
				var loadDiv=$("<div class='_mask_loadDiv' style='position:absolute; z-index:99999; height:30px; background:#FFF; border:1px solid #ACE'></div>");
				
				if(!imgsrc){	// 指定默认的图片
					var scripts=document.getElementsByTagName("script");
					for(var i=0; i<scripts.length; i++){ 
							var scriptSrc=scripts[i].src;
							var uri=scriptSrc.substring(0,scriptSrc.lastIndexOf("/"));
							//imgsrc="../images/loading.gif"; 
							imgsrc=".";
					}
				}

				var contentDiv=$("<div class='_mask_content' style='position:relative;text-align:center;' >");
				var fontsize=14;
				//loadDiv的宽度= msg的宽度+img的宽度
				var loadDiv_width=msg.length*fontsize+16+3;
				contentDiv.css("width",loadDiv_width);
				loadDiv.css("width",loadDiv_width);
				if(imgsrc){
					contentDiv.append("<span style='font-size:"+fontsize+"px; margin-left:2px; vertical-align:text-top'>"+msg+"</span>");
				}
				this.append(loadDiv.append(contentDiv));
			//	$("body").append(loadDiv.append(contentDiv));
				/*
				loadDiv[0].style.top=this[0].offsetTop+(this[0].offsetHeight-loadDiv[0].offsetHeight)/2;
				loadDiv[0].style.left=this[0].offsetLeft+(this[0].offsetWidth-loadDiv[0].offsetWidth)/2;
				loadDiv[0].style.paddingTop=(loadDiv[0].offsetHeight-contentDiv[0].offsetHeight)/2;
				*/
				loadDiv.css("top",this[0].offsetTop+(this[0].offsetHeight-loadDiv[0].offsetHeight)/2);
				loadDiv.css("left",this[0].offsetLeft+(this[0].offsetWidth-loadDiv[0].offsetWidth)/2);
				loadDiv.css("padding-top",(loadDiv[0].offsetHeight-contentDiv[0].offsetHeight)/2);
			}
			loadDiv.css("z-index",99999).css("display","block");
			return this;
		},
		closeMask:function(){
	//		var loadDiv=$("body").find("._mask_loadDiv");
			var loadDiv=this.find("._mask_loadDiv");
			if(loadDiv)
				loadDiv.css("display","none").css("z-index",-99999);
			return this;
		}
	});
})(jQuery);


/*



// 这个是遮罩层里信息展示框,这个会添加到 <body> 或者 target 元素中
<div class="_mask_loadDiv">
	<div class="_mask_content">
		<img src='imgsrc' alt='msg' >
		<span>msg</span>
	</div>
</div>


//这个是目标，要在它上显示遮罩层
<div id="target">

</div>

// 只需要下面的代码：
$("#target").openMask("数据加载中。。。");
// 隐藏对话框，只需要：
$("#target").closeMask();



*/

