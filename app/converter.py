from PIL import Image

from app.storage import create_storage


def convert(filename, index, file):
    w_dir = create_storage(filename, index)

    photo_path = f'{w_dir}/{filename}.webp'

    image = Image.open(file)
    image = image.convert('RGB')
    image.save(photo_path, 'webp')

    return photo_path
