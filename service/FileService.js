const fs = require('fs');

class FileService {

	readLines(filePath) {
		try {
			const data = fs.readFileSync(filePath, 'utf8');
			return data.replaceAll('\r', '').split('\n');
		} catch (error) {
			console.error(`Error reading file: ${error.message}`);
			return [];
		};
	};
};

module.exports = new FileService();