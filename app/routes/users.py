from flask import Blueprint, request, jsonify
from app.models import db, User

bp = Blueprint("users", __name__, url_prefix='/api/users')

@bp.route('/')  # fetch all users
def fetch_users():
    users = [u.as_dict() for u in User.query.all()]
    return {'users': users}

@bp.route('/<string:email>')  # fetch a single user
def fetch_user(email):
    # db.session(User, )
    user = User.find_by_email(email).as_dict()
    return {'user': user}

@bp.route('/<string:email>')  # fetch friends of a single user
def fetch_users_friends(email):
    # db.session(User, )
    user = [f.as_dict() for f in User.find_by_email(email).one().friends]
    return {'user': user}

 
@bp.route('<string:email>', methods=['PUT'])  # edit a single user
def edit_user(email):
    data = request.json
    user = User.find_by_email(email)
    try:
        user.first_name = data['first_name'],
        user.last_name = data['last_name'],
        user.bio = data['bio'],
        user.email = data['email'],
        user.location = data['location'],
        db.session.commit()
        return {'user': user.as_dict()}
    except AssertionError as message:
        print(str(message))
        return jsonify({"error": str(message)}), 400
 
@bp.route('<string:email>', methods=['DELETE'])  # fetch a single jobseeker
def delete_user(email):
    data = request.json
    user = User.find_by_email(email)
    db.session.delete(user)
    db.session.commit()
    return f'record with email {user.email} successfully deleted'