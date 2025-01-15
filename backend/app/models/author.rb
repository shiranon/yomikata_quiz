class Author < ApplicationRecord
  belongs_to :user
  has_many :comics, dependent: :restrict_with_error
end
