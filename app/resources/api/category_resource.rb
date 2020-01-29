class Api::CategoryResource < JSONAPI::Resource
  attributes :title, :description
  has_many :items
  filter :id
end