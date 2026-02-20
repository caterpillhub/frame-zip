from PIL import Image
import os


def combine_images_16_9(
    input_folder,
    output_image="output.jpg",
    final_width=1920,
    final_height=1080,
    quality=85,
):
    """
    Combine images from folder into 16:9 image.
    Processes one image at a time to keep memory usage low.
    """

    supported_formats = (".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".webp")

    image_paths = []

    for root, _, files in os.walk(input_folder):
        for file in files:
            if file.lower().endswith(supported_formats):
                image_paths.append(os.path.join(root, file))

    image_paths = sorted(image_paths)

    if not image_paths:
        return False

    strip_width = max(final_width // len(image_paths), 10)

    combined_img = Image.new("RGB", (final_width, final_height), (255, 255, 255))

    x_offset = 0

    for img_path in image_paths:

        try:
            with Image.open(img_path) as img:

                if img.mode != "RGB":
                    img = img.convert("RGB")

                img_resized = img.resize(
                    (strip_width, final_height),
                    Image.Resampling.LANCZOS,
                )

                combined_img.paste(img_resized, (x_offset, 0))

                x_offset += strip_width

                if x_offset >= final_width:
                    break

        except Exception:
            continue

    combined_img.save(output_image, "JPEG", quality=quality, optimize=True)

    return True