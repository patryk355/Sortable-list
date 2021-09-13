const list = document.querySelector('#list');
const checkBtn = document.querySelector('.check');

const values = [
    4, 15, 222, 450, 777, 958, 999, 1800, 11699, 50000
];

const unsortedValues = [];

function randomList() {
    [...values]
        .map((value) => ({
            value: value,
            method: Math.random()
        }))
        .sort((a, b) => {
            return a.method - b.method;
        })
        .map((value, index) => {
            unsortedValues[index] = value;

            list.innerHTML += `
            <li class="list-group-item" data-index="${index}" draggable="true">${unsortedValues[index].value} <i class="fas fa-sort"></i></li>
            `;
        })

}

randomList();

function checkList() {
    const listItems = [...document.querySelectorAll('.list-group-item')];

    values.forEach((value, index) => {
        if (value === unsortedValues[index].value) {
            listItems.forEach(li => {
                if (+li.dataset.index === index) {
                    li.classList.remove('wrong');
                    li.classList.add('correct');
                }
            });
        }
        else if (value !== unsortedValues[index].value) {
            listItems.forEach(li => {
                if (+li.dataset.index === index) {
                    li.classList.remove('correct');
                    li.classList.add('wrong');
                }
            });
        }
    })
}

checkBtn.addEventListener('click', checkList);