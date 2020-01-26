class Api::CategoryResource < JSONAPI::Resource
  attributes :title, :description

  filter :id
end