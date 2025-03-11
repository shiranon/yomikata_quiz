class CreateMylists < ActiveRecord::Migration[7.1]
  def change
    create_table :mylists do |t|
      t.string :title, null: false
      t.string :description
      t.boolean :is_public, null: false, default: false
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
