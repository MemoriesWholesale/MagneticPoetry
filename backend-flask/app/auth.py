from flask import g
from flask_httpauth import HTTPBasicAuth,HTTPTokenAuth
from app import db
from .models import User

basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()

@basic_auth.verify_password
def verify_password(username,password):
    user = db.session.execute(db.select(User).where(User.username==username)).scalar_one_or_none()
    if user is None:
        return False
    g.current_user = user
    return user.check_password(password)

@token_auth.verify_token
def verify_token(token):
    user = User.check_token(token) if token else None
    g.current_user = user
    return g.current_user or None