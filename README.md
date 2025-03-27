# Virtual Keyboard Web Application

A web-based virtual keyboard application that visually highlights keys pressed on your physical keyboard in real-time. Built with Python Flask for the backend and HTML/CSS/JavaScript for the frontend.

## :dart: Features

- Real-time Key Highlighting: See which keys you press on your physical keyboard highlighted on the virtual keyboard
- Key Combination Detection: Shows combinations like Ctrl+C, Shift+Alt, etc.
- Key Press Statistics: Tracks and displays your most frequently pressed keys
- Dual Theme Support: Switch between light and dark themes
- Responsive Design: Works on desktop and mobile devices
- Interactive Virtual Keyboard: Click keys on the virtual keyboard to simulate key presses
- Secure Implementation: Includes security headers, rate limiting, and CSRF protection

## :hammer_and_wrench: Installation

1. Clone the repository:

```bash
git clone https://github.com/thealper2/virtual-keyboard.git
cd virtual-keyboard
```

2. Create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

### Running the Application

Start the development server:

```bash
python app.py
```

Then open your browser to:

```bash
http://localhost:5000
```

## :joystick: Usage Instructions

1.Physical Keyboard Interaction:
  - Press any key on your physical keyboard to see it highlighted on the virtual keyboard
  - The last pressed key appears at the top of the screen
  - Key combinations are displayed when multiple keys are pressed simultaneously
2. Virtual Keyboard Interaction:
  - Click any key on the virtual keyboard to simulate a key press
  - The key will be highlighted and registered in the statistics
3. Theme Switching:
  - Click the "Toggle Theme" button to switch between light and dark modes
  - Your preference is saved in your browser's local storage
4. Viewing Statistics:
  - The statistics section shows your most frequently pressed keys
  - Statistics update in real-time as you type

## :handshake: Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch for your feature (git checkout -b feature/your-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin feature/your-feature)
5. Create a new Pull Request

## :scroll: License

This project is licensed under the MIT License - see the LICENSE file for details.