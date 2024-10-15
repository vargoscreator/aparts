const items = document.querySelectorAll('.basket__item');
const basketBlocks = document.querySelectorAll('.basket__block');
const resetBasketButton = document.querySelector('.basket__total-reset');
const basketEmpty = document.querySelector('.basket__empty');
const basketTotal = document.querySelector('.basket__total');
let totalPositions = 0;
let totalPrice = 0;

function updateTotals() {
    totalPositions = 0;
    totalPrice = 0;

    document.querySelectorAll('.basket__item').forEach(item => {
        const amount = parseInt(item.querySelector('.count-amount').innerText);
        const price = parseInt(item.querySelector('.basket__item-price p').innerText.replace(' UAH', ''));
        const totalItemPrice = amount * price;

        item.querySelector('.basket__item-total p').innerText = totalItemPrice + ' UAH';

        totalPositions += amount;
        totalPrice += totalItemPrice;
    });

    document.querySelector('.basket__total-position p:nth-child(2)').innerText = totalPositions;
    document.querySelector('.basket__total-price p:nth-child(2)').innerText = totalPrice + ' UAH';

    document.querySelectorAll('.basket__block').forEach(block => {
        const blockItems = block.querySelectorAll('.basket__item');
        let blockTotal = 0;

        blockItems.forEach(item => {
            const amount = parseInt(item.querySelector('.count-amount').innerText);
            const price = parseInt(item.querySelector('.basket__item-price p').innerText.replace(' UAH', ''));
            blockTotal += amount * price;
        });

        block.querySelector('.basket__block-end p:nth-child(2)').innerText = blockTotal + ' UAH';

        if (blockItems.length === 0) {
            block.remove();
        }
    });
    if (document.querySelectorAll('.basket__block').length === 0) {
        basketEmpty.classList.add('active');
        basketTotal.style.display = 'none';
    } else {
        basketEmpty.classList.remove('active');
        basketTotal.style.display = 'flex';
    }
}

document.querySelectorAll('.basket__item').forEach(item => {
    const minusButton = item.querySelector('.count-minus');
    const plusButton = item.querySelector('.count-plus');
    const resetButton = item.querySelector('.count-reset');
    const deleteButton = item.querySelector('.basket__item-delete');
    const amountSpan = item.querySelector('.count-amount');

    minusButton.addEventListener('click', () => {
        let amount = parseInt(amountSpan.innerText);
        if (amount > 1) {
            amount--;
            amountSpan.innerText = amount;
            updateTotals();
        }
    });

    plusButton.addEventListener('click', () => {
        let amount = parseInt(amountSpan.innerText);
        amount++;
        amountSpan.innerText = amount;
        updateTotals();
    });

    resetButton.addEventListener('click', () => {
        amountSpan.innerText = 1;
        updateTotals();
    });

    deleteButton.addEventListener('click', () => {
        const parentBlock = item.closest('.basket__block');
        item.remove();
        if (parentBlock.querySelectorAll('.basket__item').length === 0) {
            parentBlock.remove();
        }
        updateTotals();
    });
});

resetBasketButton.addEventListener('click', () => {
    document.querySelectorAll('.basket__block').forEach(block => block.remove());
    basketEmpty.classList.add('active');
    basketTotal.style.display = 'none';
    updateTotals();
});

updateTotals();