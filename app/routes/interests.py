from flask import Blueprint, request, jsonify
from app.models import db, Interest, User
from app.auth import require_auth


bp = Blueprint("interests", __name__, url_prefix="/api/interests")


@bp.route("/")  # fetch all interests
# @require_auth
def fetch_interests():
    interests = [i.to_dict() for i in Interest.query.all()]
    return {"interests": interests}

@bp.route('/<int:interest_id>')
# @require_auth
def fetch_interest(interest_id):
    interest = Interest.query.get_or_404(interest_id)
    return {"interest": interest.to_dict()}

@bp.route("/subscriptions/<string:email>/")  # fetch subscriped interests
def fetch_subscribed_interests(email):
    # TODO
    current_user = User.find_by_email(email)

    subscribed_interests = current_user.subscriptions

    return {
        "subscriptionIds": [i.id for i in subscribed_interests],
        "subscribedInterests": [i.to_dict() for i in subscribed_interests],
    }


@bp.route("/<string:email>/")  # fetch all interests, with user follows data
def fetch_interests_with_follows(email):
    # int_joins = [ij for ij in Intr]
    user = User.find_by_email(email)
    data = request.json
    followed_interests = [i for i in user.subscriptions]
    created_interests = [i for i in user.created_interests]
    # print(user_interests, 11 in user_interests)
    followed_interests_ids = [fi.id for fi in followed_interests]
    interests = {
        i.id: [i.name, i.id in followed_interests_ids] for i in Interest.query.all()
    }

    return {
        "interests": {
            "all_interests": interests,
            "followed": [i.to_dict() for i in followed_interests],
            "created": [i.to_dict() for i in created_interests],
        }
    }


@bp.route("/", methods=["POST"], strict_slashes=False)  # add new interest
def add_interest():
    # data = request.json
    data = request.get_json(force=True)
    print(f"\n\n\nDATA\n{data}\n\n\n")

    creator_id = data["creatorsId"]
    interest = Interest(
        name=data["name"],
        created_at="now",
        updated_at="now",
        creators_id=creator_id,
    )
    db.session.add(interest)
    db.session.commit()
    # automatically subscribe to created group
    user = User.query.get(creator_id)
    old_interests = user.subscriptions
    old_interests.append(interest)
    user.subscriptions.append(interest)
    db.session.commit()
    return interest.as_dict()
