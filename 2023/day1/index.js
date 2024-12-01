const FileService = require("../../service/FileService");
const StringService = require("../../service/StringService");

function main () {

	const lines = FileService.readLines(process.cwd() + '/2023/day1/input.1.txt');
	let sum = 0;
	for (const line of lines) {
		let array_numbers = StringService.getPositionNumbers(line);
		let number1 = array_numbers[0];
		let number2 = array_numbers[array_numbers.length - 1];
		const number = `${number1.value}${number2.value}`;
		sum += parseInt(number);
	};

	console.log('Sum:', sum);
};

main();