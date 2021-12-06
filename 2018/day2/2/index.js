var fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n');

const findErrors = (code1, code2) => {
    let errors = 0;
    code1.split('').forEach((letter, index) => {
        errors += letter === code2[index] ? 0 : 1;
    });
    return errors;
}

const findCode = (code1, code2) => {
    let newCode = '';
    code1.split('').forEach((letter, index) => {
        if (letter === code2[index]) {
            newCode += letter;
        }
    });
    return newCode;
}

input.forEach((code1, index1) => {
    input.forEach((code2, index2) => {
        if (index1 !== index2) {
            const errors = findErrors(code1, code2);
            if (errors === 1) {
                const code = findCode(code1, code2);
                console.log(code);
            }
        }
    });
})