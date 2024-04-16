from functools import wraps


def check_admin_permission(admin, requested_permission):
    def decorator_admin(func):
        @wraps(func)
        def decorator_wrapper(*args, **kwargs):
            if admin.check_permission(requested_permission) == 'False':
                return {'status': 'Error',
                        'message': 'Access denied'}

            return func(*args, **kwargs)

        return decorator_wrapper
    return decorator_admin
