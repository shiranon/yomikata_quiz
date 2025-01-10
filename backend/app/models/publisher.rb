class Publisher < ApplicationRecord
  belongs_to :user
  has_one_attached :publisher_image
end
