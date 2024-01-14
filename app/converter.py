from PIL import Image

from app.config import extensions
from app.storage import create_storage


def allowed_file(func):
    def wrapper_allowed_file(*args, **kwargs):
        filename_list = kwargs['photos'] if 'photos' in kwargs else args[1]['photos']
        if not filename_list:
            return func(*args, **kwargs)

        for file in filename_list.values():
            if file.filename.rsplit('.')[1] not in extensions:
                return {'status': 'Error',
                        'message': 'Invalid photos extension'}
            return func(*args, **kwargs)

    return wrapper_allowed_file


def convert(filename, index, file):
    w_dir = create_storage(filename, index)

    photo_path = f'{w_dir}/{filename}.webp'

    image = Image.open(file)
    image = image.convert('RGB')
    image.save(photo_path, 'webp')

    return photo_path
