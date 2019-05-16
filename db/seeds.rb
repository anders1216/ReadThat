# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user1 = User.create(username: "Userman", password:"a")
user2 = User.create(username: "Bartman", password:"a")
user3 = User.create(username: "Userguy", password:"a")

funny = Category.create(category: "Funny", description: "Funny stuff")
sad = Category.create(category: "Sad", description: "Sad stuff")
biking = Category.create(category: "Biking", description: "Biking stuff")
sunsets = Category.create(category: "Sunsets", description: "Just Sunsets")
beautiful = Category.create(category: "Beautiful", description: "Beautiful stuff")
photos = Category.create(category: "Photos", description: "Everything Photos")
videos = Category.create(category: "Videos", description: "Mainly Videos some Movies...")

# create_table "posts", force: :cascade do |t|
#     t.text "title"
#     t.text "content"
#     t.text "img"
#     t.text "link"
#     t.integer "category_id"
#     t.integer "user_id"
#     t.datetime "created_at", null: false
#     t.datetime "updated_at", null: false
#   end

user1.posts.create(title:"Dumb and funny", content:"Guys are dom and funny" , category_id: funny.id)
user1.posts.create(title:"Sadness", content:"Guys are dom and do sad thing" , category_id: sad.id)
user2.posts.create(title:"Dumb and funny", content:"Guys are dom and funny" , category_id: funny.id)
user2.posts.create(title:"Sooper Sadness", content:"Guys are dom do super sad thing" , category_id: sad.id)
user3.posts.create(title:"Dumb and funny 3rd", content:"Guys are dom and funny ;D" , category_id: funny.id)
user3.posts.create(title:"View from my back yard", content:"Look at all the colors" , category_id: sunsets.id)
user3.posts.create(title:"View from my backyard", content:"HAwt photo" , category_id: photos.id)

