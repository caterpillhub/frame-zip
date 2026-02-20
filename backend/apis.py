from flask import request, jsonify, send_file
import tempfile
from io import BytesIO
import os
import zipfile
from framezip import combine_images_16_9

# ---- Configuration ----
MAX_ZIP_SIZE_MB = 200
MAX_FILES = 300
download_count = 100  # Initial count (demo-safe)

# ---- Security: Prevent Zip Path Traversal ----
def safe_extract(zip_ref, path):
    for member in zip_ref.namelist():
        member_path = os.path.abspath(os.path.join(path, member))
        if not member_path.startswith(os.path.abspath(path)):
            raise Exception("Unsafe zip file detected")
    zip_ref.extractall(path)


def register_routes(app):

    # -------------------------
    # Compress ZIP Endpoint
    # -------------------------
    @app.route("/compress", methods=["POST"])
    def compress():

        if "file" not in request.files:
            return jsonify({"error": "No zip file uploaded"}), 400

        zip_file = request.files["file"]

        if not zip_file.filename.endswith(".zip"):
            return jsonify({"error": "Only .zip files allowed"}), 400

        # Check file size
        zip_file.seek(0, os.SEEK_END)
        size_mb = zip_file.tell() / (1024 * 1024)
        zip_file.seek(0)

        if size_mb > MAX_ZIP_SIZE_MB:
            return jsonify({
                "error": f"Zip exceeds {MAX_ZIP_SIZE_MB}MB limit"
            }), 400

        with tempfile.TemporaryDirectory() as tmpdir:

            zip_path = os.path.join(tmpdir, "frames.zip")
            zip_file.save(zip_path)

            # Extract safely
            try:
                with zipfile.ZipFile(zip_path, "r") as zip_ref:
                    safe_extract(zip_ref, tmpdir)
            except Exception:
                return jsonify({"error": "Invalid or unsafe zip file"}), 400

            # Collect extracted image files
            image_extensions = (
                ".jpg", ".jpeg", ".png",
                ".bmp", ".tiff", ".webp"
            )

            extracted_images = []

            for root, _, files in os.walk(tmpdir):
                for f in files:
                    if f.lower().endswith(image_extensions):
                        extracted_images.append(os.path.join(root, f))

            if len(extracted_images) == 0:
                return jsonify({
                    "error": "No valid images found in zip"
                }), 400

            if len(extracted_images) > MAX_FILES:
                return jsonify({
                    "error": f"Max {MAX_FILES} images allowed"
                }), 400

            output_path = os.path.join(tmpdir, "combined.jpg")

            success = combine_images_16_9(
                tmpdir,
                output_path,
                final_width=1920,
                final_height=1080,
                quality=85
            )

            if not success:
                return jsonify({
                    "error": "Image processing failed"
                }), 500

            # Send final image
            buf = BytesIO()
            with open(output_path, "rb") as f:
                buf.write(f.read())
            buf.seek(0)

            return send_file(
                buf,
                mimetype="image/jpeg",
                as_attachment=True,
                download_name="combined.jpg"
            )

    # -------------------------
    # Download Counter Endpoints
    # -------------------------
    @app.route("/downloads", methods=["GET"])
    def get_downloads():
        global download_count
        return jsonify({"count": download_count})

    @app.route("/downloads/increment", methods=["POST"])
    def increment_downloads():
        global download_count
        download_count += 1
        return jsonify({"count": download_count})

    # -------------------------
    # Health Check
    # -------------------------
    @app.route("/health", methods=["GET"])
    def health():
        return jsonify({"status": "ok"}), 200