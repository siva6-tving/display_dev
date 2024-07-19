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
	"HH": ["#FF6600", "https://image.tving.com/ntgs/sports/kbo/team/20240304/HH.svg", "https://image.tving.com/ntgs/operation/banner/2024/05/22/1716358590_1.jpg", "한화"],
	"HT": ["#EA0029", "https://image.tving.com/ntgs/sports/kbo/team/20240304/HT.svg", "https://image.tving.com/ntgs/operation/banner/2024/05/22/1716358209_1.jpg", "KIA"],
	"KT": ["#2C2A29", "https://image.tving.com/ntgs/sports/kbo/team/20240304/KT.svg", "https://image.tving.com/ntgs/operation/banner/2024/05/22/1716358864_1.jpg", "KT"],
	"LG": ["#C30037", "https://image.tving.com/ntgs/sports/kbo/team/20240304/LG.svg", "https://image.tving.com/ntgs/operation/banner/2024/05/22/1716358414_1.jpg", "LG"],
	"LT": ["#041E42", "https://image.tving.com/ntgs/sports/kbo/team/20240304/LT.svg", "https://image.tving.com/ntgs/operation/banner/2024/05/22/1716358731_1.jpg", "롯데", 'lib/data/LT.mp3'],
	"NC": ["#071D3D", "https://image.tving.com/ntgs/sports/kbo/team/20240304/NC.svg", "https://image.tving.com/ntgs/operation/banner/2024/05/22/1716358993_1.jpg", "NC"],
	"OB": ["#131230", "https://image.tving.com/ntgs/sports/kbo/team/20240304/OB.svg", "https://image.tving.com/ntgs/operation/banner/2024/05/22/1716358503_1.jpg", "두산"],
	"SK": ["#CF0022", "https://image.tving.com/ntgs/sports/kbo/team/20240304/SK.svg", "https://image.tving.com/ntgs/operation/banner/2024/05/22/1716359047_1.jpg", "SSG", 'lib/data/SK.mp3'],
	"SS": ["#005BAC", "https://image.tving.com/ntgs/sports/kbo/team/20240304/SS.svg", "https://image.tving.com/ntgs/operation/banner/2024/05/22/1716358928_1.jpg", "삼성", 'lib/data/SS.mp3'],
	"WO": ["#820024", "https://image.tving.com/ntgs/sports/kbo/team/20240304/WO.svg", "https://image.tving.com/ntgs/operation/banner/2024/05/31/1717140020_1.jpg", "키움"]
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

const getMyTeamCode = src => {
	if(!src) return;

	const fileName = src.split('/').pop();
	if(!fileName) return;

	return fileName.substring(0,2);
};

const getKboTeamInfo = (kboTeams, myTeamCode, idx) => {
	if(!_.contains(_.keys(kboTeams), myTeamCode)) return;
	return kboTeams[myTeamCode][idx];
}

const getKboColor = (kboTeams, myTeamCode) => getKboTeamInfo(kboTeams, myTeamCode, 0);

const getKboTeamLogo = (kboTeams, myTeamCode) => getKboTeamInfo(kboTeams, myTeamCode, 1);

const getKboTeamCoverImg = (kboTeams, myTeamCode) => getKboTeamInfo(kboTeams, myTeamCode, 2);

const getKboTeamName = (kboTeams, myTeamCode) => getKboTeamInfo(kboTeams, myTeamCode, 3);

const getKboTeamSong = (kboTeams, myTeamCode) => getKboTeamInfo(kboTeams, myTeamCode, 4);

const findLocationInfo = (LOC, {hostname}) =>  _.filter(LOC, v=>v.url === hostname);

const findlastNode = (selector, text) => $(selector)
                .filter(function() { return (!text || $(this).text() === text) && $(this).children().length === 0;});

// const findByEqualText = (selector, text) => $(selector).filter(function() { return $(this).text() === text;} );

// const audioIframe = url => `<iframe width="500" height="500" src="${url}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;

const setTimeoutMulti = (f, ...ms) => {
	_.forEach(ms, v => setTimeout(f, v));
};

