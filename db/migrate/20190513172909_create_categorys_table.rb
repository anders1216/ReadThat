class CreateCategorysTable < ActiveRecord::Migration[5.2]
  def change
    create_table :categories do |t|
      t.text :category
      t.text :description
    end
  end
end
