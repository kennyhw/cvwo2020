class Api::ItemResource < JSONAPI::Resource
  attributes :content, :created_at, :updated_at
  has_one :category
  filters :id, :category
end