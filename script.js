
document.addEventListener('DOMContentLoaded', () => {

    const buttons = document.querySelectorAll('.copy-btn');

    buttons.forEach((button) => {

        button.addEventListener('click', async () => {

            const program = button.closest('.program');
            const codeElement = program.querySelector('pre code');

            if (!codeElement) return;

            // Convert displayed HTML entities into original source code
            const decoder = document.createElement('textarea');
            decoder.innerHTML = codeElement.innerHTML;

            const code = decoder.value;

            try {

                // Modern clipboard API
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(code);
                } else {

                    // Fallback for older browsers
                    const textarea = document.createElement('textarea');

                    textarea.value = code;
                    textarea.style.position = 'fixed';
                    textarea.style.opacity = '0';

                    document.body.appendChild(textarea);
                    textarea.select();

                    const copied = document.execCommand('copy');

                    textarea.remove();

                    if (!copied) {
                        throw new Error('Copy failed');
                    }
                }

                button.textContent = '✓ Copied!';
                button.classList.add('copied');

            } catch (error) {

                button.textContent = 'Copy Failed';
                console.error(error);

            }

            setTimeout(() => {
                button.textContent = 'Copy Code';
                button.classList.remove('copied');
            }, 2000);

        });

    });

});