$('#top-gnb').ready(()=>{
	_.each(findLocationInfo(LOC, location), v=>{
		const [$target, method] = findAndIndex(targetPosition);
		if(!!$target?.length) $target[method](label(v.title));

		$('.warnning').css('margin-left', $('header > aside').length?'20pt':'auto').css('background-color', v.color).on('click', () => {
			const $myTeamEmblem = $('img[alt^="my-team-emblem"]');
			const myTeamCode = getMyTeamCode($myTeamEmblem.attr('src'));
			const myTeamColor = getKboColor(kboTeams, myTeamCode);
			const myTeamLogo = getKboTeamLogo(kboTeams, myTeamCode);
			const myTeamName = getKboTeamName(kboTeams, myTeamCode);

			// cover image
			const changeKboImage = (coverDiv, count=0) => {
				const $cover = $('img.atom-poster-img.object-cover');
				if($cover.length === 0) {
					if(count < 2) {
						setTimeout(()=> changeKboImage(coverDiv, count+1), 100);
					}
					return;
				}
				const imgSrc = getKboTeamCoverImg(kboTeams, myTeamCode);
				if($cover.attr('src') === imgSrc) return;

				const song = getKboTeamSong(kboTeams, myTeamCode);
				if(song && $myTeamEmblem.parent().find('audio').length === 0) {
					const songUrl = chrome.runtime.getURL(song);
					$myTeamEmblem.parent().append(`<audio src="${songUrl}" autoplay loop></audio>`);
				}

				$cover.attr('src', imgSrc).attr('datasrc', imgSrc);//.removeClass('h-full');
				return $cover.parent().parent().parent();
			};

			const changeTeamName = (myTeamName, myTeamLogo) => {
				if(myTeamName) {
					const focusColor = 'text-[#14d8ff]';
					const targetSelector = 'text-gray-45 text-gray-85 text-\\[\\#737373\\] text-\\[\\#a6a6a6\\]'.split(' ');
					targetSelector.forEach(i => {
						const v = i.replace(/\\/g, '');
						$(`.x-${i}`).removeClass(`${focusColor} x-${v}`).addClass(v);
					});

					findlastNode(`p`, myTeamName).each(function() {
						const $item = $(this);
						targetSelector.forEach(i => {
							const v = i.replace(/\\/g, '');
							if($item.hasClass(v)) $item.removeClass(v).addClass	(`${focusColor} x-${v}`);
						});
					});

					findlastNode(`span`, myTeamName).each(function() {
						const $item = $(this);
						targetSelector.forEach(i => {
							const v = i.replace(/\\/g, '');
							if($item.hasClass(v)) $item.removeClass(v).addClass	(`${focusColor} x-${v}`);
						});
					});
				}
			};
			const coverDiv = changeKboImage();
			changeTeamName(myTeamName, myTeamLogo);

			// $('#__tving_kbo_gnb__, button[type="button"], div.atom-button-wrapper').on('click', () => {
			$('body').on('click', () => {
				setTimeout(() => {
					changeKboImage(coverDiv);
				}, 100);
				setTimeoutMulti(() => {
					changeTeamName(myTeamName, myTeamLogo);
				}, 300, 1_000);
			});
			//////////////////////////////////////////////////////////////////////////////////////
			// const rankTable = findByText('div:contains("팀 순위")').parent().next();
			// if(myTeamName) {
				// const playerTable = findlastNode(`.TableRenderer_prevent-overscroll-bouncing__dekOd span:contains("${myTeamName}")`).parent().parent();
				// playerTable.css('box-shadow', `inset 0 0 0 2px ${myTeamColor};`);
				// playerTable.removeClass('text-gray-45').css('color', myTeamColor).append(`<img src=${myTeamLogo} style="width: 2em; vertical-align:-0.6em"/>`);
				// playerTable.append(`<img src=${myTeamLogo} style="width: 2em; vertical-align:-0.6em"/>`);

				// findlastNode(`.lists__slides-vertical span:contains("${myTeamName}")`).append(`<img src=${myTeamLogo} style="width: 2em; vertical-align:-0.6em"/>`);
				// findlastNode(`.lists__slides-vertical p:contains("${myTeamName}")`).append(`<img src=${myTeamLogo} style="width: 2em; vertical-align:-0.6em"/>`);
				// findlastNode(`body :contains("${myTeamName}")`, myTeamName).html(`<img src=${myTeamLogo} style="width: 1.5em; vertical-align:-0.6em"/>`);
			// }

			// $('#modal-root').html(audioIframe('https://www.youtube.com/embed/0L0CEOYEeTY?si=eKCMtMMkNJhW66_E'));

			// const makeyPlayer =  videoId => {
			// 	return new YT.Player('modal-root', {
			// 		height: '360',
			// 		width: '640',
			// 		videoId: videoId,
			// 		playerVars: {
			// 			'autoplay': 1, // 자동 재생
			// 			'playsinline': 1 // 모바일 장치에서 전체 화면으로 재생되지 않도록 설정
			// 		},
			// 		events: {
			// 			'onReady': event => event.target.playVideo()
			// 		}
			// 	});
			// }
			// makeyPlayer('0L0CEOYEeTY');
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