from flask import Blueprint, request, jsonify
from app.models import db, Post, User

# from ..auth import require_auth_jobseeker, require_auth_company

bp = Blueprint("posts", __name__, url_prefix="/api/posts")


@bp.route("/<string:email>/")
def fetch_posts_with_follows(email):
    """
    fetches all the posts of users in the same
    intereests as the current_user
    orders entrys created_at timestamp
    returns an array of post objs that contain the necessary user info
    """
    user = User.find_by_email(email)

    subscribers = [i.subscribers for i in user.subscriptions]
    subscribers_ids = [s.id for sub in subscribers for s in sub]  # flatten
    unique_ids = list(set(subscribers_ids))
    unique_ids.append(user.id)
    posts = (
        db.session.query(Post, User)
        .join(User)
        .filter(Post.authors_id.in_(unique_ids))
        .order_by(Post.created_at.desc())
        .all()
    )
    res = [{**p.as_dict(), **{"author": u.as_dict()}} for p, u in posts]
    return {"posts": res}


@bp.route("/interest-feed/<string:email>/")
def fetch_interest_feed_posts(email):
    """
    fetches the posts ordered by created_at limited by 15
    for all subscribed interests
    """
    current_user = User.find_by_email(email)
    interest_ids = [i.id for i in current_user.subscriptions]
    posts = (
        Post.query.filter(Post.interests_id.in_(interest_ids))
        .order_by(Post.created_at.desc())
        .limit(15)
        .all()
    )
    return {"posts": [p.to_dict() for p in posts]}


@bp.route("/individual/<string:email>/")
def fetch_users_posts(email):
    """
    fetch posts made by user
    """
    user = User.find_by_email(email)

    individual_posts = Post.query.filter(Post.authors_id == user.id).all()
    res = [i.as_dict() for i in individual_posts]

    return {"individual_posts": res}


@bp.route("/", methods=["POST"], strict_slashes=False)  # add new post
def add_post():
    data = request.json
    print(f"\n\n\nDATA\n{data}\n\n\n")
    authorsId = data["authorsId"]
    #todo 404 error


    post = Post(
        body=data["body"], authors_id=data["authorsId"], created_at="now", updated_at="now"
    )
    db.session.add(post)
    db.session.commit()
    #   fetch_posts_with_follows(email)

    return {"posts": post.to_dict()}

@bp.route("/<int:postId>", methods=["PUT"], strict_slashes=False)  # add new post
def edit_post(postId):
    data = request.json
    print(f"\n\n\nDATA\n{data}\n\n\n")

    post = Post.query.get(postId)
    post.body = data["body"]
    post.authors_id=data["authorsId"]
    post.updated_at="now"

    db.session.commit()
    # fetch_posts_with_follows(email)

    return {"post": post.to_dict()}


@bp.route("/<int:postId>/<int:authorsId>", methods=["DELETE"], strict_slashes=False)  # add new post
def delete_post(postId, authorsId):
    data = request.json
    print(f"\n\n\nDATA\n{data}\n\n\n")

    post = Post.query.get(postId)
    if post.authors_id == authorsId:
        db.session.delete(post)
        db.session.commit()
        return {"success": True, "message": "post deleted"}
    return {"success": False, "message": "you are not authorized to delete this post"}

@bp.route("/<int:postId>", strict_slashes=False)  # add new post
def get_post(postId):
    data = request.json
    print(f"\n\n\nDATA\n{data}\n\n\n")

    post = Post.query.get(postId)
    return {"post": post.to_dict()}
