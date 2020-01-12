class AddCategoryToItems < ActiveRecord::Migration[6.0]
  def change
    add_reference :items, :category
  end
end
