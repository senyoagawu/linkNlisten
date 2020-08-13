from dotenv import load_dotenv
from werkzeug.security import generate_password_hash
from faker import Faker
from random import choices, seed
from app import app, db
from app.models import Chat, User, friendship, interest_user, Message, Interest, Like

load_dotenv()
fake = Faker()
interests = ['Arts & Culture', 'Book Clubs', 'Career & Business', 'Cars & Motorcycles', 'Community & Environment', 'Dancing', 'Education & Learning', 'Fashion & Beauty', 'Fitness', 'Food & Drink', 'Games', 'Health & Wellbeing', 'Hobbies & Crafts', 'LGBT', 'Language & Ethnic Identity', 'Lifestyle', 'Movements & Politics', 'Movies & Film', 'Music', 'New Age & Spirituality', 'Outdoors & Adventure', 'Paranormal', 'Parents & Family', 'Pets & Animals', 'Photography', 'Religion & Beliefs', 'Sci-Fi & Fantasy', 'Singles', 'Socializing', 'Sports & Recreation', 'Support', 'Tech', 'Writing']


with app.app_context():
    db.drop_all()
    db.create_all()

    demouser = User(first_name='demo',last_name='user', email='demo@gmail.com', hashed_password=generate_password_hash('password'), bio='stuff about stuff', location='location')
    db.session.add(demouser)
    db.session.commit()
    for i in interests:
        db.session.add(Interest(name=i, created_at='now', updated_at='now'))

        db.session.commit()
        
    for i in range(50):
            u = User(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.email(),
                password='password',
                )
            db.session.add(u)
            db.session.commit()

