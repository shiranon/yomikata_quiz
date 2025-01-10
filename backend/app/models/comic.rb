class Comic < ApplicationRecord
  belongs_to :user
  belongs_to :magazine
  has_one_attached :comic_image
end
