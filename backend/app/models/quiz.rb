class Quiz < ApplicationRecord
  belongs_to :user
  belongs_to :comic
  has_many :mylist_quizzes
  has_many :mylists, through: :mylist_quizzes
  has_one_attached :quiz_image
end
