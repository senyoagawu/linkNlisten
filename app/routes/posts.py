from flask import Blueprint, request, jsonify
from app.models import db, Post, User
# from ..auth import require_auth_jobseeker, require_auth_company

bp = Blueprint("posts", __name__, url_prefix='/api/posts')


@bp.route('/<string:email>/')
def fetch_posts_with_follows(email):
    """
    fetches all the posts of users in the same
    intereests as the current_user
    orders entrys created_at timestamp
    returns an array of post objs that contain the necessary user info
    """
    user = User.find_by_email(email)

    subscribers = [i.subscribers for i in user.interests]
    subscribers_ids = [s.id for sub in subscribers for s in sub]  # flatten 
    unique_ids = list(set(subscribers_ids))
    unique_ids.append(user.id)
    posts = db.session.query(Post, User).join(User)\
        .filter(Post.authors_id.in_(unique_ids))\
        .order_by(Post.created_at.desc()).all()
    res = [{**p.as_dict(), **{'author': u.as_dict()}} for p, u in posts]
    return {"posts": res}


@bp.route('/individual/<string:email>/')
def fetch_users_posts(email):
    """
    fetch posts made by user
    """
    user = User.find_by_email(email)

    individual_posts = Post.query.filter(Post.authors_id == user.id ).all()
    res = [i.as_dict() for i in individual_posts]

    return {"individual_posts": res}

@bp.route('/', methods=["POST"], strict_slashes=False)  # add new post
def add_post():
    data = request.json
    print(f"\n\n\nDATA\n{data}\n\n\n")
    email = data['email']
    userId = User.find_by_email(email).id

    post = Post(
        body=data['message'],
        authors_id=userId,
        created_at='now',
        updated_at='now'
    )
    db.session.add(post)
    db.session.commit()

    return post.as_dict()
