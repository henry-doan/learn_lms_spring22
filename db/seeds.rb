roles = ['teacher', 'ta', 'student']

10.times do
  course = Course.create(
    title: Faker::Educator.course_name,
    desc: Faker::Lorem.paragraph(sentence_count: 2),
    subject: Faker::Educator.subject
  )

  5.times do
    user = User.create(
      first_name: Faker::FunnyName.name,
      last_name: Faker::Superhero.name
    )

    Enrollment.create(
      role: roles.sample,
      course_id: course.id,
      user_id: user.id
    )
  end
end

puts 'Data seeded'