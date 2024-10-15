const submitButton = document.querySelector('.order__block-send');
submitButton.addEventListener('click', function(event) {
    const requiredFields = document.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (field.value.trim() === '') {
            field.style.borderColor = '#FF0000';
            isValid = false;
        } else {
            field.style.borderColor = '';
        }
    });
    if (!isValid) {
        event.preventDefault();
    }
});
const requiredFields = document.querySelectorAll('input[required], textarea[required]');
requiredFields.forEach(field => {
    field.addEventListener('input', () => {
        if (field.value.trim() !== '') {
            field.style.borderColor = '';
        }
    });
});
