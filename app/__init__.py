from flask import Flask, request
from flask_migrate import Migrate
from flask_cors import CORS, cross_origin

from app.config import Configuration
from app.routes import sessions, users
from app.models import db

app = Flask(__name__)
CORS(app, support_credentials=True)  # this allows us to request info in the backend from the frontend server

app.config.from_object(Configuration)
db.init_app(app)
migrate = Migrate(app, db)

app.register_blueprint(sessions.bp)
app.register_blueprint(users.bp)

