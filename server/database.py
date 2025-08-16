from typing import Optional
from sqlalchemy import Column, DateTime, Integer, ForeignKey
from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase, relationship
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

class Base(DeclarativeBase):
    pass

class Product(Base):
    __tablename__ = "Products"

    product_id: Mapped[str] = mapped_column(String(255), primary_key=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    current_price: Mapped[str] = mapped_column(String(255), nullable=False)
    rating: Mapped[float] = mapped_column(nullable=False)
    image_url: Mapped[str] = mapped_column(String(1024), nullable=False)
    product_url: Mapped[str] = mapped_column(String(1024), nullable=False)
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

class ShoppingCartItem(Base):
    __tablename__ = "ShoppingCartItem"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True, nullable=False)

    product_id: Mapped[str] = mapped_column(
        String(255),
        ForeignKey("Products.product_id", ondelete="CASCADE"),
        nullable=False
    )

    product: Mapped["Product"] = relationship("Product")