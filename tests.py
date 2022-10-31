def check(**kwargs):
    data = kwargs['data']
    print(data)
    for key, value in data.items():
        print(key, value)
        if len(value) == 0:
            return f'{key} is empty!'

print(check(data = {'name':'', 'first':'Nodebe'}))