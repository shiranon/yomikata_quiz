class Quiz < ApplicationRecord
  belongs_to :user
  belongs_to :comic
  has_one_attached :quiz_image
end
