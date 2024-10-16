const submitButton = document.querySelector('.checkout__block-send');
submitButton.addEventListener('click', function(event) {
    const requiredFields = document.querySelectorAll('input[required]');
    let isValid = true;
    requiredFields.forEach(field => {
        if (field.value.trim() === '') {
            field.classList.add('error')
            isValid = false;
        } else {
            field.classList.remove('error')
        }
    });
    if (!isValid) {
        event.preventDefault();
    }
});
const requiredFields = document.querySelectorAll('input[required]');
requiredFields.forEach(field => {
    field.addEventListener('input', () => {
        if (field.value.trim() !== '') {
            field.classList.remove('error')
        }
    });
});
