class DropLabels < ActiveRecord::Migration[6.0]
  def change
    drop_table :labels
  end
end
