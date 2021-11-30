# from flask import Blueprint, request, jsonify
# from app.models import db, Interest, User
# # from ..auth import require_auth_jobseeker, require_auth_company

# bp = Blueprint("interests_users", __name__, url_prefix='/api/interests_users')

# # @bp.route('/<string:email>/<int:intId>', methods=['Post'], strict_slashes=False)  # fetch all interests
# # def add_interest(email, intId):
# #     userId = User.find_by_email(email).id
# #     j = InterestUser.query.filter(InterestUser.interests_id == intId).filter(InterestUser.users_id == userId).first()
# #     if bool(j): return {'alreadyAdded': True, 'isAdded': False}
# #     joins = InterestUser(users_id=userId, interests_id=intId, created_at='now', updated_at='now')
# #     db.session.add(joins)
# #     db.session.commit()
# #     # interests = [{'name': i.name, 'id': i.id} for i in Interest.query.all()]
# #     return {'isAdded': True, 'alreadyAdded': False}

# @bp.route('/<string:email>/<int:intId>', methods=['Delete'], strict_slashes=False)  # fetch all interests
# def delete_interest(email, intId):
#     userId = User.find_by_email(email).id
#     j = InterestUser.query.filter(InterestUser.interests_id == intId).filter(InterestUser.users_id == userId).delete()
#     db.session.commit()
#     return {'# records deleted': j}
