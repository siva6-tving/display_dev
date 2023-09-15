const LOC = [
	{url:'dev.tving.com',				title:'DEV',		color:'green'},
	{url:'userdev.tving.com',			title:'DEV',		color:'green'},

	{url:'qa.tving.com',				title:'QA',			color:'purple'},
	{url:'qacloud-reboot.tving.com',	title:'QA(CLOUD)',	color:'purple'},
	{url:'userqa.tving.com',			title:'QA',			color:'purple'},

	{url:'qc.tving.com',				title:'QC',			color:'red'},
	{url:'qccloud.tving.com',			title:'QC(AWS)',	color:'red'},
	{url:'userqc.tving.com',			title:'QC',			color:'red'}
];

$('#top-gnb').ready(()=>{
	_.each(_.filter(LOC, v=>v.url === location.hostname), v=>{
		let $target = $('body #__next header');
		let label = `<div class="warnning" style="margin-right:0;padding:5pt;text-align:center;">${v.title}</div>`;

		if(!$target.length) {
			$target = $('body header');
			// label = `<span class="warnning" style="float:righ;margin-top:50pt;padding:5pt;">${v.title}</span>`;
		}

		$target.append(label);

		if($('header > aside').length) {
			$('.warnning').css('margin-left', '20pt');
		}else {
			$('.warnning').css('margin-left', 'auto');
		}
		$('.warnning').css('background-color', v.color);

		// if($('div.player-wrap').length) {
		// 	$('header').css('z-index', 300);
		// 	$('header > a').css('visibility', 'hidden');
		// 	$('header > aside').css('visibility', 'hidden');
		// 	$('header > div.warnning').css('z-index', 300);
		// }
	});
});