const LOC = [
	{url:'dev.tving.com',				title:'DEV',		color:'green'},
	{url:'userdev.tving.com',			title:'DEV',		color:'green'},

	{url:'qa.tving.com',				title:'QA',			color:'purple'},
	{url:'qacloud-reboot.tving.com',	title:'QA(CLOUD)',	color:'purple'},
	{url:'userqa.tving.com',			title:'QA',			color:'purple'},

	{url:'qc.tving.com',				title:'QC',			color:'red'},
	{url:'qccloud.tving.com',			title:'QC(AWS)',	color:'red'},
	{url:'sus-qc.tving.com',			title:'QC(SUS)',	color:'red'},
	{url:'userqc.tving.com',			title:'QC',			color:'red'}
];

const findAndIndex = (...key) => {
	for(let i = 0; i < key.length; i++ ) {
		const k = key[i];
		if(!!$(k).length) return [$(k), i];
	}
	return [null, -1];
};

$('#top-gnb').ready(()=>{
	_.each(_.filter(LOC, v=>v.url === location.hostname), v=>{
		const [$target, index] = findAndIndex(	'body #__next header aside',
												'body #__next header header',
												'body #__next header',
												'body header');
		let label = `<div class="warnning" style="margin-right:0;padding:5pt;text-align:center;">${v.title}</div>`;
		console.log($target, index);

		$target[(index)?'append':'after'](label);


		// console.log(target, index);
		// console.log($target, $target.length);
		// if($target.length) {
		// 	console.log(10);
		// 	$target.after(label);
		// }else {
		// 	console.log(20);
		// 	$target = $('body #__next header');
		// 	if(!$target.length) {
		// 		console.log(30);
		// 		$target = $('body header');
		// 		// label = `<span class="warnning" style="float:righ;margin-top:50pt;padding:5pt;">${v.title}</span>`;
		// 	}
		// 	$target.append(label);
		// }

		if($('header > aside').length) {
			$('.warnning').css('margin-left', '20pt');
		}else {
			$('.warnning').css('margin-left', 'auto');
		}
		$('.warnning').css('background-color', v.color);

		const targetUrl = [ `https://www.tving.com`, `https://tving.com`];
		$(document).on('mouseover', 'a', function() {
			const $this = $(this);
			const href = $this.attr('href');
			if(!href) return
			for(const u of targetUrl) {
				if(href.startsWith(u)) {
					$this.attr('href', href.replace(u, ''));
					return;
				}
			}
			// console.log($(this).attr('href'));
		});

		// if($('div.player-wrap').length) {
		// 	$('header').css('z-index', 300);
		// 	$('header > a').css('visibility', 'hidden');
		// 	$('header > aside').css('visibility', 'hidden');
		// 	$('header > div.warnning').css('z-index', 300);
		// }
	});
});

// if(location.href.startsWith("https://confluence.tving.com")) {
// 	var target = $("#wysiwygTextarea_ifr").get(0);

// 	var observer = new MutationObserver(function(mutations) {
// 		if (mutations.length) {
// 			alert(mutations[0].attributeName + " changed")
// 			target.innerHTML = target.style.fontSize;
// 			// disconnect `observer`
// 			this.disconnect()
// 		}
// 	});

// 	// configuration of the observer:
// 	var config = {
// 		attributes: true
// 	};

// 	// pass in the target node, as well as the observer options
// 	observer.observe(target, config);

// 	alert('load:' + $('#wysiwygTextarea_ifr').attr('title'));
// 	// var pushState = history.pushState;
//     // var replaceState = history.replaceState;

//     // history.pushState = function() {
//     //     pushState.apply(history, arguments);
//     //     window.dispatchEvent(new Event('pushstate'));
//     //     window.dispatchEvent(new Event('locationchange'));
//     // };

//     // history.replaceState = function() {
//     //     replaceState.apply(history, arguments);
//     //     window.dispatchEvent(new Event('replacestate'));
//     //     window.dispatchEvent(new Event('locationchange'));
//     // };

//     // window.addEventListener('popstate', function() {
//     //     window.dispatchEvent(new Event('locationchange'))
//     // });

// 	// window.addEventListener('locationchange', function(){
// 	// 	console.log(location.href);
// 	// 	if(location.href.startsWith('https://confluence.tving.com/pages/resumedraft.action')) {
// 			$('#wysiwygTextarea_ifr').attr('title', '');
// 	// 	}
// 	// })
// }