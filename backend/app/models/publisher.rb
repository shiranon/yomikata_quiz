class Publisher < ApplicationRecord
  belongs_to :user
  has_one_attached :publisher_image
  has_many :magazines
end
