class Item < ApplicationRecord
  belongs_to :category
  
  validates :content, presence: true, length: { minimum: 3 }
end
