from PIL import Image

import shutil
import os

from ..config import storage


def convert(filename, index, file):
    w_dir = create_storage(filename, index)

    photo_path = f'{w_dir}/{index}.webp'

    image = Image.open(file)
    image = image.convert('RGB')
    image.save(photo_path, 'webp')

    return photo_path


def delete_storage(dir_name):
    shutil.rmtree(dir_name)


def create_storage(name, index):
    w_dir = f'{storage}/{name}/'
    if os.path.isdir(w_dir) is not True:
        os.mkdir(w_dir)

    w_dir += index
    if os.path.isdir(w_dir) is not True:
        os.mkdir(w_dir)

    return w_dir
