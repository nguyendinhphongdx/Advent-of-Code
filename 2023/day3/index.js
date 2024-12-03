const FileService = require("../../service/FileService");
const StringService = require("../../service/StringService");

function getNeighbors (matrix, pointer) {

	const neighbors = {
		top: [],
		bottom: [],
		left: [],
		right: []
	};
	// top neighbors
	const top_row = pointer.row - 1;
	if (top_row >= 0) {
		for (let index = pointer.index - 1; index < pointer.index + pointer.length + 1; index++) {
			const symbol = matrix[top_row][index];
			neighbors.top.push({
				symbol,
				row: top_row,
				col: index,
			});
		}
	};
	// bottom neighbors
	const bot_row = pointer.row + 1;
	if (bot_row <= matrix.length - 1) {
		for (let index = pointer.index - 1; index < pointer.index + pointer.length + 1; index++) {
			const symbol = matrix[bot_row][index];
			neighbors.bottom.push({
				symbol,
				row: bot_row,
				col: index,
			});
		}
	};

	// right & left neighbors
	neighbors.left.push({
		symbol: matrix[pointer.row][pointer.index - 1],
		row: pointer.row,
		col: pointer.index - 1,
	});
	neighbors.right.push(
		{
			symbol: matrix[pointer.row][pointer.index + pointer.length],
			row: pointer.row,
			col: pointer.index + pointer.length,
		}
	);

	return neighbors;
};
function main () {

	const lines = FileService.readLines(process.cwd() + '/2023/day3/input.1.txt');
	const matrix_lines = [];
	for (const line of lines) {
		matrix_lines.push(StringService.getPositionNumbers(line));
	};

	const numbers = [];
	for (let i = 0; i < matrix_lines.length; i++) {
		const points = matrix_lines[i];
		for (let j = 0; j < points.length; j++) {
			const point = points[j];
			point.row = i;
			point.col = point.index;
			numbers.push(point);
		}
	}

	const part_numbers = [];
	for (const number of numbers) {
		const neighbors = getNeighbors(lines, number);
		for (const key in neighbors) {
			const is_valid = neighbors[key].find(item => item.symbol != '.' && item.symbol != undefined);
			if (is_valid) {
				number.symbol = is_valid;
				part_numbers.push(number);
				break;
			}
		}
	}

	var sum_p2 = 0;
	for (var i = 0; i < part_numbers.length; i++) {
		for (var j = i + 1; j < part_numbers.length; j++) {
			const cur = part_numbers[i];
			const next = part_numbers[j];
			if (cur.symbol.row == next.symbol.row && cur.symbol.col == next.symbol.col) {
				sum_p2 += parseInt(cur.value) * parseInt(next.value);
			}
		}
	}

	console.log("Sum:", part_numbers.reduce((acc, number) => acc + parseInt(number.value), 0));
	console.log("Sum:", sum_p2);
};
main();