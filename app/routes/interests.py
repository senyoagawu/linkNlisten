from flask import Blueprint, request, jsonify
from app.models import db, Interest
# from ..auth import require_auth_jobseeker, require_auth_company

bp = Blueprint("interests", __name__, url_prefix='/api/interests')

@bp.route('/')  # fetch all interests
def fetch_interests():
    interests = [i.name for i in Interest.query.all()]
    return {'interests': interests}

