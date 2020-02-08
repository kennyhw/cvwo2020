# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

@category = Category.new
@category.title = "This is a title"
@category.description = "This is a description"
@category.save

10.times do |idx|
  @item = @category.items.create(content: "This is item number #{idx + 1}")
end