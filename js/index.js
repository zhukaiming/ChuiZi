
handleCarousel();
handleCart();
handleNav();
handleSearch();
handleFlash();
function handleCarousel(){
	new Carousel({
			id:'carousel',
			aImg:[
			'images/carousel2.jpg',
			'images/carousel1.jpg'],
			width:1220,
			height:450,
			playDuration:3000
		});
}
function handleCart(){
	var oCart = document.querySelector('.cart');
	var oCartContent = document.querySelector('.cart-content');
	var oCartImg = document.querySelector('.cart-content img');
	var oEmpSpan = document.querySelector('.cart-content .emp-cart');
	oCart.onmouseenter = function(){
		// oCart.style.background = 'red';
		oCartContent.style.border = '1px solid #ccc';
		animation(oCartContent,{height:300},false,function(){
			oCartImg.style.display = 'block';
			oEmpSpan.style.display = 'block';
		})
	}
	oCart.onmouseleave = function(){
		// oCart.style.background = 'red';
		oCartContent.style.border = '';
		oCartImg.style.display = 'none';
		oEmpSpan.style.display = 'none';
		animation(oCartContent,{height:0});
	}	
}

function handleNav(){
	var aNavA = document.querySelectorAll('.header .header-nav a');
	var oNavContent = document.querySelector('.header .nav-content');
	var oNavUl = oNavContent.getElementsByTagName('ul')[0];
	var timer = null;
	// console.log(aNavA)
	for(var i = 0;i<aNavA.length-3;i++){
		aNavA[i].index = i;
		aNavA[i].onmouseenter = function(){
			clearTimeout(timer);
			oNavUl.innerHTML = '';
			oNavContent.style.borderTop = '1px solid #ccc';
			animation(oNavContent,{height:230});
			loadData(this.index)//
		}
		aNavA[i].onmouseleave = function(){
			timer = setTimeout(function(){
				oNavContent.style.borderTop = 'none';
				oNavUl.innerHTML = '';
				animation(oNavContent,{height:0});
			},500)
		}
		oNavContent.onmouseenter = function(){
			clearTimeout(timer);
		}
		oNavContent.onmouseleave = function(){
			oNavContent.style.borderTop = '';
			animation(oNavContent,{height:0});
		}
	}
	function loadData(index){
		oNavUl.innerHTML = '';
		var aDatas = aNavItems[index];//获取数据
		if(!aDatas){
			return;
		}
		for(var i = 0;i<aNavA.length;i++){
			var oLi = document.createElement('li');
			var oDiv = document.createElement('div');
			oDiv.className = 'img-box';
			var oImg = document.createElement('img');
			oImg.src = aDatas[i].img;
			var oP1 = document.createElement('p');
			oP1.innerHTML = aDatas[i].name;
			oP1.className = 'product-name';
			var oP2 = document.createElement('p');
			oP2.innerHTML = aDatas[i].price+"元起";
			oP2.className = 'product-price';
			oDiv.appendChild(oImg);
			oLi.appendChild(oDiv);
			oLi.appendChild(oP1);
			oLi.appendChild(oP2);
			oNavUl.appendChild(oLi);
		}
	}
}

function handleSearch(){
	//.header .search .list
	var aList = document.querySelector('.header .search .list');

	var oInput = document.querySelector('.header .search .inputer input');
	var aSearchA = document.querySelector('.header .search .inputer a');
	oInput.onfocus = function(){
		aList.style.display = 'block';
		aSearchA.style.display = 'none';//placeholder
		oInput.placeholder = '请输入搜索的商品';
	}
	oInput.onblur = function(){
		aList.style.display = '';
		aSearchA.style.display = 'block';//placeholder
		oInput.placeholder = '';
	}
}

function handleFlash(){
	var aSpan = document.querySelectorAll('.hot .flash .flash-more span');
	var oUl = document.querySelector('.hot .flash .flash-list ul');

	aSpan[1].onclick = function(){
		animation(oUl,{marginLeft:-1220});
		this.className = '';
		aSpan[0].className = 'active';
	}
	aSpan[0].onclick = function(){
		animation(oUl,{marginLeft:0});
		this.className = '';
		aSpan[1].className = 'active';

	}
}