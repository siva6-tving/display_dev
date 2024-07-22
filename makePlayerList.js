const fs = require('node:fs').promises;

const ls = async directoryPath  =>  await fs.readdir(directoryPath);

const run = async () => {
	const files = await ls('./lib/data/player');
	const players = files.map(file => parseInt(file.split('.')[0]));
	console.log(players);
	fs.writeFile('./lib/content/player.js', `const players = ${JSON.stringify(players)};`);
};

run();