
// ========================================
// LAMP LAB — PHP PRACTICAL INTERACTIONS
// ========================================

// NAVIGATION

const navButtons = document.querySelectorAll('.nav-btn');
const programs = document.querySelectorAll('.program');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const index = Number(button.dataset.program);

        navButtons.forEach(btn => btn.classList.remove('active'));
        programs.forEach(program => program.classList.remove('active'));

        button.classList.add('active');
        programs[index].classList.add('active');
    });
});


// RESULT DISPLAY

function showResult(id, content) {
    const result = document.getElementById(id);

    result.replaceChildren();

    const title = document.createElement('div');
    title.className = 'result-title';
    title.textContent = 'OUTPUT';

    result.appendChild(title);

    if (typeof content === 'string') {
        const output = document.createElement('div');
        output.textContent = content;
        result.appendChild(output);
    } else {
        result.appendChild(content);
    }

    result.classList.add('show');
}

function clearOutput(inputIds, resultId) {
    inputIds.forEach(id => {
        document.getElementById(id).value = '';
    });

    const result = document.getElementById(resultId);
    result.replaceChildren();
    result.classList.remove('show');
}


// ========================================
// PROGRAM 1 — ARMSTRONG NUMBER
// ========================================

document.getElementById('armBtn').addEventListener('click', armstrong);

function armstrong() {

    const value = document.getElementById('armInput').value;

    if (value.trim() === '' ||
        !Number.isSafeInteger(Number(value)) ||
        Number(value) < 0) {

        showResult('armResult', 'Please enter a valid non-negative integer.');
        return;
    }

    const a = Number(value);

    let number = a;
    let sum = 0;

    while (number !== 0) {

        const r = number % 10;

        sum = sum + (r * r * r);

        number = Math.floor(number / 10);
    }

    if (a === sum) {

        showResult(
            'armResult',
            a + ' is an Armstrong number ✓'
        );

    } else {

        showResult(
            'armResult',
            a + ' is not an Armstrong number.'
        );
    }
}


// ========================================
// PROGRAM 2 — DATE FUNCTION
// ========================================

function getIndianTime() {
    return new Date(
        new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Kolkata'
        })
    );
}

function updateClock() {

    const now = getIndianTime();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    document.getElementById('liveClock').textContent =
        hours + ':' + minutes;

    document.getElementById('liveDate').textContent =
        now.toLocaleDateString('en-IN', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
}

updateClock();
setInterval(updateClock, 1000);

document.getElementById('dateBtn').addEventListener('click', showDate);

function showDate() {

    const now = getIndianTime();

    const time = now.getHours() + ':' +
        String(now.getMinutes()).padStart(2, '0');

    const hour = now.getHours();

    let greeting;

    if (hour >= 0 && hour <= 5) {
        greeting = "It's Late Night";
    }
    else if (hour >= 6 && hour <= 11) {
        greeting = "Good Morning";
    }
    else if (hour >= 12 && hour <= 16) {
        greeting = "Good Afternoon";
    }
    else {
        greeting = "Good Evening";
    }

    const date = now.toLocaleDateString('en-GB');

    const day = now.toLocaleDateString('en-IN', {
        weekday: 'long'
    });

    const output =
        'Current time is: ' + time + '\n' +
        greeting + '\n' +
        "Today's Date is " + date + '\n' +
        'Today is ' + day;

    showResult('dateResult', output);
}


// ========================================
// PROGRAM 3 — STUDENT MARKS ARRAY
// ========================================

document.getElementById('marksBtn')
    .addEventListener('click', showMarks);

function showMarks() {

    const stdMarks = {

        Ramesh: {
            Java: 88,
            Php: 98,
            Networking: 78
        },

        Suresh: {
            Java: 83,
            Php: 90,
            Networking: 82
        },

        Kishan: {
            Java: 85,
            Php: 90,
            Networking: 79
        }

    };

    const table = document.createElement('table');
    table.className = 'marks-table';

    const header = document.createElement('tr');

    ['Student', 'Java', 'PHP', 'Networking'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        header.appendChild(th);
    });

    table.appendChild(header);

    for (const std in stdMarks) {

        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = std;
        row.appendChild(nameCell);

        for (const subject in stdMarks[std]) {

            const cell = document.createElement('td');
            cell.textContent = stdMarks[std][subject];

            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    showResult('marksResult', table);
}


// ========================================
// PROGRAM 4 — SIMPLE CALCULATOR
// ========================================

document.querySelectorAll('.operator-btn').forEach(button => {

    button.addEventListener('click', () => {
        calculate(button.dataset.operator);
    });

});

function calculate(operator) {

    const first = document.getElementById('firstNum').value;
    const second = document.getElementById('secondNum').value;

    if (first.trim() === '' || second.trim() === '') {

        showResult('calcResult', 'Enter valid numbers.');
        return;
    }

    const a = Number(first);
    const b = Number(second);

    if (!Number.isFinite(a) || !Number.isFinite(b)) {

        showResult('calcResult', 'Enter valid numbers.');
        return;
    }

    let result;

    switch (operator) {

        case '+':

            result = a + b;
            break;

        case '-':

            result = a - b;
            break;

        case '*':

            result = a * b;
            break;

        case '/':

            if (b === 0) {

                result = 'Cannot divide by 0';

            } else {

                result = a / b;
            }

            break;
    }

    showResult('calcResult', 'Result: ' + result);
}

document.getElementById('calcClear')
    .addEventListener('click', () => {

        clearOutput(
            ['firstNum', 'secondNum'],
            'calcResult'
        );

    });


// ========================================
// PROGRAM 5 — POST METHOD & PYRAMID
// ========================================

document.getElementById('pyramidBtn')
    .addEventListener('click', generatePyramid);

function generatePyramid() {

    const lines = Number(
        document.getElementById('lineInput').value
    );

    const symbol = document.getElementById('symbolInput').value;

    if (
        !Number.isInteger(lines) ||
        lines < 1 ||
        lines > 30 ||
        symbol.trim() === ''
    ) {

        showResult(
            'pyramidResult',
            'Enter valid lines (1–30) and a symbol.'
        );

        return;
    }

    let output = '';

    for (let i = 0; i < lines; i++) {

        for (let j = 0; j < i + 1; j++) {

            output += symbol;
        }

        output += '\n';
    }

    const pre = document.createElement('pre');

    pre.style.fontFamily = 'JetBrains Mono, monospace';
    pre.style.fontSize = '14px';
    pre.style.color = '#55d6a2';
    pre.style.whiteSpace = 'pre-wrap';
    pre.textContent = output;

    showResult('pyramidResult', pre);
}

document.getElementById('pyramidClear')
    .addEventListener('click', () => {

        clearOutput(
            ['lineInput', 'symbolInput'],
            'pyramidResult'
        );

    });


// ========================================
// CLEAR BUTTONS — PROGRAM 1
// ========================================

document.querySelectorAll('[data-clear]').forEach(button => {

    button.addEventListener('click', () => {

        clearOutput(
            [button.dataset.clear],
            button.dataset.result
        );

    });

});

console.log('LAMP LAB Practical Website Loaded Successfully!');
