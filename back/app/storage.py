import shutil
import os

from back.app.config import storage


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
