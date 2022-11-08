class UserError(Exception):
    
    def __init__(self, message, code=400):
        self.code = code

class ServerError(Exception):
    def __init__(self, message, code=500):
        self.code = code