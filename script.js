
// LAMP LAB — COPY CODE FUNCTIONALITY

document.querySelectorAll('.program').forEach(program => {

    const copyButton = program.querySelector('.copy-btn');
    const codeBlock = program.querySelector('pre code');

    if (!copyButton || !codeBlock) return;

    copyButton.addEventListener('click', async () => {

        const code = codeBlock.innerText;

        try {
            await navigator.clipboard.writeText(code);

            copyButton.textContent = '✓ Copied!';
            copyButton.classList.add('copied');

            setTimeout(() => {
                copyButton.textContent = 'Copy Code';
                copyButton.classList.remove('copied');
            }, 2000);

        } catch (error) {
            copyButton.textContent = 'Copy failed';

            setTimeout(() => {
                copyButton.textContent = 'Copy Code';
            }, 2000);
        }

    });

});

console.log('LAMP LAB Copy Buttons Loaded!');
