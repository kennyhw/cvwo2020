class RemoveLabelFromItems < ActiveRecord::Migration[6.0]
  def change
    remove_column :items, :label_id
  end
end
