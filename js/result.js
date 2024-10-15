const sortButton = document.querySelector('.analogues__sort');
const sortTitle = document.querySelector('.sort-title');
const sortOptions = document.querySelector('.analogues__sort-select');
const topSelect = document.querySelector('.analogues__top-select');
if(sortButton){
    sortButton.addEventListener('click', () => {
        topSelect.classList.toggle('active');
    });
}
const options = document.querySelectorAll('.sort-option');
options.forEach(option => {
    option.addEventListener('click', () => {
        sortTitle.textContent = option.dataset.value;
        topSelect.classList.remove('active');
    });
});
const analoguesFormTitle = document.querySelector('.analogues__form h3');
const analoguesForm = document.querySelector('.analogues__form');
if(analoguesFormTitle){
    analoguesFormTitle.addEventListener('click', () => {
        analoguesForm.classList.toggle('active');
    });
}
document.addEventListener('click', function(event) {
    if (!topSelect.contains(event.target)) {
        topSelect.classList.remove('active');
    }
    if (!document.querySelector('.analogues__form').contains(event.target)) {
        analoguesForm.classList.remove('active');
    }
});
function handleResize() {
    const form = document.querySelector('.analogues__form');
    const content = document.querySelector('.analogues__content');
    const topBlock = document.querySelector('.analogues__top-block');
    if (window.innerWidth < 768 && topBlock) {
        if (!topBlock.contains(form)) {
            topBlock.appendChild(form);
        }
    } else {
        if (content && !content.contains(form)) {
            content.insertBefore(form, content.firstChild);
        }
    }
}
window.addEventListener('resize', handleResize);
handleResize();

function addTextToItems() {
    const blocks = document.querySelectorAll('.product__table-block');
    blocks.forEach(block => {
        const items = block.querySelectorAll('.product__table-item');
        const labels = ['СКЛАД:', 'КІЛЬКІСТЬ:', 'ЧАС ПОСТАВКИ:', 'ЦІНА:'];
        items.forEach((item, index) => {
            let label = document.createElement('p');
            label.classList.add('product__table-name');
            label.textContent = labels[index];
            if (!item.querySelector('.product__table-name')) { 
                item.insertBefore(label, item.firstChild);
            }
        });
    });
}
function checkScreenWidth() {
    if (window.innerWidth < 768) {
        addTextToItems();
    } else {
        removeTextFromItems();
    }
}
function removeTextFromItems() {
    const labels = document.querySelectorAll('.product__table-name');
    labels.forEach(label => label.remove());
}
window.addEventListener('resize', checkScreenWidth);
checkScreenWidth()

document.querySelectorAll('.filter__label').forEach((label) => {
    label.addEventListener('click', (event) => {
        event.preventDefault();
        const checkbox = label.querySelector('.filter__checkbox');
        checkbox.checked = !checkbox.checked;
    });
});