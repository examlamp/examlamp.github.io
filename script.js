
// ========================================
// LAMP LAB — WORKING COPY SYSTEM
// ========================================

document.addEventListener('DOMContentLoaded', function () {

    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(function (button) {

        button.addEventListener('click', async function () {

            const program = button.closest('.program');
            const codeElement = program.querySelector('pre code');

            if (!codeElement) {
                return;
            }

            // Get the actual source code
            const code = codeElement.textContent;

            const copyText = button.querySelector('.copy-text');
            const originalText = 'Copy Code';

            try {

                // Try modern clipboard API
                if (navigator.clipboard && window.isSecureContext) {

                    await navigator.clipboard.writeText(code);

                } else {

                    // Fallback for unsupported browsers
                    const textarea = document.createElement('textarea');

                    textarea.value = code;
                    textarea.style.position = 'fixed';
                    textarea.style.left = '-9999px';
                    textarea.style.top = '0';

                    document.body.appendChild(textarea);

                    textarea.focus();
                    textarea.select();

                    const successful = document.execCommand('copy');

                    document.body.removeChild(textarea);

                    if (!successful) {
                        throw new Error('Clipboard copy failed');
                    }
                }

                // Success feedback
                copyText.textContent = 'Copied!';
                button.classList.add('copied');

            } catch (error) {

                console.error('Copy error:', error);

                copyText.textContent = 'Failed!';

            }

            // Reset button
            setTimeout(function () {

                copyText.textContent = originalText;
                button.classList.remove('copied');

            }, 2000);

        });

    });

    console.log('LAMP LAB loaded successfully!');

});
