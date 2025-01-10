class Magazine < ApplicationRecord
  belongs_to :user
  belongs_to :publisher
  has_one_attached :magazine_image
end
