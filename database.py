from dotenv import load_dotenv
from werkzeug.security import generate_password_hash
from faker import Faker
from random import choices, seed
from app import app, db
from app.models import User, Interest, Post

load_dotenv()
fake = Faker()
interests = [
    "Arts & Culture",
    "Book Clubs",
    "Career & Business",
    "Cars & Motorcycles",
    "Community & Environment",
    "Dancing",
    "Education & Learning",
    "Fashion & Beauty",
    "Fitness",
    "Food & Drink",
    "Games",
    "Health & Wellbeing",
    "Hobbies & Crafts",
    "LGBT",
    "Language & Ethnic Identity",
    "Lifestyle",
    "Movements & Politics",
    "Movies & Film",
    "Music",
    "New Age & Spirituality",
    "Outdoors & Adventure",
    "Paranormal",
    "Parents & Family",
    "Pets & Animals",
    "Photography",
    "Religion & Beliefs",
    "Sci-Fi & Fantasy",
    "Singles",
    "Socializing",
    "Sports & Recreation",
    "Support",
    "Tech",
    "Writing",
]


with app.app_context():
    users = []
    interest_ints = []
    db.drop_all()
    db.create_all()
    demouser = User(
        first_name="demo",
        last_name="user",
        email="demo@gmail.com",
        hashed_password=generate_password_hash("password"),
        bio="stuff about stuff",
        location="location",
    )
    users.append(demouser)

    db.session.add(demouser)
    db.session.commit()

    for a in range(5):
        u = User(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.email(),
            password=generate_password_hash("password"),
        )
        users.append(u)
        db.session.add(u)
        db.session.commit()

    for i in range(len(interests)):
        inter = Interest(
            name=interests[i],
            created_at="now",
            updated_at="now",
            creators_id=(i % 5) + 1,
        )
        interest_ints.append(inter)
        db.session.add(inter)
        db.session.commit()

    for idx, interest in enumerate(interest_ints):
        u = users[idx % 5]
        i = interest_ints[idx % 33]
        u.subscriptions.append(i)
        # db.session.add(
        #     InterestUser(
        #         users_id=(i % 5) + 1,
        #         interests_id=(i % 33) + 1,
        #         created_at="now",
        #         updated_at="now",
        #     )
        # )
        db.session.commit()

    for idx, interest in enumerate(interests):
        for b in range(3):
            db.session.add(
                Post(
                    authors_id=(idx % 5) + 1,
                    body=fake.text(),
                    created_at="now",
                    updated_at="now",
                    interests_id=(idx % len(interests)) + 1,
                )
            )
            db.session.commit()
