# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user1 = User.create(username: "a", password:"a", password_confirmation:'a')
user2 = User.create(username: "Guy", password:"a", password_confirmation:'a')
user3 = User.create(username: "b", password:"a", password_confirmation:'a')

funny = Category.find_or_create_by(category: "Funny", description: "Funny stuff")
sad = Category.find_or_create_by(category: "Sad", description: "Sad stuff")
biking = Category.find_or_create_by(category: "Biking", description: "Biking stuff")
sunsets = Category.find_or_create_by(category: "Sunsets", description: "Just Sunsets")
beautiful = Category.find_or_create_by(category: "Beautiful", description: "Beautiful stuff")
photos = Category.find_or_create_by(category: "Photos", description: "Everything Photos")
videos = Category.find_or_create_by(category: "Videos", description: "Mainly Videos some Movies...")
all = Category.find_or_create_by(category: "All", description: "Everything and mostly anything")

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

user1.posts.find_or_create_by(title:"Dumb and funny", content:"Guys are dom and funny" , category_id: funny.id)
user1.posts.find_or_create_by(title:"Sadness", content:"Guys are dom and do sad thing" , category_id: sad.id)
user2.posts.find_or_create_by(title:"Dumb and funny", content:"Guys are dom and funny" , category_id: funny.id)
user2.posts.find_or_create_by(title:"Sooper Sadness", content:"Guys are dom do super sad thing" , category_id: sad.id)
user3.posts.find_or_create_by(title:"Dumb and funny 3rd", content:"Guys are dom and funny ;D" , category_id: funny.id)
user3.posts.find_or_create_by(title:"View from my back yard", content:"Look at all the colors" , category_id: sunsets.id)
user3.posts.find_or_create_by(title:"View from my backyard", content:"HAwt photo" , category_id: photos.id)

