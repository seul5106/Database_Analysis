const fs = require('fs')
const csv = fs.readFileSync("./csv/csv_exam.csv", { encoding: 'utf8'})

console.log(csv.toString())

// csvToJSON이라는 함수는 문자열을 인자값으로 받아서
// JSON의 형태로 반환
const csvToJSON = (csv_string) => {
    const rows = csv_string.split('\r\n');
    // 문자열을 구분하여 배열에 저장

    const jsonArray = [];
    // 빈 배열을 생성 --> CSV의 각 행을 담을 JSON 객체

    const header = rows[0].split(',');
    // 키 값들의 행을 추출해서 ,를 기준으로 배열에 저장

    for (let i = 1; i < rows.length-1; i++) {

        let obj = {};
        //빈 객체를 생성

        let row = rows[i].split(',');

        for (let j = 0; j < header.length; j++) {
            obj[header[j]] = row[j]
        }
        // 각 내용 행을 {header[0]: row[0], header[1]: row[1]}
        // obj 객체에 넣어준다.

        jsonArray.push(obj);
    }

    return jsonArray
};

const result = csvToJSON(csv.toString());
console.log(result);