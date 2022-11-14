
from amnid.errors import ServerError, UserError
from amnid.main import db
from amnid.models import Store, User
from amnid.social_media.social_media_class import SocialMediaObj
from amnid.utils import validate_data_length


class StoreObj:
    def __init__(self, user_id) -> None:
        self.user_id = user_id

    def create_store(self, **data):
        data = data['body']
        self.name = data.name.strip()
        self.description = data.description.strip()
        self.social_media = data.social_media

        validate_data_length(key='name', value=self.name, min_length=3, max_length=20)
        validate_data_length(key='description', value=self.description, max_length=300)

        # Add store to database
        new_store = Store(user_id=self.user_id, name=self.name, description=self.description)

        db.session.add(new_store)
        db.session.commit()
        db.session.refresh(new_store)

        social_media = SocialMediaObj(store_id=new_store.id, social_media=self.social_media)
        social_media.create_social_media()

        if new_store:
            return {'status': True, 'message': 'Store created!', 'data': new_store}
        else:
            raise ServerError('Store not created!')

    def fetch_all(self):
        user = User.query.filter_by(user_id=self.user_id).first()
        stores = user.user_stores

        return {'status': True, 'message': 'Success!', 'data': stores}

    def query_store(self, id):
        self.store = Store.query.filter_by(id=id).first()

        if self.store == None:
            raise UserError('Store not found!', code=404)

    def fetch_one(self, store_id):
        self.query_store(id=store_id)

        return {
            'status': True, 
            'message': 'Success!', 
            'data': self.store
        }
            
    
    def edit_one(self, store_id, **data):
        self.query_store(id=store_id)
        data = data['data']

        new_name = data['name']
        new_description = data['description']

        validate_data_length(key='name', value=new_name, min_length=3, max_length=20)
        validate_data_length(key='description', value=new_description, max_length=300)

        self.store.name = data['name']
        self.store.description = data['description']

        db.session.commit()
        db.session.refresh(self.store)

        return {
            'status': True, 
            'message': 'Success!', 
            'data': self.store
        }
    
    def edit_store_social(self, store_id, **data):
        self.query_store(id=store_id)
        data = data['data']

        new_social_media = data['social_media']

        social_media_obj = SocialMediaObj(store_id=store_id, social_media=self.store.social_media)

        social_media_obj.edit_social_media(new_social_media)

        return {
            'status': True, 
            'message': 'Success!', 
            'data': self.store
        }