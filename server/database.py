from typing import Optional
from sqlalchemy import Column, DateTime, create_engine
from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase, Session
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

class Base(DeclarativeBase):
    pass

class Product(Base):
    __tablename__ = "Products"

    product_id: Mapped[str] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    current_price: Mapped[float] = mapped_column(nullable=False)
    rating: Mapped[float] = mapped_column(nullable=False)
    image_url: Mapped[str] = mapped_column(String(255), nullable=False)
    product_url: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[Optional[str]] = mapped_column(String(255))
    created_at = Column(DateTime(timezone=True))
    last_update = Column(DateTime(timezone=True))

    def to_dict(self):
        return {
            "product_id": self.product_id,
            "title": self.title,
            "current_price": self.current_price,
            "rating": self.rating,
            "image_url": self.image_url,
            "product_url": self.product_url,
            "category": self.category,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "last_update": self.last_update.isoformat() if self.last_update else None,
        }