import os

class Configuration:
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL") or "postgresql://facebook_app:password@localhost/faceboopk"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = "klisafluiasdfiuh"