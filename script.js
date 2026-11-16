
document.querySelectorAll('.program').forEach(program => {

    const button = program.querySelector('.copy-btn');
    const code = program.querySelector('pre code');

    if (!button || !code) return;

    button.addEventListener('click', async function () {

        const originalText = 'Copy Code';
        const textToCopy = code.textContent;

        try {

            if (navigator.clipboard && window.isSecureContext) {

                await navigator.clipboard.writeText(textToCopy);

            } else {

                const textarea = document.createElement('textarea');

                textarea.value = textToCopy;
                textarea.style.position = 'fixed';
                textarea.style.left = '-9999px';

                document.body.appendChild(textarea);

                textarea.select();

                const successful = document.execCommand('copy');

                textarea.remove();

                if (!successful) {
                    throw new Error('Copy failed');
                }
            }

            button.textContent = '✓ Copied!';
            button.classList.add('copied');

        } catch (error) {

            button.textContent = 'Copy Failed';

            console.error('Copy error:', error);

        }

        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);

    });

});

console.log('LAMP LAB Copy System Ready!');
