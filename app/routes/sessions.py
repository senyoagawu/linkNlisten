from flask import Blueprint, request, jsonify
import jwt
import json
from flask_cors import cross_origin
from werkzeug.security import generate_password_hash
from app.models import db, User
from flask import Response
import jwt  
from ..config import Configuration
# from ..auth import require_auth

bp = Blueprint("sessions", __name__, url_prefix='/api/sessions')

# login an existing user. generate jwt
@bp.route('/', methods=["POST"], strict_slashes=False)  
# @cross_origin()
def login():
    data = request.json
    # em = data.email
    print('=====', data)
    user = User.query.filter(User.email == data['email']).first() #? email or Username for login
    if not user:
        return {"error": "Email not found"}, 422
    print(data['password'], user.password, generate_password_hash(data['password']))
    if user.check_password(data['password']):
        access_token = jwt.encode({'email': user.email}, Configuration.SECRET_KEY)
        #TODO reduce to return necessary user info
        return {'access_token': access_token.decode('UTF-8'), 'user': user.as_dict()}  
    else:
        return {"error": "Incorrect password"}, 401

# create new account
@bp.route('/signup', methods=["POST"],strict_slashes=False) # create new account
# @cross_origin()
def signup():
    data = request.json
    print(f"\n\n\nDATA\n{data}\n\n\n")
    user = User(password=data['password'], email=data['email'], first_name=data['first_name'])
    db.session.add(user)
    db.session.commit()

    access_token = jwt.encode({'email': user.email}, Configuration.SECRET_KEY)
    return {'access_token': access_token.decode('UTF-8'), 'user': user.as_dict()}

# logout/delete session.
@bp.route('/', methods=["DELETE"]) # is this really a delete method?
# @require_auth
def logout():
    access_token = jwt.encode({'email': ''}, Configuration.SECRET_KEY)
    return {'access_token': access_token.decode('UTF-8'), 'user': ''}
