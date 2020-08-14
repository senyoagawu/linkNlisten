from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.sql import func

db = SQLAlchemy()
# # i'll think about updated_at later, probs don't ever need it.


class MixinAsDict:
    def as_dict(self, skip=['hashed_password','id']):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns if c.name not in skip}


class Chat(MixinAsDict, db.Model):
    __tablename__ = 'chats'

    id = db.Column(db.Integer, primary_key=True)
    authors_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipients_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now(), nullable=False)

    # author = db.relationship('User', backref='chats')
    # recipient = db.relationship('User', backref='chats')
    # messages = db.relationship('Message', backref='chat')


class Post(MixinAsDict, db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    authors_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    walls_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    body = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now(), nullable=False)

    # comments = db.relationship('Comment', backref='post')
    # author = db.relationship('User', backref='posts')
    # recipient = db.relationship('User')




class User(MixinAsDict, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(60), nullable=False)
    last_name = db.Column(db.String(60))
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(128), nullable=False)
    bio = db.Column(db.Text)
    profile_pic = db.Column(db.String, default="https://i.imgur.com/kfQKjwm.png")
    location = db.Column(db.String)

    def name(self):
        return f'{self.first_name} {self.last_name}'

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
        return cls.query.filter(cls.email == email).one()

    chats = db.relationship('Chat', backref='user', foreign_keys='[Chat.authors_id]')
    messages = db.relationship('Message', backref='user', foreign_keys='[Message.authors_id]')


friendship = db.Table(
    'friendships',
    db.Model.metadata,
    db.Column('requester_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('accepter_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('status_accepted', db.Boolean, default=False, nullable=False),
    db.Column('created_at', db.DateTime(timezone=True), default=func.now(), nullable=False)
)


interest_user = db.Table(
    'interests_users',
    db.Model.metadata,
    db.Column('users_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('interests_id', db.Integer, db.ForeignKey('interests.id')),
    db.Column('created_at', db.DateTime(timezone=True), default=func.now(), nullable=False)
)


class Message(MixinAsDict, db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text, nullable=False)
    chats_id = db.Column(db.Integer, db.ForeignKey('chats.id'), nullable=False)
    recipients_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False) # maybe unnecessary
    # without it we would have secondary relationship. might be annoyting to send recipient_id along from front end
    authors_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now(), nullable=False)

    chat = db.relationship('Chat', backref='messages')
    author = db.relationship('User', back_populates='messages', foreign_keys=[authors_id])
    recipient = db.relationship('User',back_populates='messages', foreign_keys=[recipients_id])

   


class Comment(MixinAsDict, db.Model):
    __tablename__ = 'comments'
     
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(), nullable=False)
    posts_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)  # posts, images, other media 
    authors_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now(), nullable=False)

    post = db.relationship('Post', backref='comments')
    author = db.relationship('User', backref='comments')


class Interest(MixinAsDict, db.Model):
    # channels
    __tablename__ = 'interests'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now(), nullable=False)
    # author_id = db.Column(db.Integer)
    users = db.relationship('User', secondary=interest_user, backref='interests')


class Like(MixinAsDict, db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    # type_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    authors_id = db.Column(db.Integer, db.ForeignKey('users.id')) #? does user_id make more sense:?
    posts_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    comments_id = db.Column(db.Integer, db.ForeignKey('comments.id'))
    reference = db.Column(db.String(15), nullable=False)  # ['post', 'comments',...]
    like_type = db.Column(db.Integer, nullable=False)  # like(1), hate(2), love etc...
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now(), nullable=False)

    author = db.relationship('User', backref='likes')
    post = db.relationship('User', backref='like')  #? is this a weird one way 1-many!
    comment = db.relationship('Comment', backref='like')

