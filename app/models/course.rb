class Course < ApplicationRecord
  has_many :enrollments, dependent: :destroy 
  has_many :users, through: :enrollments

  validates :title, :desc, :subject, presence: true
end
