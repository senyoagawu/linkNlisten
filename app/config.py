import os

print(os.environ.get("DATABASE_URL"))


class Configuration:
    SQLALCHEMY_DATABASE_URI = (
        os.environ.get("DATABASE_URL")
        # or "postgresql://linknlistenapp:password@localhost/linknlisten"
    )
    if SQLALCHEMY_DATABASE_URI.startswith("postgres://"):
        SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI.replace("postgres://", "postgresql://", 1)
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SECRET_KEY = "klisafluiasdfiuh"
