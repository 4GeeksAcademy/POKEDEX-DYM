"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Pokemon, Favorite
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import requests

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/register', methods=['POST'])
def register_user():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Email y contraseña requeridos"}), 400

    # Check if user exists
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"msg": "Este email ya está registrado"}), 400

    # Create user
    new_user = User(email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario creado correctamente"}), 200


# -----------------------
# LOGIN USER
# -----------------------
@api.route('/login', methods=['POST'])
def login_user():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({"msg": "Credenciales incorrectas"}), 401

    token = create_access_token(identity=str(user.id))

    return jsonify({"msg": "Login correcto", "token": token}), 200


# -----------------------
# LOAD 150 POKEMONS
# -----------------------

@api.route("/load_pokemons", methods=["GET"])
def load_pokemons():
    # Obtenemos los Pokémon de la Gen 1
    gen_url = "https://pokeapi.co/api/v2/generation/1/"
    gen_data = requests.get(gen_url).json()

    species_list = gen_data["pokemon_species"]

    results = []

    # Cargar cada Pokémon
    for species in species_list:
        name = species["name"]

        # Info del Pokémon
        info_url = f"https://pokeapi.co/api/v2/pokemon/{name}"
        info = requests.get(info_url).json()

        types = [t["type"]["name"] for t in info["types"]]
        abilities = [a["ability"]["name"] for a in info["abilities"]]

        pokemon = Pokemon(
            name=name,
            height=info["height"],
            weight=info["weight"],
            types=types,
            abilities=abilities,
            image_url=info["sprites"]["front_default"],
            artwork_url=info["sprites"]["other"]["official-artwork"]["front_default"]
        )

        db.session.add(pokemon)
        results.append({
            "name": name,
            "types": types,
            "image_url": pokemon.image_url
        })

    db.session.commit()

    return jsonify({"msg": "Pokemons cargados correctamente", "count": len(results)}), 200


# -----------------------
# GET 150 POKEMONS
# -----------------------

@api.route("/pokemons", methods=["GET"])
def get_pokemons():
    pokemons = Pokemon.query.all()
    return jsonify([p.serialize() for p in pokemons]), 200


# -----------------------
# FAVORITES
# -----------------------

@api.route("/favorites", methods=["POST"])
@jwt_required()
def add_favorite():
    user_id = get_jwt_identity()
    data = request.json

    pokemon_id = data.get("pokemon_id")
    nickname = data.get("nickname")  # opcional

    if not pokemon_id:
        return jsonify({"msg": "pokemon_id es requerido"}), 400

    pokemon = Pokemon.query.get(pokemon_id)
    if not pokemon:
        return jsonify({"msg": "El Pokémon no existe"}), 404

    existing = Favorite.query.filter_by(
        user_id=user_id,
        pokemon_id=pokemon_id
    ).first()

    if existing:
        return jsonify({"msg": "Este Pokémon ya está en tus favoritos"}), 400

    fav = Favorite(
        user_id=user_id,
        pokemon_id=pokemon_id,
        nickname=nickname
    )

    db.session.add(fav)
    db.session.commit()

    return jsonify({"msg": "Agregado a favoritos"}), 201


@api.route("/favorites/<int:pokemon_id>", methods=["DELETE"])
@jwt_required()
def remove_favorite(pokemon_id):
    user_id = get_jwt_identity()

    favorite = Favorite.query.filter_by(
        user_id=user_id,
        pokemon_id=pokemon_id
    ).first()

    if not favorite:
        return jsonify({"msg": "Este Pokémon no está en tus favoritos"}), 404

    db.session.delete(favorite)
    db.session.commit()

    return jsonify({"msg": "Eliminado de favoritos"}), 200


@api.route("/favorites", methods=["GET"])
@jwt_required()
def get_favorites():
    user_id = get_jwt_identity()
    favorites = Favorite.query.filter_by(user_id=user_id).all()

    return jsonify([fav.serialize() for fav in favorites]), 200


# -----------------------
# PERFIL
# -----------------------

@api.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    return jsonify({
        "id": user.id,
        "email": user.email,
        "username": user.username,
        "bio": getattr(user, "bio", "") or "",
        "region": getattr(user, "region", "") or "",
        "favorite_pokemon": getattr(user, "favorite_pokemon", "") or ""
    }), 200


# Actualizar perfil
@api.route("/profile", methods=["PUT"])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    data = request.get_json() or {}

    username = data.get("username")
    bio = data.get("bio")
    region = data.get("region")
    favorite = data.get("favorite_pokemon") or data.get("favoritePokemon")

    if not username:
        return jsonify({"message": "Trainer requerido"}), 400

    fields = {
        "username": username,
        "bio": bio,
        "region": region,
        "favorite_pokemon": favorite
    }

    for key, value in fields.items():
        if value is not None:
            setattr(user, key, value)

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al actualizar el perfil", "error": str(e)}), 500

    return jsonify({
        "msg": "Perfil actualizado",
        "email": user.email,
        "username": user.username,
        "bio": user.bio,
        "region": user.region,
        "favorite_pokemon": user.favorite_pokemon,
    }), 200
