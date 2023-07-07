from app import db
from datetime import datetime,timedelta
from werkzeug.security import generate_password_hash,check_password_hash
import secrets


followers = db.Table('followers',
                     db.Column('follower_id',db.Integer,db.ForeignKey('user.id')),
                     db.Column('followed_id',db.Integer,db.ForeignKey('user.id')))

class Poem(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    title = db.Column(db.String(40))
    poem = db.Column(db.String(240))
    timestamp = db.Column(db.DateTime,index=True,default=datetime.utcnow)
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'))

    def __repr__(self):
        return f'<Poem {self.poem}>'
    
    def from_dict(self,data):
        for field in ["title","poem","user_id"]:
            if field in data:
                setattr(self,field,data[field])
    
    def to_dict(self):
        author = db.session.execute(db.select(User).where(User.id == self.user_id)).scalars().first().username
        return {"id":self.id,
                "title":self.title,
                "poem":self.poem,
                "timestamp":self.timestamp,
                "user_id":self.user_id,
                "author":author}
    
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()


class Composition(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    # title = db.Column(db.String(40))
    text = db.Column(db.String(1000))
    timestamp = db.Column(db.DateTime,index=True,default=datetime.utcnow)
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'))

    def __repr__(self):
        return f'<Composition {self.text}>'
    
    def from_dict(self,data):
        for field in ["text","user_id"]:
            if field in data:
                setattr(self,field,data[field])
    
    def to_dict(self):
        author = db.session.execute(db.select(User).where(User.id == self.user_id)).scalars().first().username
        return {"id":self.id,
                # "title":self.title,
                "text":self.text,
                "timestamp":self.timestamp,
                "user_id":self.user_id,
                "author":author}
    
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()



class User(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String(64),index=True,unique=True)
    email = db.Column(db.String(120),index=True,unique=True)
    password_hash = db.Column(db.String(128))
    poems = db.relationship('Poem',backref='author',lazy='dynamic',cascade='all, delete-orphan')
    compositions = db.relationship('Composition',backref='author',lazy='dynamic',cascade='all, delete-orphan')
    about_me = db.Column(db.String(140))
    created_on = db.Column(db.DateTime,default=datetime.utcnow)
    last_seen = db.Column(db.DateTime,default=datetime.utcnow)
    followed = db.relationship(
        'User', secondary=followers,
        primaryjoin=(followers.c.follower_id == id),
        secondaryjoin=(followers.c.followed_id ==id),
        backref=db.backref('followers',lazy='dynamic'),lazy='dynamic')
    token = db.Column(db.String,index=True,unique=True)
    token_exp = db.Column(db.DateTime)


    def get_token(self,exp=86400):
        current_time = datetime.utcnow()
        if self.token and self.token_exp > current_time + timedelta(seconds=60):
            return self.token
        self.token = secrets.token_urlsafe(32)
        self.token_exp = current_time + timedelta(seconds=exp)
        self.save()
        return self.token
    
    def revoke_token(self):
        self.token_exp = datetime.utcnow() - timedelta(seconds=120)

    @staticmethod
    def check_token(token):
        user = db.session.execute(db.select(User).where(User.token==token)).scalar_one_or_none()
        if not user or user.token_exp < datetime.utcnow():
            return None
        return user

    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return f'<User {self.username}>'
    
    def set_password(self,password):
        self.password_hash = generate_password_hash(password)

    def check_password(self,password):
        return check_password_hash(self.password_hash,password)
    
    def follow(self,user):
        if not self.is_following(user):
            self.followed.append(user)
    
    def unfollow(self,user):
        if self.is_following(user):
            self.followed.remove(user)

    def is_following(self,user):
        return self.followed.filter(
            followers.c.followed_id == user.id).count() > 0
    
    def followed_poems(self):
        followed = [u.poems.all() for u in self.followed.all()]
        return [p for poem in followed for p in poem]
    
    def followed_compositions(self):
        followed = [u.compositions.all() for u in self.followed.all()]
        return [c for composition in followed for c in composition]

    def to_dict(self):
        return {
            "user_id":self.id,
            "username":self.username,
            "email":self.email,
            "about_me":self.about_me,
            "created_on":self.created_on,
            "last_seen":self.last_seen,
            "token":self.token
        }

    def from_dict(self,data,method="post"):
        for field in ["username","email","password","about_me"]:
            if field in data:
                if field == "password":
                    if method == "post":
                        self.set_password(data[field])
                else:
                    setattr(self, field, data[field])

