const FileService = require('../../service/FileService');
const StringService = require('../../service/StringService');


function main() {

	const lines = FileService.readLines(process.cwd() + '/2024/day1/input.1.txt');
	const array_left = [];
	const array_right = [];
	for (const line of lines) {
		const [number_obj1, number_obj2] = StringService.getPositionNumbers(line);
		array_left.push(number_obj1.value);
		array_right.push(number_obj2.value);
	};

	array_left.sort((a, b) => a - b);
	array_right.sort((a, b) => a - b);

	const right_map = new Map();
	for (let i = 0; i < array_right.length; i++) {
		if (right_map.has(array_right[i])) {
			right_map.set(array_right[i], right_map.get(array_right[i]) + 1);
		} else {
			right_map.set(array_right[i], 1);
		}
	};
	console.log("Right map: ", right_map);

	var sum = 0;
	var sum_simular = 0;
	for (let i = 0; i < array_left.length; i++) {
		sum += Math.abs(array_left[i] - array_right[i]);

		const right_value = right_map.get(array_left[i]) || 0;
		sum_simular += array_left[i] * right_value;
	};

	console.log("Sum: ", sum);
	console.log("Sum simular: ", sum_simular);
};

main();