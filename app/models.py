from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.sql import func

db = SQLAlchemy()
# # i'll think about updated_at later, probs don't ever need it.


class MixinAsDict:
    """pass in array of column names you want to skip"""

    def as_dict(
        self,
        skip=[
            "hashed_password",
        ],
    ):
        return {
            c.name: getattr(self, c.name)
            for c in self.__table__.columns
            if c.name not in skip
        }


class User(MixinAsDict, db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(60), nullable=False)
    last_name = db.Column(db.String(60))
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(128), nullable=False)
    bio = db.Column(db.Text)
    profile_pic = db.Column(db.String, default="https://i.imgur.com/kfQKjwm.png")
    location = db.Column(db.String)

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.hashed_password, password)

    def is_valid_email(self, email):
        return not re.match("[^@]+@[^@]+\.[^@]+", email)

    @classmethod
    def find_by_email(cls, email):
        print("\n\n\n\n\n\n", email, cls, "\n\n\n\n\n")
        return cls.query.filter(cls.email == email).one()

    interests = db.relationship(
        "Interest", secondary="interests_users", back_populates="subscribers"
    )
    posts = db.relationship("Post", back_populates="author")
    reactions = db.relationship("Reaction", back_populates="author")
    created_interests = db.relationship("Interest", back_populates="creator")

    def short_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "bio": self.bio,
            "profile_pic": self.profile_pic,
            "location": self.location,
        }


class InterestUser(MixinAsDict, db.Model):
    __tablename__ = "interests_users"
    id = db.Column(db.Integer, primary_key=True)
    users_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    interests_id = db.Column(db.Integer, db.ForeignKey("interests.id"), nullable=False)
    created_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at = db.Column(
        db.DateTime(timezone=True), onupdate=func.now(), nullable=False
    )


class Interest(MixinAsDict, db.Model):  # channels
    __tablename__ = "interests"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), nullable=False)

    created_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at = db.Column(
        db.DateTime(timezone=True), onupdate=func.now(), nullable=False
    )
    creators_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    subscribers = db.relationship(
        "User", secondary="interests_users", back_populates="interests"
    )
    creator = db.relationship("User", back_populates="created_interests")
    posts = db.relationship("Post", back_populates="interest")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "created_at": self.created_at,
            "subscribers": [s.short_dict() for s in self.subscribers],
            "posts": [p.as_dict() for p in self.posts],
        }


# posts to an interest group
class Post(MixinAsDict, db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    authors_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    interests_id = db.Column(db.ForeignKey("interests.id"))
    body = db.Column(db.String(255), nullable=False)
    created_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at = db.Column(
        db.DateTime(timezone=True), onupdate=func.now(), nullable=False
    )

    # comments = db.relationship('Comment', back_populates='post')
    author = db.relationship("User", back_populates="posts")
    reactions = db.relationship("Reaction", back_populates="post")
    interest = db.relationship("Interest", back_populates="posts")
    # recipient = db.relationship('User')

    def to_dict(self):
        return {
            "id": self.id,
            "body": self.body,
            "author": self.author.as_dict(),
            "created_at": self.created_at,
            "interest": self.interest.as_dict(),
            # "reactions": [r.as_dict() for r in self.reactions]
        }
        self.as_dict(skip=["authors_id", "created_at", "updated_at"])


# class Comment(MixinAsDict, db.Model):
#     __tablename__ = 'comments'

#     id = db.Column(db.Integer, primary_key=True)
#     body = db.Column(db.String(), nullable=False)
#     posts_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)  # posts, images, other media
#     authors_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
#     updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now(), nullable=False)

#     post = db.relationship('Post', back_populates='comments')
#     author = db.relationship('User', back_populates='comments')


class Reaction(MixinAsDict, db.Model):
    __tablename__ = "reactions"

    id = db.Column(db.Integer, primary_key=True)
    # type_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

    authors_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    posts_id = db.Column(db.Integer, db.ForeignKey("posts.id"))
    # comments_id = db.Column(db.Integer, db.ForeignKey('comments.id'))  # add these if you want commends to also be reactiond
    # reference = db.Column(db.String(15), nullable=False)  # ['post', 'comments',...]
    reaction_type = db.Column(
        db.Integer, nullable=False
    )  # reaction(1), hate(2), love etc...
    created_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at = db.Column(
        db.DateTime(timezone=True), onupdate=func.now(), nullable=False
    )

    author = db.relationship("User", back_populates="reactions")
    post = db.relationship("Post", back_populates="reactions")

    # comment = db.relationship('Comment', back_populates='reaction')


# class Chat(MixinAsDict, db.Model):
#     __tablename__ = 'chats'

#     id = db.Column(db.Integer, primary_key=True)
#     authors_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     recipients_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
#     updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now(), nullable=False)

#     # author = db.relationship('User', back_populates='chats')
#     # recipient = db.relationship('User', back_populates='chats')
#     # messages = db.relationship('Message', back_populates='chat')


# friendship = db.Table(
#     'friendships',
#     db.Model.metadata,
#     db.Column('requester_id', db.Integer, db.ForeignKey('users.id')),
#     db.Column('accepter_id', db.Integer, db.ForeignKey('users.id')),
#     db.Column('status_accepted', db.Boolean, default=False, nullable=False),
#     db.Column('created_at', db.DateTime(timezone=True), default=func.now(), nullable=False)
# )


# class Friendship(MixinAsDict, db.Model):
#     __tablename__ = 'friendships'
#     id = db.Column(db.Integer, primary_key=True)
#     requesters_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     accepters_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     status_accepted = db.Column(db.Boolean, default=False, nullable=False)
#     created_at = dbp.Column(db.DateTime(timezone=True), onupdate=func.now(), nullable=False)


# class Message(MixinAsDict, db.Model):
#     __tablename__ = 'messages'

#     id = db.Column(db.Integer, primary_key=True)
#     body = db.Column(db.Text, nullable=False)
#     chats_id = db.Column(db.Integer, db.ForeignKey('chats.id'), nullable=False)
#     recipients_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False) # maybe unnecessary
#     # without it we would have secondary relationship. might be annoyting to send recipient_id along from front end
#     authors_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
#     updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now(), nullable=False)

#     chat = db.relationship('Chat', back_populates='messages')
#     author = db.relationship('User', back_populates='messages', foreign_keys=[authors_id])

#     # recipient = db.relationship('User', foreign_keys=[recipients_id])
