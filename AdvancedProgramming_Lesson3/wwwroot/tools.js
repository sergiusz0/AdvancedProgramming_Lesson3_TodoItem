window.addEventListener('DOMContentLoaded', async () => {
    const toolsTableBody = document.querySelector('#toolsTableBody');
    const addToolForm = document.querySelector('#addToolForm');
    const editToolForm = document.querySelector('#editToolForm');

    const fetchTools = async () => {
        const result = await fetch('/api/Tools');
        return await result.json();
    }

    const handleAddToolSubmit = async e => {
        e.preventDefault();
        const formData = new FormData(addToolForm);
        try {
            const result = await fetch('/api/Tools', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: formData.get(''),
                    type: formData.get('type'),
                    brand: formData.get('brand'),
                    model: formData.get('model'),
                    condition: formData.get('condition')
                })
            });
            if (!result.ok) {
                throw new Error('Wystąpił błąd podczas dodawania narzędzia.');
            }
        } catch ({ message }) {
            alert(message);
        } finally {
            addToolForm.reset();
            await renderTable();
        }
    }
    addToolForm.addEventListener('submit', handleAddToolSubmit);

    const handleEditTool = async id => {
        try {
            const tool = await (await fetch(`/api/Tools/${id}`)).json();
            document.querySelector('#editToolId').value = tool.id;
            document.querySelector('#editToolType').value = tool.type;
            document.querySelector('#editToolBrand').value = tool.brand;
            document.querySelector('#editToolModel').value = tool.model;
            document.querySelector('#editToolCondition').value = tool.condition;
            
        } catch ({ message }) {
            alert(message);
        }
    }

    const handleEditToolSubmit = async e => {
        e.preventDefault();
        const formData = new FormData(editToolForm);
        try {
            const result = await fetch(`/api/Tools/${formData.get('id')}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: parseInt(formData.get('id')),
                    type: formData.get('type'),
                    brand: formData.get('brand'),
                    model: formData.get('model'),
                    condition: formData.get('condition')
                    
                })
            });
            if (!result.ok) {
                throw new Error('Wystąpił błąd podczas dodawania narzędzia.');
            }
        } catch ({ message }) {
            alert(message);
        } finally {
            await renderTable();
        }
    }
    editToolForm.addEventListener('submit', handleEditToolSubmit);

    const handleDeleteTool = async id => {
        try {
            const result = await fetch(`/api/Tools/${id}`, {
                method: 'DELETE'
            });
            if (!result.ok) {
                throw new Error('Wystąpił błąd podczas usuwania narzędzia.');
            }
        } catch ({ message }) {
            alert(message);
        } finally {
            await renderTable();
        }
    }

    const registerEvents = () => {
        document.querySelectorAll('[data-edit-tool-id]')
            .forEach(editButton => editButton.addEventListener('click', () => handleEditTool(editButton.dataset.editToolId)));

        document.querySelectorAll('[data-delete-tool-id]')
            .forEach(deleteButton => deleteButton.addEventListener('click', () => handleDeleteTool(deleteButton.dataset.deleteToolId)));
    }

    const tableRow = ({ id, type, brand, model, condition }) => `
        <tr>
            <th scope="row">${id}</th>
            <td>${type}</td>
            <td>${brand}</td>
            <td>${model}</td>
            <td>${condition}</td>
            
            <td>
                <button data-bs-toggle="modal" data-bs-target="#editToolModal" data-edit-tool-id="${id}" type="button" class="btn btn-primary">Edytuj</button>
                <button data-delete-tool-id="${id}" type="button" class="btn btn-danger">Usuń</button>
            </td>
        </tr>
    `;

    const renderTable = async () => {
        toolsTableBody.innerHTML = '';
        const tools = await fetchTools();
        tools.map(tool => toolsTableBody.innerHTML += tableRow({ ...tool }));
        registerEvents();
    }

    await renderTable();
})