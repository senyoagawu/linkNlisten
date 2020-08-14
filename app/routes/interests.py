from flask import Blueprint, request, jsonify
from app.models import db, Interest
# from ..auth import require_auth_jobseeker, require_auth_company

bp = Blueprint("interests", __name__, url_prefix='/api/interests')

@bp.route('/')  # fetch all interests
def fetch_interests():
    interests = [{'name': i.name, 'id':i.id} for i in Interest.query.all()]
    return {'interests': interests}

@bp.route('/', methods=["POST"], strict_slashes=False)  # add new interest
def add_interest():
    data = request.json
    print(f"\n\n\nDATA\n{data}\n\n\n")
    interest = Interest(name=data['name'], created_at='now', updated_at='now')
    db.session.add(interest)
    db.session.commit()

    return interest.as_dict()
