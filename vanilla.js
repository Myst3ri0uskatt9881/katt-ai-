<script>
const form = document.querySelector('form');
const input = document.querySelector('input');
const chatBox = document.querySelector('.chat-box');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMessage = input.value;
  chatBox.innerHTML += `<div class="message user"><strong>User:</strong> ${userMessage}</div>`;
  input.value = '';

  const response = await fetch('/', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({message: userMessage})
  });
  const data = await response.json();
  chatBox.innerHTML += `<div class="message assistant"><strong>Bot:</strong> ${data.reply}</div>`;
});
</script>
