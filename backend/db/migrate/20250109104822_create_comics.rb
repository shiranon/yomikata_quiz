class CreateComics < ActiveRecord::Migration[7.1]
  def change
    create_table :comics do |t|
      t.string :title, null: false
      t.string :description

      t.references :user, null: false, foreign_key: true
      t.references :magazine, null: false, foreign_key: true

      t.timestamps
    end

    add_index :comics, :title, unique: true
  end
end
