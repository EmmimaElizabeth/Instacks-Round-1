const addFieldBtn = document.getElementById('addFieldBtn');
const saveFormBtn = document.getElementById('saveFormBtn');
const fieldsContainer = document.getElementById('fieldsContainer');

addFieldBtn.addEventListener('click', () => {
  const fieldGroup = document.createElement('div');
  fieldGroup.className = 'field-group';

  fieldGroup.innerHTML = `
    <input type="text" placeholder="Field Label" class="field-label" />
    <select class="field-type">
      <option value="">Select Type</option>
      <option value="short_answer">Short Answer</option>
      <option value="paragraph">Paragraph</option>
      <option value="mcq">Multiple Choice</option>
      <option value="checkbox">Checkbox</option>
      <option value="dropdown">Dropdown</option>
      <option value="file">File Upload</option>
      <option value="rating">Rating</option>
      <option value="date">Date</option>
      <option value="time">Time</option>
    </select>
    <textarea placeholder="Options (comma separated)" class="field-options" style="display: none;"></textarea>
    <button class="remove-field">Remove</button>
  `;

  fieldsContainer.appendChild(fieldGroup);

  const typeSelect = fieldGroup.querySelector('.field-type');
  const optionsTextarea = fieldGroup.querySelector('.field-options');

  typeSelect.addEventListener('change', () => {
    if (["mcq", "checkbox", "dropdown"].includes(typeSelect.value)) {
      optionsTextarea.style.display = 'block';
    } else {
      optionsTextarea.style.display = 'none';
    }
  });

  const removeBtn = fieldGroup.querySelector('.remove-field');
  removeBtn.addEventListener('click', () => {
    fieldGroup.remove();
  });
});

saveFormBtn.addEventListener('click', () => {
  const formTitle = document.getElementById('formTitle').value;
  const fields = [];

  document.querySelectorAll('.field-group').forEach(group => {
    const label = group.querySelector('.field-label').value;
    const type = group.querySelector('.field-type').value;
    const options = group.querySelector('.field-options').value;

    if (label && type) {
      fields.push({
        label,
        type,
        options: options ? options.split(',').map(opt => opt.trim()) : []
      });
    }
  });

  const form = { title: formTitle, fields };

  fetch('http://localhost:5000/api/forms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form)
  })
  .then(response => response.json())
  .then(data => {
    alert(`Form saved! Link: http://localhost:5000/forms/${data._id}`);
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Failed to save form.');
  });
});
