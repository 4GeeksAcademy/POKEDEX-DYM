from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, DateTime, JSON
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    username: Mapped[str] = mapped_column(
        String(50), unique=True, nullable=True)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(225), nullable=False)

    favorites: Mapped[list["Favorite"]] = relationship(
        "Favorite",
        back_populates="user",
        cascade="all, delete-orphan",
        lazy="selectin",
    )

    def set_password(self, raw_password: str) -> None:
        self.password_hash = generate_password_hash(raw_password)

    def check_password(self, raw_password: str) -> bool:
        return check_password_hash(self.password_hash, raw_password)

    def __repr__(self):
        return f"<User {self.username}>"


class Favorite(db.Model):
    __tablename__ = "favorite"
   

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(
        db.ForeignKey("users.id"), nullable=False, index=True)
    pokemon_id: Mapped[int] = mapped_column(
        db.ForeignKey("pokemons.id"), nullable=False, index=True)
    nickname: Mapped[str | None] = mapped_column(String(60), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=False), default=datetime.utcnow, nullable=False)

    user: Mapped["User"] = relationship(
        "User", back_populates="favorites", lazy="joined")
    pokemon: Mapped["Pokemon"] = relationship(
        "Pokemon", back_populates="favorited_by", lazy="joined")

    def __repr__(self) -> dict:
        return f"<Favorite id={self.id} user_id={self.user_id} pokemon_id={self.pokemon_id}>"

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "pokemon_id": self.pokemon_id,
            "nickname": self.nickname,
            "created_at": self.created_at.isoformat(),
            "pokemon": {
                "id": self.pokemon.id,
                "name": self.pokemon.name,
                "height": self.pokemon.height,
                "weight": self.pokemon.weight,
                "types": self.pokemon.types,
                "abilities": self.pokemon.abilities,
                "image_url": self.pokemon.image_url,
                "artwork_url": self.pokemon.artwork_url
            }
        }

class Pokemon(db.Model):
    __tablename__ = "pokemons"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)

    height: Mapped[int | None] = mapped_column(Integer, nullable=True)
    weight: Mapped[int | None] = mapped_column(Integer, nullable=True)

    types: Mapped[list] = mapped_column(JSON, nullable=False)       
    abilities: Mapped[list] = mapped_column(JSON, nullable=False)   

    image_url: Mapped[str | None] = mapped_column(String(255))
    artwork_url: Mapped[str | None] = mapped_column(String(255))

    favorited_by = relationship("Favorite", back_populates="pokemon")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "height": self.height,
            "weight": self.weight,
            "types": self.types,
            "abilities": self.abilities,
            "image_url": self.image_url,
            "artwork_url": self.artwork_url
        }

    def __repr__(self):
        return f"<Pokemon {self.name}>"
