document.getElementById('regForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const msgDiv = document.getElementById('message');
    
    // Add "Loading" state
    btn.disabled = true;
    btn.textContent = 'Processing...';

    const data = Object.fromEntries(new FormData(e.target));

    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    
    // Reset state
    btn.disabled = false;
    btn.textContent = 'Get Started';
    
    msgDiv.textContent = result.message || result.error;
    msgDiv.style.color = response.ok ? '#059669' : '#dc2626'; // Success green vs Error red
});