class Mylist < ApplicationRecord
  belongs_to :user
  has_many :mylist_quizzes
  has_many :quizzes, through: :mylist_quizzes
end
