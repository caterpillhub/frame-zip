from flask import request, jsonify, send_file
import tempfile
from io import BytesIO
import os
from framezip import combine_images_16_9

def register_routes(app):
    """Register all API routes for the Flask app."""
    
    @app.route('/compress', methods=['POST'])
    def compress():
        """
        Compress multiple image frames into a single 16:9 image.
        
        Expects multipart form data with key 'images' containing multiple image files.
        Returns the combined JPEG image as an attachment.
        """
        if 'images' not in request.files:
            return jsonify({'error': "No files uploaded"}), 400

        files = request.files.getlist('images')
        if not files:
            return jsonify({'error': "Empty file list"}), 400

        with tempfile.TemporaryDirectory() as tmpdir:
            # Save uploaded files to temp directory
            for f in files:
                if f.filename:
                    save_path = os.path.join(tmpdir, f.filename)
                    f.save(save_path)
            
            # Generate combined image
            output_path = os.path.join(tmpdir, 'combined.jpg')
            success = combine_images_16_9(tmpdir, output_path)
            
            if not success:
                return jsonify({'error': 'Failed to combine images'}), 500
            
            # Load image into memory before temp directory cleanup
            buf = BytesIO()
            with open(output_path, 'rb') as f:
                buf.write(f.read())
            buf.seek(0)
            
            return send_file(buf, mimetype='image/jpeg', as_attachment=True, download_name='combined.jpg')
    
    @app.route('/health', methods=['GET'])
    def health():
        """Health check endpoint."""
        return jsonify({'status': 'ok'}), 200
