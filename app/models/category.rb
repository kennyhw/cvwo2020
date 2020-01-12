class Category < ApplicationRecord
  has_many :items

  validates :title, presence: true, length: { minimum: 3 }
end
