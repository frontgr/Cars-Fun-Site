from app.config import extensions


def check_file_extension(func):
    def wrapper_allowed_file(*args, **kwargs):
        filename_list = kwargs.get('photos', args[1].get('photos', None) if len(args) > 1 else None)
        if not filename_list:
            return func(*args, **kwargs)

        for file in filename_list.values():
            if file.filename.rsplit('.')[1] not in extensions:
                return {'message': 'Invalid photos extension'}
            return func(*args, **kwargs)

    return wrapper_allowed_file
