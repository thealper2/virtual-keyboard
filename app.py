"""
Virtual Keyboard Flask Application

This application provides a web interface with a virtual keyboard that highlights
keys pressed on the physical keyboard in real-time.
"""

from flask import Flask, render_template, jsonify
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_talisman import Talisman
import logging

# Initialize Flask application
app = Flask(__name__)

# Security headers and rate limiting
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

# Configure Talisman for security headers
Talisman(
    app,
    force_https=True,
    strict_transport_security=True,
    session_cookie_secure=True,
    content_security_policy={
        'default-src': "'self'",
        'script-src': ["'self'", "'unsafe-inline'"],
        'style-src': ["'self'", "'unsafe-inline'"],
        'img-src': "'self'"
    }
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/')
@limiter.limit("10 per minute")
def index():
    """
    Render the main page with the virtual keyboard.
    
    Returns:
        Rendered HTML template for the index page.
    """
    try:
        return render_template('index.html')
    except Exception as e:
        logger.error(f"Error rendering index page: {str(e)}")
        return render_template('error.html'), 500

@app.errorhandler(404)
def page_not_found(e):
    """
    Handle 404 errors.
    
    Args:
        e: The error object.
    
    Returns:
        Rendered 404 error page with 404 status code.
    """
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_server_error(e):
    """
    Handle 500 errors.
    
    Args:
        e: The error object.
    
    Returns:
        Rendered 500 error page with 500 status code.
    """
    return render_template('500.html'), 500

if __name__ == '__main__':
    app.run(debug=True)