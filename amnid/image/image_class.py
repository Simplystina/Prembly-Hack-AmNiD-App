import base64
import secrets

from flask import request
from amnid.errors import ServerError

from amnid.main import db
from amnid.models import Image
from amnid.users.user_class import UserObj

class ImageObj(UserObj):

    def generate_img_id(self):
        return f"{secrets.token_hex(16)}.jpeg"

    def convert_and_store_image(self, string):
        '''Convert string from base64 to img and store in static folder'''

        try:
            self.img_id = self.generate_img_id()
            file_path = f"amnid/static/img/{self.img_id}"

            decodeit = open(file_path, 'wb')
            decodeit.write(base64.decodebytes(bytes(string, 'utf-8')))
            decodeit.close()
        except Exception as e:
            raise ServerError(str(e))
    
    def update_image(self):
        user = self.get_user()

        user.user_image.img_string = self.img_id

        db.session.commit()
    
    def post_image(self):
        new_image = Image(user_id = self.user_id)

        db.session.add(new_image)

