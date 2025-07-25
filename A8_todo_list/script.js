        const input = document.querySelector('input'); 
        const taskDiv = document.querySelector('#task-list');
        const deleteButtonDiv = document.querySelector('#controls')

        const add = () => {
            taskDiv.innerHTML += `<li>${input.value}</li>`;
            deleteButtonDiv.innerHTML += `button`

            input.value=""
        }