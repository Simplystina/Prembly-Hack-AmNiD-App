
from amnid.main import db
from amnid.models import SocialMedia, Store
from amnid.utils import validate_data_length


class StoreObj:
    def __init__(self, **data) -> None:
        data = data['body']

        self.id_ = data.id_
        self.user_id = data.user_id
        self.name = data.name.strip()
        self.description = data.description.strip()
        self.social_media = data.social_media
    

    def create_store(self):
        validate_data_length(key='name', value=self.name, min_length=3, max_length=20)
        validate_data_length(key='description', value=self.description, max_length=300)

        # Add store to database
        new_store = Store(user_id=self.user_id, name=self.name, description=self.description)

        db.session.add(new_store)
        db.session.commit()
        db.session.refresh(new_store)

        store_social_media = SocialMedia(store_id=new_store.id, **self.social_media.dict())
        db.session.add(store_social_media)
        db.session.commit()
        db.session.refresh(store_social_media)
    
        if new_store:
            return {'status': True, 'message': 'Store created!', 'data': new_store}
        else:
            return {'status': True, 'message': 'Store not created!', 'data': {}}