class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.text :text
      t.text :img
      t.text :link
      t.integer :category_id
      t.integer :user_id
      t.timestamps
    end
  end
end
