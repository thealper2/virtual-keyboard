/**
 * Virtual Keyboard Interaction Script
 * 
 * This script handles:
 * - Real keyboard event detection
 * - Virtual keyboard highlighting
 * - Theme toggling
 * - Key press statistics
 */

document.addEventListener('DOMContentLoaded', function() {
    // Key press statistics
    const keyStats = {};
    const keyStatsElement = document.getElementById('keyStats');
    const lastKeyElement = document.getElementById('lastKey');
    const keyCombinationElement = document.getElementById('keyCombination');
    
    // Currently pressed keys
    const pressedKeys = new Set();
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', toggleTheme);
    
    // Initialize with dark theme
    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', 'dark');
    }
    
    // Keyboard event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    // Virtual keyboard click events
    document.querySelectorAll('.key').forEach(key => {
        key.addEventListener('mousedown', () => {
            const keyValue = key.getAttribute('data-key');
            simulateKeyPress(keyValue);
            key.classList.add('active');
        });
        
        key.addEventListener('mouseup', () => {
            key.classList.remove('active');
        });
        
        key.addEventListener('mouseleave', () => {
            if (key.classList.contains('active')) {
                key.classList.remove('active');
            }
        });
    });
    
    /**
     * Handle keydown events
     * @param {KeyboardEvent} event - The keyboard event
     */
    function handleKeyDown(event) {
        // Prevent default for specific keys to avoid browser shortcuts
        if ([
            'F1', 'F5', 'F12', 
            'ControlLeft', 'ControlRight', 
            'AltLeft', 'AltRight', 
            'MetaLeft', 'MetaRight'
        ].includes(event.code)) {
            event.preventDefault();
        }
        
        const keyCode = event.code;
        pressedKeys.add(keyCode);
        
        // Update key stats
        updateKeyStats(keyCode);
        
        // Highlight the key on virtual keyboard
        highlightKey(keyCode, true);
        
        // Update display
        updateKeyDisplay(event);
        
        // Update key combination display
        updateKeyCombinationDisplay();
    }
    
    /**
     * Handle keyup events
     * @param {KeyboardEvent} event - The keyboard event
     */
    function handleKeyUp(event) {
        const keyCode = event.code;
        pressedKeys.delete(keyCode);
        
        // Remove highlight from the key on virtual keyboard
        highlightKey(keyCode, false);
        
        // Update key combination display
        updateKeyCombinationDisplay();
    }
    
    /**
     * Highlight or unhighlight a key on the virtual keyboard
     * @param {string} keyCode - The key code to highlight
     * @param {boolean} isActive - Whether to activate or deactivate the highlight
     */
    function highlightKey(keyCode, isActive) {
        const keyElement = document.querySelector(`.key[data-key="${keyCode}"]`);
        if (keyElement) {
            if (isActive) {
                keyElement.classList.add('active');
            } else {
                keyElement.classList.remove('active');
            }
        }
    }
    
    /**
     * Update the display showing the last pressed key
     * @param {KeyboardEvent} event - The keyboard event
     */
    function updateKeyDisplay(event) {
        let displayText = event.key;
        
        // Handle special keys
        if (event.key === ' ') {
            displayText = 'Space';
        } else if (event.key.length > 1) {
            displayText = event.code.replace(/^(Key|Digit|Arrow)/, '');
        }
        
        lastKeyElement.textContent = displayText;
    }
    
    /**
     * Update the display showing the current key combination
     */
    function updateKeyCombinationDisplay() {
        if (pressedKeys.size === 0) {
            keyCombinationElement.textContent = 'None';
            return;
        }
        
        const combination = Array.from(pressedKeys)
            .map(code => {
                // Clean up the code for display
                return code.replace(/^(Key|Digit|Arrow|Left|Right)/, '')
                          .replace(/([a-z])([A-Z])/g, '$1 $2');
            })
            .join(' + ');
        
        keyCombinationElement.textContent = combination;
    }
    
    /**
     * Update key press statistics
     * @param {string} keyCode - The key code that was pressed
     */
    function updateKeyStats(keyCode) {
        // Clean up the key name for display
        const keyName = keyCode.replace(/^(Key|Digit|Arrow)/, '')
                              .replace(/([a-z])([A-Z])/g, '$1 $2');
        
        // Update statistics
        keyStats[keyName] = (keyStats[keyName] || 0) + 1;
        
        // Update statistics display
        updateStatsDisplay();
    }
    
    /**
     * Update the statistics display
     */
    function updateStatsDisplay() {
        // Convert stats to array and sort by count
        const statsArray = Object.entries(keyStats)
            .sort((a, b) => b[1] - a[1]);
        
        // Clear current display
        keyStatsElement.innerHTML = '';
        
        // Add updated stats
        statsArray.forEach(([key, count]) => {
            const statItem = document.createElement('div');
            statItem.className = 'stat-item';
            statItem.textContent = `${key}: ${count}`;
            keyStatsElement.appendChild(statItem);
        });
    }
    
    /**
     * Toggle between light and dark theme
     */
    function toggleTheme() {
        const body = document.body;
        const currentTheme = localStorage.getItem('theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.classList.remove(`${currentTheme}-theme`);
        body.classList.add(`${newTheme}-theme`);
        localStorage.setItem('theme', newTheme);
    }
    
    /**
     * Simulate a key press (for virtual keyboard clicks)
     * @param {string} keyValue - The key value to simulate
     */
    function simulateKeyPress(keyValue) {
        // Update key stats
        updateKeyStats(keyValue);
        
        // Update last key display
        lastKeyElement.textContent = keyValue === ' ' ? 'Space' : keyValue;
        
        // Create and dispatch a keyboard event
        const event = new KeyboardEvent('keydown', {
            code: keyValue,
            key: keyValue === ' ' ? ' ' : keyValue.toLowerCase()
        });
        
        document.dispatchEvent(event);
        
        // Remove the highlight after a short delay
        setTimeout(() => {
            const event = new KeyboardEvent('keyup', {
                code: keyValue,
                key: keyValue === ' ' ? ' ' : keyValue.toLowerCase()
            });
            document.dispatchEvent(event);
        }, 200);
    }
    
    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme');
    document.body.classList.add(`${savedTheme}-theme`);
});