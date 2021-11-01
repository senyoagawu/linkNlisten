import os

print(os.environ.get("DATABASE_URL"))


class Configuration:
    SQLALCHEMY_DATABASE_URI = (
        os.environ.get("DATABASE_URL")
        # or "postgresql://linknlistenapp:password@localhost/linknlisten"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SECRET_KEY = "klisafluiasdfiuh"
