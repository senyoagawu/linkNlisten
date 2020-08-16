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
    user = User.find_by_email(email)
    data = request.json
    followed_interests = [i for i in user.interests]
    created_interests = [i for i in user.created_interests]
    # print(user_interests, 11 in user_interests)
    followed_interests_ids = [fi.id for fi in followed_interests]
    interests = {
        i.id: [i.name, i.id in followed_interests_ids] for i in Interest.query.all()
            
        }

    return {
        'interests': {
            "all_interests": interests,
            "followed": [i.as_dict() for i in followed_interests],
            "created": [i.as_dict() for i in created_interests]
        }
    }

@bp.route('/', methods=["POST"], strict_slashes=False)  # add new interest
def add_interest():
    data = request.json
    print(f"\n\n\nDATA\n{data}\n\n\n")
    interest = Interest(name=data['name'], created_at='now', updated_at='now')
    db.session.add(interest)
    db.session.commit()

    return interest.as_dict()
