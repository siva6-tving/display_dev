const fs = require('node:fs').promises;

const mp3Path = './lib/data/player';
const playerListPath = './lib/content/player.js';

const ls = async directoryPath  =>  await fs.readdir(directoryPath);

const run = async () => {
	const files = await ls(mp3Path);
	const players = files.map(file => parseInt(file.split('.')[0]));
	const playersJs = `const players = ${JSON.stringify(players)};`;

	const playerJsFromFile = await fs.readFile(playerListPath, 'utf8');
	if(playersJs === playerJsFromFile) return process.exit();


	await fs.writeFile(playerListPath, `const players = ${JSON.stringify(players)};`);
	process.exit(-1);
};

run();