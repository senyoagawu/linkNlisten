from flask import Blueprint, request, jsonify
import json
from flask_cors import cross_origin
from werkzeug.security import generate_password_hash
from app.models import db, User
from flask import Response
from ..config import Configuration

from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    current_user,
    jwt_required,
)


# from ..auth import require_auth
# print("\n\n\n", "this is the jwt", jwt
# , "\n\n\n")
bp = Blueprint("sessions", __name__, url_prefix="/api/sessions")

# login an existing user. generate jwt
@bp.route("/", methods=["POST"], strict_slashes=False)
# @cross_origin()
# @jwt_required
def login():
    data = request.get_json(force=True)
    # print("\n\n\n\n\n", data, "\n\n\n\n")
    user = User.query.filter(
        User.email == data["email"]
    ).first()  # ? email or Username for login
    if not user:
        return {"error": "Email not found"}, 422
    # print(data["password"], user.password, generate_password_hash(data["password"]))
    if user.check_password(data["password"]):
        access_token = create_access_token(identity=user.email)
        # TODO reduce to return necessary user info
        return {"access_token": access_token, "user": user.as_dict()}
    else:
        return {"error": "Incorrect password"}, 401


# create new account
@bp.route("/signup", methods=["POST"], strict_slashes=False)  # create new account
# @cross_origin()
def signup():
    data = request.get_json(force=True)
    print(f"\n\n\nDATA\n{data}\n\n\n")
    user = User(
        password=data["password"], email=data["email"], first_name=data["first_name"]
    )
    db.session.add(user)
    db.session.commit()
    access_token = create_access_token(identity=user.email)
    # TODO reduce to return necessary user info
    return {"access_token": access_token, "user": user.as_dict()}
    # return {"access_token": access_token.decode("UTF-8"), "user": user.as_dict()}


# logout/delete session.
@bp.route("/", methods=["DELETE"])  # is this really a delete method?
# @require_auth
def logout():
    access_token = create_access_token(identity="")
    # TODO reduce to return necessary user info
    return {"msg": "successfully logged out", "access_token": access_token}
