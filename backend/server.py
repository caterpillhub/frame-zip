from flask import Flask
from flask_cors import CORS
from apis import register_routes
import os

def create_app():
    app = Flask(__name__)

    # Allow all origins for now (we can restrict later)
    CORS(app)

    register_routes(app)
    return app

app = create_app()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port)