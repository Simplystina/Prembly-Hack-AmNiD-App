
from amnid.main import db
from amnid.models import SocialMedia


class SocialMediaObj:
    def __init__(self, store_id:int, social_media):
        self.store_id = store_id
        self.user_id = None
        self.social_media = social_media
    
    def create_social_media(self):
        social_media = SocialMedia(user_id=self.user_id, store_id=self.store_id, **self.social_media.dict())

        db.session.add(social_media)
        db.session.commit()

        db.session.refresh(social_media)

    def edit_social_media(self, new_social_media):
        self.update(new_social_media)

        db.session.commit()
        db.session.refresh(self.social_media)
    
    def update(self, new_social_media):
        for key, value in new_social_media.items():
            setattr(self.social_media, key, value)

class UserSocialMediaObj(SocialMediaObj):
    def __init__(self, user_id:str, social_media):
        self.user_id = user_id
        self.store_id = None
        self.social_media = social_media