from functools import wraps
from flask import jsonify
from mongoengine.errors import FieldDoesNotExist



def unavailable_fields_exception(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except FieldDoesNotExist as e:
            return jsonify({"msg": "You are passing invalid fields"}), 400
    return wrapper