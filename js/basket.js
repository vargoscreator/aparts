const basketEmpty = document.querySelector('.basket__empty');
const basketTotal = document.querySelector('.basket__total');

function updateTotals() {
    let totalPositions = 0;
    let totalPrice = 0;

    document.querySelectorAll('.basket__item').forEach(item => {
        const amountInput = item.querySelector('.count-amount');
        let amount = parseInt(amountInput.value);
        const price = parseInt(item.querySelector('.basket__item-price p:last-of-type').innerText.replace(' UAH', ''));
        const totalItemPrice = amount * price;

        item.querySelector('.basket__item-total p:last-of-type').innerText = totalItemPrice + ' UAH';

        totalPositions += amount;
        totalPrice += totalItemPrice;
    });

    document.querySelector('.basket__total-position p:nth-child(2)').innerText = totalPositions;
    document.querySelector('.basket__total-price p:nth-child(2)').innerText = totalPrice + ' UAH';

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
    const amountInput = item.querySelector('.count-amount');

    minusButton.addEventListener('click', () => {
        let amount = parseInt(amountInput.value);
        if (amount > 1) {
            amount--;
            amountInput.value = amount;
            updateTotals();
        }
    });

    plusButton.addEventListener('click', () => {
        let amount = parseInt(amountInput.value);
        amount++;
        if (amount > 999) {
            amountInput.value = 999;
        } else{
            amountInput.value = amount;
        }
        updateTotals();
    });

    resetButton.addEventListener('click', () => {
        amountInput.value = 1;
        updateTotals();
    });

    amountInput.addEventListener('input', () => {
        let amount = parseInt(amountInput.value);
        if (isNaN(amount) || amount < 1) {
            amountInput.value = 1;
        } else if (amount > 999) {
            amountInput.value = 999;
        }
        updateTotals();
    });

    deleteButton.addEventListener('click', () => {
        const parentBlock = item.closest('.basket__block');
        item.remove();

        if (parentBlock.querySelectorAll('.basket__item').length === 0) {
            parentBlock.remove();
        }

        updateTotals();
        checkBasketScreenWidth();
    });
});
document.querySelector('.basket__total-reset').addEventListener('click', () => {
    document.querySelectorAll('.basket__block').forEach(block => block.remove());
    basketEmpty.classList.add('active');
    basketTotal.style.display = 'none';
    updateTotals();
});
updateTotals();


function addTextToBasketItems() {
    const items = document.querySelectorAll('.basket__item');
    items.forEach(item => {
        const sendElement = item.querySelector('.basket__item-send');
        const priceElement = item.querySelector('.basket__item-price');
        const totalElement = item.querySelector('.basket__item-total');
        if (!sendElement.querySelector('.basket__item-name')) {
            const sendLabel = document.createElement('p');
            sendLabel.classList.add('basket__item-name');
            sendLabel.textContent = 'ВІДПРАВКА:';
            sendElement.insertBefore(sendLabel, sendElement.firstChild);
        }
        if (!priceElement.querySelector('.basket__item-name')) {
            const priceLabel = document.createElement('p');
            priceLabel.classList.add('basket__item-name');
            priceLabel.textContent = 'ЦІНА:';
            priceElement.insertBefore(priceLabel, priceElement.firstChild);
        }
        if (!totalElement.querySelector('.basket__item-name')) {
            const totalLabel = document.createElement('p');
            totalLabel.classList.add('basket__item-name');
            totalLabel.textContent = 'ВСЬОГО:';
            totalElement.insertBefore(totalLabel, totalElement.firstChild);
        }
    });
}
function removeTextFromBasketItems() {
    const labels = document.querySelectorAll('.basket__item-name');
    labels.forEach(label => label.remove());
}
function checkBasketScreenWidth() {
    if (window.innerWidth < 768) {
        addTextToBasketItems();
    } else {
        removeTextFromBasketItems();
    }
}
window.addEventListener('resize', checkBasketScreenWidth);
checkBasketScreenWidth()