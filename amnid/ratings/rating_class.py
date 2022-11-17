
from amnid.errors import UserError
from amnid.main import db
from amnid.models import Rating
from amnid.users.user_class import UserObj


class Ratings:

    def __init__(self, user_id):
        self.user_id = user_id

        self.userObj = UserObj(user_id=self.user_id)
        self.user = self.userObj.get_user()
    
    def rate_vendor(self, **data):
        data = data['data']

        rater_name = f'{self.user.first_name} {self.user.last_name}'
        rater_image = self.user.user_image.img_string
        del data['user_id']

        new_rate = Rating(**data, rater_image=rater_image, rater_name=rater_name)

        db.session.add(new_rate)
        db.session.commit()
        db.session.refresh(new_rate)

        return {'status': True, 'message': 'Rated successfully!', 'data': new_rate}

    def get_all_ratings(self):

        if self.user != None:
            return {'status': True, 'message': 'Success!', 'data':self.user.ratings}
        else:
            raise UserError('Vendor not found!')
    
    def get_total_rating(self):
        if self.user == None:
            raise UserError('Vendor not found!')

        ratings = self.user.ratings
        ratings_count = len(ratings)

        if ratings_count == 0:
            return {'status': True, 'message': 'Success!', 'data':{'ratings_count': ratings_count, 'rating': 0}}
        
        total = 0
        for row in ratings:
            total += int(row.rate)
        
        average = round(total/ratings_count)

        return {'status': True, 'message': 'Success!', 'data':{'ratings_count': ratings_count, 'rating': average}}