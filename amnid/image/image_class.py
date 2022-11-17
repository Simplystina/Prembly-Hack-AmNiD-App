import base64
import secrets

from flask import request

from amnid.main import db
from amnid.models import Image
from amnid.users.user_class import UserObj

class ImageObj(UserObj):

    def generate_img_id(self):
        return f"{secrets.token_hex(16)}.png"

    def convert_and_store_image(self, string):
        '''Convert string from base64 to img and store in static folder'''
        self.img_id = self.generate_img_id()
        file_path = request.host_url + f"static/img/{self.img_id}"

        with open(file_path, "wb") as decoder:
            decoder.write(base64.b64decode((string)))
    
    def update_image(self):
        user = self.get_user()

        user.user_image.img_string = self.img_id

        db.session.commit()
    
    def post_image(self):
        new_image = Image(user_id = self.user_id)

        db.session.add(new_image)

