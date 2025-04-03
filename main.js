'use strict';

document.getElementById('Button1').addEventListener('click', () => {
    // get user input
    let loan, downPayment, remainder;
    try {
        loan = parseNumber(prompt('Loan amount: '));
        downPayment = round(parseNumber(prompt('down payment (% of total loan): ')) / 100 * loan);
        remainder = loan - downPayment;
    } catch (error) {
        console.error(error.message);
        alert(error.message);
        return; // break out of function
    }
    let mortgageTerm;
    do {
        mortgageTerm = prompt('Mortgage length: 15 or 30 years? ').replaceAll(' ', '').replace('years', '');
    } while (mortgageTerm != '15' && mortgageTerm != '30');
    mortgageTerm = parseInt(mortgageTerm) * 12; // in months

    // const interestRate = 0.0575; // 5.75%
    const interestRate = 0.045; // 4.5%

    // Calculate and display all values
    const monthlyPayment = ((interestRate / 12 * remainder) / (1 - Math.pow(1 + interestRate / 12, -mortgageTerm))).toFixed(2);
    
    // define vars for loop
    let loanBalance = remainder;
    let totalInterestPaid = 0;
    const table = document.createElement('div');

    for (let i = 0; i < mortgageTerm; i++) {
        const interestPaid = round(loanBalance * interestRate / 12);
        totalInterestPaid += interestPaid;
        const principalPaid = round(monthlyPayment - interestPaid);
        loanBalance -= principalPaid;
        loanBalance = round(loanBalance); // round .999999 -> 1

        const p = document.createElement('p');
        p.innerHTML = `Month ${i + 1}: interest: $${interestPaid.toFixed(2)}, principal: $${principalPaid.toFixed(2)}, balance: $${loanBalance.toFixed(2)}`;
        table.appendChild(p);
    }

    document.body.appendChild(document.createElement('hr'));
    const info = document.createElement('div');
    info.innerText = `Loan term: $${mortgageTerm}
                   Monthly payment: $${monthlyPayment}
                   Interest rate (annual): $${interestRate}
                   Total Interest Paid: $${totalInterestPaid}
                   Total loan cost: $${downPayment} + ${monthlyPayment * mortgageTerm} = $${downPayment + monthlyPayment * mortgageTerm}
                   `;
    
    document.body.appendChild(table);
});

function parseNumber(input) {
    const output = Number(input.replaceAll(',', '').replace('$', ''));
    if (isNaN(output)) throw Error(`"${input}" is an invalid amount`);
    return output;
}

function round(num) {
    return Math.round(num * 100) / 100; // round to 2 decimal places
}