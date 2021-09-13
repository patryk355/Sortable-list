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
            <li class="list-group-item" data-index="${index}">${unsortedValues[index].value} <i class="fas fa-sort"></i></li>
            `;
        })

}

randomList();