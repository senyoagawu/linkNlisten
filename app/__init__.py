from flask import Flask, request
from flask_migrate import Migrate
from flask_cors import CORS, cross_origin

# from flask_jwt_extended import JWTManager
from app.config import Configuration
from app.routes import sessions, users, interests, posts
from app.models import db

app = Flask(__name__)
# jwt = JWTManager(app)
CORS(
    app, support_credentials=True
)  # this allows us to request info in the backend from the frontend server

app.config.from_object(Configuration)
db.init_app(app)
migrate = Migrate(app, db)
app.register_blueprint(sessions.bp)
app.register_blueprint(users.bp)
app.register_blueprint(interests.bp)
# app.register_blueprint(interests_users.bp)
app.register_blueprint(posts.bp)


# @app.before_request
# def https_redirect():
#     if os.environ.get('FLASK_ENV') == 'production':
#         if request.headers.get('X-Forwarded-Proto') == 'http':
#             url = request.url.replace('http://', 'https://', 1)
#             code = 301
#             return redirect(url, code=code)


# @app.after_request
# def inject_csrf_token(response):
#     response.set_cookie('csrf_token',
#                         generate_csrf(),
#                         secure=True if os.environ.get(
#                             'FLASK_ENV') == 'production' else False,
#                         samesite='Strict' if os.environ.get(
#                             'FLASK_ENV') == 'production' else None,
#                         httponly=True)
#     return response


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def react_root(path):
    print("path", path)
    if path == "favicon.ico":
        return app.send_static_file("favicon.ico")
    return app.send_static_file("index.html")
