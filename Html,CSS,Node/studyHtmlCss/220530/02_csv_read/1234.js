const csvToJSON1 = require("./read_csv copy")

const fs = require('fs')
const csv = fs.readFileSync("./csv/csv_exam.csv", { encoding: 'utf8'})
let csv_string = csv.toString()
let parseCsv = csvToJSON1.csvToJSON(csv_string);

console.log(parseCsv[0].id)