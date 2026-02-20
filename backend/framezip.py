from PIL import Image
import os
from pathlib import Path

def combine_images_16_9(input_folder, output_image="output.jpg", 
                       final_width=1920, final_height=1080, quality=85):
    """
    Combine multiple images into a single 16:9 aspect ratio image.
    
    Resizes each image to fit as vertical strips and combines them into a
    single 1920x1080 JPEG output.

    Args:
        input_folder: Path to directory containing image frames
        output_image: Output file path for the combined image
        final_width: Final image width in pixels (default 1920)
        final_height: Final image height in pixels (default 1080)
        quality: JPEG quality 1-100 (default 85)
    
    Returns:
        bool: True if successful, False on error
    """
    Path(input_folder).mkdir(exist_ok=True)
    supported_formats = ('.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.webp')

    try:
        all_files = os.listdir(input_folder)
        images = sorted([img for img in all_files if img.lower().endswith(supported_formats)])
    except FileNotFoundError:
        return False

    if not images:
        return False

    # Calculate strip width dynamically based on number of images
    strip_width = final_width // len(images)
    if strip_width < 10:
        strip_width = 10

    processed_images = []
    for img_name in images:
        img_path = os.path.join(input_folder, img_name)
        with Image.open(img_path) as img:
            # Convert to RGB if needed
            if img.mode != 'RGB':
                if img.mode == 'RGBA':
                    background = Image.new('RGB', img.size, (255, 255, 255))
                    background.paste(img, mask=img.split()[-1])
                    img = background
                else:
                    img = img.convert('RGB')
            
            # Resize image to strip dimensions with high quality
            img_resized = img.resize((strip_width, final_height), Image.Resampling.LANCZOS)
            processed_images.append(img_resized)

    if not processed_images:
        return False

    # Create combined image
    combined_img = Image.new("RGB", (final_width, final_height), color=(255, 255, 255))
    x_offset = 0
    for img in processed_images:
        combined_img.paste(img, (x_offset, 0))
        x_offset += img.width

    # Fill remaining space with last image if needed
    if x_offset < final_width and processed_images:
        remaining_width = final_width - x_offset
        if remaining_width > 0:
            last_img = processed_images[-1]
            stretched_img = last_img.resize((remaining_width, final_height), Image.Resampling.LANCZOS)
            combined_img.paste(stretched_img, (x_offset, 0))

    # Save output
    combined_img.save(output_image, "JPEG", quality=quality, optimize=True)
    return True
