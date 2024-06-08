from PIL import Image

import shutil
import os

from ..config import storage


def convert(folder_id, index, file):
    create_storage(folder_id)

    photo_path = f'{folder_id}/{index}.webp'

    image = Image.open(file)
    image = image.convert('RGB')
    image.save(photo_path, 'webp')

    return photo_path


def delete_storage(folder_id):
    shutil.rmtree(f'{storage}/{folder_id}')


def create_storage(folder_id):
    os.chdir(storage)
    if os.path.isdir(folder_id) is not True:
        os.mkdir(folder_id)
