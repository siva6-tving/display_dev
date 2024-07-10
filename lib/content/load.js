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

const targetPosition = [
	['body #__next header aside', 	'after'],
	['body #__next header header', 	'append'],
	['body #__next header', 		'append'],
	['body header', 				'append']
];

const kboTeams = {
	"HH": ["#FF6600", "https://image.tving.com/ntgs/sports/kbo/team/20240304/HH.svg", "https://image.tving.com/ntgs/operation/banner/2024/05/22/1716358590_1.jpg"],
	"HT": ["#EA0029", "https://image.tving.com/ntgs/sports/kbo/team/20240304/HT.svg", "https://image.tving.com/ntgs/operation/banner/2024/05/22/1716358209_1.jpg"],
	"KT": ["#2C2A29", "https://image.tving.com/ntgs/sports/kbo/team/20240304/KT.svg", "https://image.tving.com/ntgs/operation/banner/2024/05/22/1716358864_1.jpg"],
	"LG": ["#C30037", "https://image.tving.com/ntgs/sports/kbo/team/20240304/LG.svg", "https://image.tving.com/ntgs/operation/banner/2024/05/22/1716358414_1.jpg"],
	"LT": ["#041E42", "https://image.tving.com/ntgs/sports/kbo/team/20240304/LT.svg", "https://image.tving.com/ntgs/operation/banner/2024/05/22/1716358731_1.jpg"],
	"NC": ["#071D3D", "https://image.tving.com/ntgs/sports/kbo/team/20240304/NC.svg", "https://image.tving.com/ntgs/operation/banner/2024/05/22/1716358993_1.jpg"],
	"OB": ["#131230", "https://image.tving.com/ntgs/sports/kbo/team/20240304/OB.svg", "https://image.tving.com/ntgs/operation/banner/2024/05/22/1716358503_1.jpg"],
	"SK": ["#CF0022", "https://image.tving.com/ntgs/sports/kbo/team/20240304/SK.svg", "https://image.tving.com/ntgs/operation/banner/2024/05/22/1716359047_1.jpg"],
	"SS": ["#005BAC", "https://image.tving.com/ntgs/sports/kbo/team/20240304/SS.svg", "https://image.tving.com/ntgs/operation/banner/2024/05/22/1716358928_1.jpg"],
	"WO": ["#820024", "https://image.tving.com/ntgs/sports/kbo/team/20240304/WO.svg", "https://image.tving.com/ntgs/operation/banner/2024/05/31/1717140020_1.jpg"]
};

const label = title => `<div class="warnning" style="margin-right:0;padding:5pt;text-align:center;">${title}</div>`;

const findAndIndex = key => {
	for(let i = 0; i < key.length; i++ ) {
		const k = key[i][0];
		const $obj = $(k).first();
		if(!!$obj.length) return [$obj, key[i][1]];
	}
	return [null, -1];
};

const getKboCoverImg = (kboTeams, src) => {
	if(!src) return;

	const fileName = src.split('/').pop();
	if(!fileName) return;

	return kboTeams[fileName.substring(0,2)][2];
};

const findLocationInfo = (LOC, {hostname}) =>  _.filter(LOC, v=>v.url === hostname);

$('#top-gnb').ready(()=>{
	_.each(findLocationInfo(LOC, location), v=>{
		const [$target, method] = findAndIndex(targetPosition);
		if(!!$target?.length) $target[method](label(v.title));

		$('.warnning').css('margin-left', $('header > aside').length?'20pt':'auto').css('background-color', v.color).on('click', () => {
			const changeKboImage = (coverDiv, count=0) => {
				const $cover = $('img.atom-poster-img.object-cover');
				if($cover.length === 0) {
					if(count < 2) {
						setTimeout(()=> changeKboImage(coverDiv, count+1), 100);
					}
					return;
				}
				const imgSrc = getKboCoverImg(kboTeams, $('img[alt^="my-team-emblem"]').attr('src'));
				if($cover.attr('src') === imgSrc) return;

				$cover.attr('src', imgSrc).attr('datasrc', imgSrc);//.removeClass('h-full');
				return $cover.parent().parent().parent();
			};
			const coverDiv = changeKboImage();

			$('#__tving_kbo_gnb__').on('click', () => setTimeout(changeKboImage(coverDiv), 100));
		});

		const targetUrl = [ `https://www.tving.com`, `https://tving.com`];
		$(document).on('mouseover', 'a', function() {
			const $this = $(this);
			const href = $this.attr('href');
			if(!href) return;
			for(const u of targetUrl) {
				if(href.startsWith(u)) {
					$this.attr('href', href.replace(u, ''));
					return;
				}
			}
		});
	});
});