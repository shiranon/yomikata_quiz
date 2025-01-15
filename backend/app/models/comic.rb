class Comic < ApplicationRecord
  belongs_to :user
  belongs_to :magazine
  belongs_to :author
  has_one_attached :comic_image
  has_many :quizzes

  validates :title, presence: true
end
