from flask import Blueprint, request, jsonify
from app.models import db, Interest, User
# from ..auth import require_auth_jobseeker, require_auth_company

bp = Blueprint("interests", __name__, url_prefix='/api/interests')

@bp.route('/')  # fetch all interests
def fetch_interests():
    interests = [{'name': i.name, 'id': i.id} for i in Interest.query.all()]
    return {'interests': interests}

@bp.route('/<string:email>/')  # fetch all interests, with user follows data
def fetch_interests_with_follows(email):
    # int_joins = [ij for ij in Intr]
    data = request.json
    user_interests = [i.id for i in User.find_by_email(email).interests]
    # print(user_interests, 11 in user_interests)
    interests = {i.id: [i.name, i.id in user_interests] for i in Interest.query.all()}
    return {'interests': interests}

@bp.route('/', methods=["POST"], strict_slashes=False)  # add new interest
def add_interest():
    data = request.json
    print(f"\n\n\nDATA\n{data}\n\n\n")
    interest = Interest(name=data['name'], created_at='now', updated_at='now')
    db.session.add(interest)
    db.session.commit()

    return interest.as_dict()
