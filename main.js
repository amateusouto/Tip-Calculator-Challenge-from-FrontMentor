const billInput = document.querySelector('.total-bill');
const tipBtns = document.querySelectorAll('.tip-btn');
const customTipInput = document.querySelector('.tip-custom');
const peopleInput = document.querySelector('.total-people');
const tipAmountOutput = document.querySelectorAll('.result-amount')[0];
const totalOutput = document.querySelectorAll('.result-amount')[1];
const resetBtn = document.querySelector('.reset-btn');
const errorSpan = document.querySelector('.incorrect');

let billValue = 0;
let tipValue = 0;
let peopleValue = 0;

function calculateTip() {
    if (peopleValue < 1) {
        tipAmountOutput.textContent = '$0.00';
        totalOutput.textContent = '$0.00';
        return;
    }

    let tipTotal = (billValue * tipValue) / 100;
    let tipPerPerson = tipTotal / peopleValue;
    let totalPerPerson = (billValue + tipTotal) / peopleValue;

    tipAmountOutput.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalOutput.textContent = `$${totalPerPerson.toFixed(2)}`;
}

billInput.addEventListener('input', () => {
    billValue = parseFloat(billInput.value) || 0;
    calculateTip();
});

peopleInput.addEventListener('input', () => {
    peopleValue = parseFloat(peopleInput.value) || 0;

    if (isNaN(peopleValue) || peopleValue === 0 || peopleValue < 0) {
        errorSpan.classList.add('active');
        peopleInput.classList.add('active');
        
        if (peopleValue < 0) {
            errorSpan.textContent = "Can't be negative";
        } else {
            errorSpan.textContent = "Can't be zero";
        }
        
        calculateTip();
    } else {
        errorSpan.classList.remove('active');
        peopleInput.classList.remove('active');
        calculateTip();
    }
});

tipBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        tipBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
        });

        e.target.classList.add('active');
        e.target.setAttribute('aria-pressed', 'true');

        customTipInput.value = '';

        tipValue = parseFloat(e.target.textContent);
        calculateTip();
    });
});

customTipInput.addEventListener('input', () => {
    tipBtns.forEach(b => b.classList.remove('active'));
    tipValue = parseFloat(customTipInput.value) || 0;

    calculateTip();
});

resetBtn.addEventListener('click', () => {
    billInput.value = '';
    customTipInput.value = '';
    peopleInput.value = '';
    
    billValue = 0;
    tipValue = 0;
    peopleValue = 0;
    tipBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
    });

    errorSpan.classList.remove('active');
    peopleInput.classList.remove('active');

    tipAmountOutput.textContent = '$0.00';
    totalOutput.textContent = '$0.00';
});