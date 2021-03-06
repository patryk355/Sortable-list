const list = document.querySelector('#list');
const checkBtn = document.querySelector('.check');

const values = [
    4, 15, 222, 450, 777, 958, 999, 1800, 11699, 50000
];

const unsortedValues = [];
let startIndex;

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
            return value.value;
        })
        .forEach((value, index) => {
            const listItem = document.createElement('li');

            listItem.classList.add('list-group-item')
            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `
                <div class="draggable" draggable="true">
                    <p>${value} </p>
                    <i class="fas fa-sort"></i>
                </div>
            `;

            unsortedValues.push(listItem);

            list.appendChild(listItem);
        })

    dragAndDropEvents();
}

randomList();

const listItems = [...document.querySelectorAll('.list-group-item')];

function checkList() {
    unsortedValues.forEach((unsortedValue, index) => {
        const valueInLi = unsortedValue.innerText.trim();

        if (valueInLi != values[index]) {
            unsortedValue.classList.add('wrong');
        }
        else {
            unsortedValue.classList.remove('wrong');
            unsortedValue.classList.add('correct');
        }
    })
}

function dragStart() {
    startIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

function dragOver(e) {
    e.preventDefault();
}

function drop() {
    const endIndex = +this.getAttribute('data-index');

    swapListItems(startIndex, endIndex);
}

function swapListItems(startIndex, endIndex) {
    const itemOne = unsortedValues[startIndex].querySelector('.draggable');
    const itemTwo = unsortedValues[endIndex].querySelector('.draggable');

    unsortedValues[startIndex].appendChild(itemTwo);
    unsortedValues[endIndex].appendChild(itemOne);

    let oldValue = unsortedValues[startIndex].value;
    unsortedValues[startIndex].value = unsortedValues[endIndex].value;
    unsortedValues[endIndex].value = oldValue;
}

function dragAndDropEvents() {
    const listItems = [...document.querySelectorAll('.list-group-item')];
    const draggables = document.querySelectorAll('.draggable');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
        draggable.addEventListener('touchstart', dragStart);
    })

    listItems.forEach((li) => {
        li.addEventListener('dragover', dragOver);
        li.addEventListener('drop', drop);
        li.addEventListener('touchend', drop);
        li.addEventListener('dragenter', dragEnter);
        li.addEventListener('dragleave', dragLeave);
    })
}

checkBtn.addEventListener('click', checkList);


