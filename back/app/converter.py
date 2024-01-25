from PIL import Image

from back.app.storage import create_storage


def convert(filename, index, file):
    w_dir = create_storage(filename, index)

    photo_path = f'{w_dir}/{index}.webp'

    image = Image.open(file)
    image = image.convert('RGB')
    image.save(photo_path, 'webp')

    return photo_path
