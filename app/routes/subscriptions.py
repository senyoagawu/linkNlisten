from flask import Blueprint, request, jsonify
from app.models import db, Interest, User

bp = Blueprint("subscriptions", __name__, url_prefix='/api/subscriptions')

@bp.route('/add/<int:userId>/<int:interestId>', methods=['Post'], strict_slashes=False)  # fetch all interests
def subscribe(userId, interestId):
    user = User.query.get(userId)
    interest = Interest.query.get(interestId)
    subscriptions = user.subscriptions
    try:

        if interest not in subscriptions:

            subscriptions.append(interest)
            db.session.commit()

            return {"message": "successfully subscribed to " + interest.name}
    except:
        return {"message": "something went wrong"}
    # interests = [{'name': i.name, 'id': i.id} for i in Interest.query.all()]

@bp.route('/remove/<int:userId>/<int:interestId>', methods=['Delete'], strict_slashes=False)  # fetch all interests
def unsubscribe(userId, interestId):
    user = User.query.get(userId)
    interest = Interest.query.get(interestId)
    subscriptions = user.subscriptions
    try:

        if interest in subscriptions:

            subscriptions.remove(interest)
            db.session.commit()
            return {"message": "successfully unsubscribed to " + interest.name}

    except:
        return {"message": "something went wrong"}

@bp.route('/<int:userId>/', methods= ['Delete'], strict_slashes=False)
def get_subscriptions(userId):
    user = User.query.get(userId)
    return {"subscriptions":[i.to_dict() for i in user.subscriptions]}