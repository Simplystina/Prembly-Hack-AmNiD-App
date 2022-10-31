
def verify_params(**parameters, *optional):
    data = parameters['params']

    for key, value in data.items():
        if len(value) == 0:
            return {'status': False, 'message': f'{key} is empty!'}
    
    return {'status': True}