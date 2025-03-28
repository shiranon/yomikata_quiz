class CreateAuthors < ActiveRecord::Migration[7.1]
  def change
    create_table :authors do |t|
      t.string :name, null: false
      t.string :description

      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
