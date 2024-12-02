const FileService = require('../../service/FileService');
const StringService = require('../../service/StringService');



function isSafeLine (string) {

	const numbers = string.split(' ');
	let all_trend = '';
	for (let i = 0; i < numbers.length; i++) {
		const next = numbers[i+1];
		if (next) {
			if (i == 0) {
				if (next - numbers[i] > 0) {
					all_trend = 'increase';
				} else {
					all_trend = 'decrease';
				}
			}

			var current_trend = all_trend;
			if (i != 0) {
				current_trend = next - numbers[i] > 0 ? 'increase' : 'decrease';
			}

			const distance = Math.abs(next - numbers[i]);
			if (distance > 3 || distance == 0 || current_trend != all_trend) {
				return false;
			}
		}
	};
	return true;
};


function retryUnsafeLine (string) {

	const numbers = string.split(' ');
	for (var i = 0; i < numbers.length; i++) {
		const array = structuredClone(numbers);
		array.splice(i, 1);
		if (isSafeLine(array.join(' '))) {
			return true;
		}
	};

	return false;
};


function main() {

	const lines = FileService.readLines(process.cwd() + '/2024/day2/input.1.txt');
	const line_safe_index = [];
	const unsafe_lines = [];
	for (const line of lines) {
		if (isSafeLine(line)) {
			line_safe_index.push(line);
		} else {
			unsafe_lines.push(line);
		}
	};

	const retry_unsafe_lines = [];
	for (const line of unsafe_lines) {
		if (retryUnsafeLine(line)) {
			retry_unsafe_lines.push(line);
		}
	};

	console.log("Safe lines: ", line_safe_index.length);
	console.log("Retry Safe lines: ", retry_unsafe_lines.length);

	console.log("Total safe lines: ", line_safe_index.length + retry_unsafe_lines.length);
};

main();
