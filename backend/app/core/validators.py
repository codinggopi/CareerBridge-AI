import re

def validate_strong_password(password: str, name: str = "", email: str = "") -> str:
    """
    Validates the password strength based on CareerBridge AI requirements.
    Raises ValueError with a specific message if validation fails.
    Returns the password if it's valid.
    """
    if len(password) < 8:
        raise ValueError("Password must be at least 8 characters long.")
    
    if len(password) > 32:
        raise ValueError("Password must be no more than 32 characters.")

    if not re.search(r'[A-Z]', password):
        raise ValueError("Password must contain at least one uppercase letter.")

    if not re.search(r'[a-z]', password):
        raise ValueError("Password must contain at least one lowercase letter.")

    if not re.search(r'[0-9]', password):
        raise ValueError("Password must contain at least one number.")

    if not re.search(r'[!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/?~]', password):
        raise ValueError("Password must contain at least one special character.")

    if re.search(r'\s', password):
        raise ValueError("Password must not contain spaces.")

    password_lower = password.lower()
    
    if name and name.lower() in password_lower:
        raise ValueError("Password must not contain your name.")
        
    if email and email.split('@')[0].lower() in password_lower:
        raise ValueError("Password must not contain your email prefix.")

    common_passwords = ['password', '12345678', 'qwerty123', 'admin123', 'careerbridge']
    if password_lower in common_passwords:
        raise ValueError("Password is a commonly used weak password.")

    return password
