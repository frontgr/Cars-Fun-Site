from functools import wraps


def check_admin_permission(admin, requested_permission):
    def decorator_admin(func):
        @wraps(func)
        def decorator_wrapper(*args, **kwargs):
            try:
                if admin.check_permission(requested_permission) is False:
                    return {"msg": "Access denied"}, 400
            except AttributeError:
                return {"msg": "Your account was not found. Access denied"}, 400

            return func(*args, **kwargs)

        return decorator_wrapper
    return decorator_admin
