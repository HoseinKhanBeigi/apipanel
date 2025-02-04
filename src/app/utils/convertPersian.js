export function formatToPersian(englishNumber) {
    const strInput = englishNumber.toString();
    const strArray = strInput.split('');

    const numMap = {
        0: '۰',
        1: '۱',
        2: '۲',
        3: '۳',
        4: '۴',
        5: '۵',
        6: '۶',
        7: '۷',
        8: '۸',
        9: '۹',
    };
    let output = '';

    strArray.forEach(str => {
        if (numMap[str]) {
            output += numMap[str];
        } else {
            output += str;
        }
    });

    return output;
}