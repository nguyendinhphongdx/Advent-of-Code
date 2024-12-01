class StringService {
	/**
	 * Extracts all the numeric substrings from the given string and returns their positions.
	 * const matrix = `..1345..6.6678..`;
	 * return
	 * [
		{ value: '1345', index: 2, length: 4 },
		{ value: '6', index: 8, length: 1 },
		{ value: '6678', index: 10, length: 4 }
	  ]
	 *
	 * @param {string} string - The input string to search for numeric substrings.
	 * @returns {Array<{value: string, index: number, length: number}>} An array of objects, each containing:
	 **/
	getPositionNumbers (string) {
		const regex = /\d+/g;
		const matches = [];
		let match;
		while ((match = regex.exec(string))!== null) {
			if (isNaN(parseInt(match[0]))) continue;
			matches.push(
				{
					value: match[0],
					index: match.index,
					length: match[0].length,
				}
			);
		}
		return matches;
	};
};


module.exports = new StringService();