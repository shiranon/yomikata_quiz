class CreatePublishers < ActiveRecord::Migration[7.1]
  def change
    create_table :publishers do |t|
      t.string :name, null: false
      t.string :description

      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    add_index :publishers, :name, unique: true
  end
end
