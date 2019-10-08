const endb = require('endb');

class Database {
	constructor(path) {
		this.db = new endb(path, { namespace: 'player' })
	}

	async getPlayer() {
		const channel = await this.db.get('channel');
		const radio = await this.db.get('radio');

		return { channel, radio }
	}

	async exists() {
		const channel = await this.db.get('channel');
		const radio = await this.db.get('radio');

		if (channel && radio) {
			return true;
		}

		return false;
	}

	async setPlayer(object) {
		await this.db.set('channel', object.channel);
		await this.db.set('radio', object.radio);

		return true;
	}
};

const PlayerDatabase = new Database('sqlite://player.sqlite');

exports.exists = PlayerDatabase.exists

exports.getPlayer = PlayerDatabase.getPlayer 

exports.setPlayer = PlayerDatabase.setPlayer