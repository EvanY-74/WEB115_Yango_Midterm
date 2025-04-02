'use strict';

document.getElementById('Button1').addEventListener('click', () => {
    const loan = parseNumber(prompt('Loan amount: '));
    const downPayment = round(parseNumber(prompt('down payment (% of total loan): ')) / 100 * loan);
    const remainder = loan - downPayment;
    let mortgageTerm;
    do {
        mortgageTerm = prompt('Mortgage length: 15 or 30 years? ').replaceAll(' ', '').replace('years', '');
    } while (mortgageTerm != '15' && mortgageTerm != '30');
    mortgageTerm = parseInt(mortgageTerm) * 12; // in months

    // const interestRate = 0.0575; // 5.75%
    const interestRate = 0.045; // 4.5%

    const monthlyPayment = ((interestRate / 12 * remainder) / (1 - Math.pow(1 + interestRate / 12, -mortgageTerm))).toFixed(2);
    
    let loanBalance = remainder;
    for (let i = 0; i < mortgageTerm; i++) {
        const interestPaid = round(loanBalance * interestRate / 12);
        const principalPaid = round(monthlyPayment - interestPaid);
        loanBalance -= principalPaid;
        loanBalance = round(loanBalance); // round .999999 -> 1

        const p = document.createElement('p');
        p.innerHTML = `Month ${i + 1}: interest: $${interestPaid.toFixed(2)}, principal: $${principalPaid.toFixed(20)}, balance: $${loanBalance.toFixed(2)}`;
        document.body.appendChild(p);
    }

    document.body.appendChild(document.createElement('hr'));
    const info = document.createElement('p');
    p.innerText = `Mortgage term: $${mortgageTerm}
                   Interest rate:' $${interestRate}
                   Mortgage amount: $${loan + totalInterest}
});

function parseNumber(input) {
    return Number(input.replaceAll(',', '').replace('$', ''));
}

function round(num) {
    return Math.round(num * 100) / 100; // round to 2 decimal places
}