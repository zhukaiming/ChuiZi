		function animation(obj,opation,isLinear,fnEnd){/*函数作为参数*/
				clearInterval(obj.timer);
				var iSpeed = 0;
				obj.timer = setInterval(function(){
					var isStopAll = true;/**/
					for(attr in opation){
					var curr = parseFloat(getComputedStyle(obj,false)[attr]);
					var isStop = false;/*判断结束时的状态*/
					if(attr == 'opacity'){
						curr = Math.round(curr*100);/*四舍五入*/
					}
					if(isLinear){/*如果是匀速动画*/
						if(curr>opation[attr]){/*比较当前值和目标值大小*/
							iSpeed = -60;
						}else{
							iSpeed = 60;
						}
						if(Math.abs(opation[attr] - curr) <= Math.abs(iSpeed)){
							isStop = true;
						}else{
							isStopAll = false;/**/
						}
					}else{/*如果是减速动画*/
						iSpeed = (opation[attr] - curr)/3;
						iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) :Math.floor(iSpeed);/*向上向下取整*/
						if(!iSpeed){/**/
							isStop = true;
						}else{
							isStopAll = false;
						}
					}			
					//iSpeed = Math.ceil(iSpeed);
					
					if(isStop){/*iTarget == curr,当目标值等于当前值，*/
						//if(attr == 'opacity')
							
							if(isLinear){
								if(attr == 'opacity'){/*处理透明度*/
								obj.style[attr] = opation[attr]/100;
							}else{
								obj.style[attr] = opation[attr] +'px';/*有px的*/
								}
							}
					}else{
						if(attr == 'opacity'){
							obj.style[attr] = (curr + iSpeed)/100;
						}else{
							obj.style[attr] = curr + iSpeed + 'px';
						}
						//console.log(curr);
					}
					}/*for(in)*/
					if(isStopAll){/*当所需要变化的属性同时达到目标值时，isStopAll为true,清除定时器，*/
						clearInterval(obj.timer);
						if(fnEnd){/**/
							fnEnd()/*调用*/
						}
					}
				},40)
			
		}

	function Carousel(option){
		this.oBox = document.getElementById(option.id);
		this.oImgUl = null;
		this.aImg = option.aImg;
		this.width = option.width;
		this.height = option.height;
		this.leftbtn = null;
		this.rightbtn = null;
		this.bottombtn = null;
		this.now = 0;
		this.playDuration = option.playDuration;
		this.init();
		//绑定事件
		this.bindEvent();
		if(this.playDuration){
			this.autoPlay();
		}
	}
	Carousel.prototype.init = function(){
		this.oBox.style.width = this.width + "px";
		this.oBox.style.height = this.height + "px";
		this.oBox.style.position = "relative";
		this.oImgUl = document.createElement("ul");



		for(var i = 0;i<this.aImg.length;i++){
		 var oLi = document.createElement('li');
		 var oImg = document.createElement('img');
		 oLi.style.position = "absolute";
		 oLi.style.top = 0;
		 oLi.style.left = 0;
		 oLi.style.opacity = 0.5;
		 oLi.style.zIndex = 0;
		 if(i == 0){
		 	oLi.style.opacity = 1;
		 	oLi.style.zIndex = 50;
		 }else{
		 	oLi.style.opacity = 0.5;
		 	oLi.style.zIndex = 0;
		 }
		 oImg.style.width = this.width + "px";
		 oImg.style.height = this.height + "px";
		 oImg.src = this.aImg[i];
		 oLi.appendChild(oImg);
		 this.oImgUl.appendChild(oLi);
		}
		 //按钮
		this.leftbtn = document.createElement('span')
		this.rightbtn = document.createElement('span')
		//添加按钮到oBox

		this.leftbtn.className = 'left';
		this.rightbtn.className = 'right';
		this.leftbtn.style.zIndex = 999;
		this.rightbtn.style.zIndex = 999;
		this.leftbtn.innerHTML = '&lt'
		this.rightbtn.innerHTML = '&gt'
		//添加底部按钮
		this.bottombtn = document.createElement('ul');
		this.bottombtn.className = 'bottom';
		this.bottombtn.style.zIndex = 100;
		for(var i = 0;i<this.aImg.length;i++){
			var oLi = document.createElement('li');
			this.bottombtn.appendChild(oLi);
			if(i == 0){
				oLi.className = 'active';
			}
		}
		//把ul添加到oBox中
		this.bottombtn.style.marginLeft = - this.bottombtn.offsetWidth*0.5 + 'px';//让底部按钮水平居中
		this.oBox.appendChild(this.bottombtn);
		this.oBox.appendChild(this.leftbtn);
		this.oBox.appendChild(this.rightbtn);
		this.oBox.appendChild(this.oImgUl);
	}
	//console.log(Carousel)
	Carousel.prototype.bindEvent = function(){
		//下一张
		this.rightbtn.onclick = function(){
			/*for(var i = 0;i<this.oImgUl.children.length;i++){
				this.oImgUl.children[i].style.zIndex = 0;
				this.oImgUl.children[i].style.opacity = 0.5;
				this.oImgUl.children[i].className = '';
				
			}*/
			this.tab();
			this.now++;
			if(this.now>=this.oImgUl.children.length){
				this.now = 0;
			}
			/*this.oImgUl.children[this.now].style.zIndex = 50;
			this.oImgUl.children[this.now].style.opacity = 1;
			this.oImgUl.children[this.now].className = 'active';*/
		}.bind(this);
		this.leftbtn.onclick = function(){
			/*for(var i = 0;i<this.oImgUl.children.length;i++){
				this.oImgUl.children[i].style.zIndex = 0;
				this.oImgUl.children[i].style.opacity = 0.5;
				this.oImgUl.children[i].className = '';

			}*/
			this.tab();
			this.now--;
			if(this.now<0){
				this.now = this.oImgUl.children.length - 1;
			}

			/*this.oImgUl.children[this.now].style.zIndex = 50;
			this.oImgUl.children[this.now].style.opacity = 1;
			this.oImgUl.children[this.now].className = 'active';*/
		}.bind(this)
		var _self = this;
		for( var i = 0;i<this.bottombtn.children.length;i++){
			this.bottombtn.children[i].index = i;
			this.bottombtn.children[i].onclick = function(){
				_self.now = this.index;
				_self.tab();
			}
		}
	}
	Carousel.prototype.tab = function(){
			for(var i = 0;i<this.oImgUl.children.length;i++){
				this.oImgUl.children[i].style.zIndex = 0;
				this.oImgUl.children[i].style.opacity = 0.5;
				this.bottombtn.children[i].className = '';

			}
			this.oImgUl.children[this.now].style.zIndex = 50;
			//this.oImgUl.children[this.now].style.opacity = 1;
			this.bottombtn.children[this.now].className = 'active';	
			animation(this.oImgUl.children[this.now],{opacity:100})
	}
	Carousel.prototype.autoPlay = function(){
		var timer = null;
		timer = setInterval(this.rightbtn.onclick,this.playDuration);
		this.oBox.onmouseover = function(){
			clearInterval(timer);
		}
		this.oBox.onmouseout = function(){
			timer = setInterval(this.rightbtn.onclick,this.playDuration);
		}.bind(this);//这里的this
	}