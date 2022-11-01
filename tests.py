def check(*args, **kwargs):
    print(args)
    data = kwargs['data']
    print(data)
    for key, value in data.items():
        print(key, value)
        if len(value) == 0:
            return f'{key} is empty!'

print(check('2','3',data = {'name':'', 'first':'Nodebe'}))