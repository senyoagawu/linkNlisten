from dotenv import load_dotenv
from app import app, db

load_dotenv()
with app.app_context():
    db.drop_all()
    db.create_all()
