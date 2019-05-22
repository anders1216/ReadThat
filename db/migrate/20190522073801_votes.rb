class Votes < ActiveRecord::Migration[5.2]
  def change
    add_column :votes, :is_down_vote, :boolean
    #Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
