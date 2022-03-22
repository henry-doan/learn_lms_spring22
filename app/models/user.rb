class User < ApplicationRecord
  has_many :enrollments 
  has_many :courses, through: :enrollments

  validates :first_name, :last_name, presence: true
end
