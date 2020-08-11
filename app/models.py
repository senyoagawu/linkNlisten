from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash


db = SQLAlchemy()


class MixinAsDict:
    def as_dict(self, skip=[]):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns if c.name not in skip}

class Chat(MixinAsDict, db.Model):
    __table__ = 'chats'

    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Colummn(db.Integer, db.ForeignKey('user.id'), nullable=false)
    recipient_id = db.Colummn(db.Integer, db.ForeignKey('user.id'), nullable=false)

    author = db.relationship('User', back_populates='chats')
    recipient = db.relationship('User', back_populates='chats')
    messages = db.relationship('Message', back_populates='chat')

class Comment(MixinAsDict, db.Model):
    __tablename__ = 'comments'
     
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(20), nullable=False)  # posts, images, other media 
    body = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    post = db.relationship('Post', back_populates='comments')


friendship = db.Table(
    'friendships',
    db.Model.metadata,
    db.Column('users.id', db.Integer, db.ForeignKey('users.id')),
    db.Column('users.id', db.Integer, db.ForeignKey('users.id'))
)


class LikePost(MixinAsDict, db.Model):
    __tablename__ = 'like_posts'

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    type = db.Column(db.Integer, nullable=False)  #like, hate, love etc...
    



class LikeComment(MixinAsDict, db.Model):
    __tablename__ = 'like_comments'

    id = db.Column(db.Integer, primary_key=True)
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    type = db.Column(db.Integer, nullable=False)  #like, hate, love etc...




class Message(MixinAsDict, db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text, nullable=False)
    chats_id = db.Column(db.Integer, db.ForeignKey('chats.id'), nullable=False)
    recipient_id = db.Column(db.Integer, nullable=False)
    author_id = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    chat = db.relationship('Chat', back_populates='messages')
    author = db.relationship('User' back_populate='messages')
    recipient = 

class Post(MixinAsDict, db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, nullable=False)
    wall_id = db.Column(db.Integer, nullable=False)
    body = db.String(255, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    comments = db.relationship('Comment', back_populates='post')
    author = db.relationship('User', back_populates='posts')
    # recipient = db.relationship('User')



class User(MixinAsDict, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(60), nullable=False)
    last_name = db.Column(db.String(60), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(128), nullable=False)
    bio = db.Column(db.Text)
    profile_pic = db.Column(db.String, default="https://i.imgur.com/kfQKjwm.png")
    title = db.Column(db.String)
    location = db.Column(db.String)

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


class Interest(MixinAsDict, db.Model):
    __tablename__ = 'interests'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), nullable=False)

    users = db.relationship('User', back_populates='interests')

    