class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	_apiKey = 'apikey=3926fb094117f5cdc40cb03ca6e5f90c';
	getRes = async (url) => {
		const res = await fetch(url);
		if(!res.ok) {
			throw new Error(`Could not fetch ${url}, status ${res.status}`);
		}
		return await res.json();
	}

	getAllCharacters = async () => {
		const res = await this.getRes(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
		return res.data.results.map(this._transformCharacter);
	}

	getCharacter = async (id) => {
		const res = await this.getRes(`${this._apiBase}characters/${id}?&${this._apiKey}`);
		return this._transformCharacter(res.data.results[0]);
	}

	_transformCharacter = (char) => {
		return {
			id: char.id,
			name: char.name,
			description: char.description? char.description.slice(0, 180) + '...' : `We haven't information about this hero`,
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items
		}
	}
}

export default MarvelService;