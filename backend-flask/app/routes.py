from flask import request,make_response,abort,g
from app import app,db
from .models import User,Poem,Composition
from datetime import datetime
from .auth import basic_auth,token_auth


@app.get('/user')
@basic_auth.login_required()
def login():
    g.current_user.get_token()
    g.current_user.last_seen = datetime.utcnow()
    return make_response(g.current_user.to_dict(),200)

@app.post('/user')
def register():
    data = request.get_json()
    already_username = db.session.execute(db.select(User).where(User.username==data.get('username'))).scalar_one_or_none()
    if already_username and already_username!=g.current_user:
        abort(422)
    already_email = db.session.execute(db.select(User).where(User.email==data.get('email'))).scalar_one_or_none()
    if already_email and already_email!=g.current_user:
        abort(422)
    new_user = User()
    new_user.from_dict(data)
    new_user.created_on = datetime.utcnow()
    new_user.save()
    return make_response("success",200)

@app.put('/user')
@token_auth.login_required
def edit_user():
    data = request.get_json()
    already_username = db.session.execute(db.select(User).where(User.username==data.get('username'))).scalar_one_or_none()
    if already_username and already_username!=g.current_user:
        abort(422)
    already_email = db.session.execute(db.select(User).where(User.email==data.get('email'))).scalar_one_or_none()
    if already_email and already_email!=g.current_user:
        abort(422)
    g.current_user.from_dict(data,"put")
    g.current_user.save()
    return make_response("success",200)

@app.delete('/user')
@token_auth.login_required()
def delete_user():
    g.current_user.delete()
    return make_response("success",200)


@app.get('/poem')
@token_auth.login_required()
def explore():
    poems = g.current_user.followed_poems()
    return make_response({"data":[p.to_dict() for p in poems][::-1]},200)

@app.get('/poem/<username>')
@token_auth.login_required()
def get_user_poem(username):
    poems = db.session.execute(db.select(User).where(User.username==username)).scalars().first().poems
    return make_response({"data":[p.to_dict() for p in poems]},200)

@app.get('/poem/explore')
def get_poem():
    poems = db.session.execute(db.select(Poem)).scalars().all()
    user_id = request.args.get("user_id")
    if user_id:
        user = db.session.get(User,user_id)
        if user:
            return make_response({"data":[p.to_dict()|{'is_following':user.is_following(p.author)} for p in poems][::-1]})
    return make_response({"data":[p.to_dict() for p in poems][::-1]},200)

@app.post('/poem')
@token_auth.login_required()
def create_recipe():
    data = request.get_json()
    title = data["title"]
    poem = data["poem"]
    author_id = g.current_user.id
    new_poem = Poem()
    new_poem.from_dict({"title":title,"poem":poem,"user_id":author_id})
    new_poem.save()
    return make_response(new_poem.to_dict(),200)

@app.put('/poem/<int:poem_id>')
@token_auth.login_required()
def edit_poem(poem_id):
    poem = db.session.get(Poem,poem_id)
    if poem is None:
        abort(404)
    if poem.author.id != g.current_user.id:
        abort(403)
    poem.from_dict(request.get_json())
    poem.save()
    return make_response(poem.to_dict(),200)

@app.delete('/poem/<int:poem_id>')
@token_auth.login_required()
def delete_poem(poem_id):
    poem = db.session.get(Poem, poem_id)
    if poem is None:
        abort(404)
    if poem.author.id != g.current_user.id:
        abort(403)
    poem.delete()
    return make_response("deleted",200)

@app.get('/follow/<username>')
@token_auth.login_required
def check_follow(username):
    user = db.session.execute(db.select(User).filter_by(username=username)).scalar_one_or_none()
    return make_response([g.current_user.is_following(user)])

@app.post('/follow/<username>')
@token_auth.login_required
def follow(username):
    user = db.session.execute(db.select(User).filter_by(username=username)).scalar_one_or_none()
    if user is None:
        abort(404)
    elif user == g.current_user:
        abort(404)
    g.current_user.follow(user)
    db.session.commit()
    return make_response("followed",200)
    
@app.post('/unfollow/<username>')
@token_auth.login_required
def unfollow(username):
    user = db.session.execute(db.select(User).filter_by(username=username)).scalar_one_or_none()
    if user is None:
        abort(404)
    if user == g.current_user:
        abort(404)
    g.current_user.unfollow(user)
    db.session.commit()
    return make_response("unfollowed",200)

@app.get('/composition')
@token_auth.login_required()
def explore_compositions():
    compositions = g.current_user.followed_compositions()
    return make_response({"data":[c.to_dict() for c in compositions][::-1]},200)

@app.get('/composition/<username>')
@token_auth.login_required()
def get_user_composition(username):
    compositions = db.session.execute(db.select(User).where(User.username==username)).scalars().first().compositions
    return make_response({"data":[c.to_dict() for c in compositions]},200)

@app.get('/composition/explore')
def get_composition():
    compositions = db.session.execute(db.select(Composition)).scalars().all()
    user_id = request.args.get("user_id")
    if user_id:
        user = db.session.get(User,user_id)
        if user:
            return make_response({"data":[c.to_dict()|{'is_following':user.is_following(c.author)} for c in compositions][::-1]})
    return make_response({"data":[c.to_dict() for c in compositions][::-1]},200)

@app.post('/composition')
@token_auth.login_required()
def create_composition():
    data = request.get_json()
    # title = data["title"]
    text = data["text"]
    if text:
        author_id = g.current_user.id
        new_composition = Composition()
        new_composition.from_dict({"text":text,"user_id":author_id})
        new_composition.save()
        return make_response(new_composition.to_dict(),200)
    return make_response('ok',200)

@app.put('/composition/<int:composition_id>')
@token_auth.login_required()
def edit_composition(composition_id):
    composition = db.session.get(Composition,composition_id)
    if composition is None:
        abort(404)
    if composition.author.id != g.current_user.id:
        abort(403)
    composition.from_dict(request.get_json())
    composition.save()
    return make_response(composition.to_dict(),200)

@app.delete('/composition/<int:composition_id>')
@token_auth.login_required()
def delete_composition(composition_id):
    composition = db.session.get(Composition, composition_id)
    if composition is None:
        abort(404)
    if composition.author.id != g.current_user.id:
        abort(403)
    composition.delete()
    return make_response("deleted",200)