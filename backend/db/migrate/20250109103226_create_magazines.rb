class CreateMagazines < ActiveRecord::Migration[7.1]
  def change
    create_table :magazines do |t|
      t.string :name, null: false
      t.string :description

      t.references :user, null: false, foreign_key: true
      t.references :publisher, null: false, foreign_key: true

      t.timestamps
    end

    add_index :magazines, :name, unique: true
  end
end
