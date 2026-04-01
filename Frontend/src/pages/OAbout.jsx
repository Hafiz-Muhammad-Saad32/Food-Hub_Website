export default function About() {
  return (
    <div className="min-h-screen bg-light">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About FoodHub</h1>
          <p className="text-lg md:text-xl opacity-90">
            Your trusted partner for delicious food delivery
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-dark mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                FoodHub was founded in 2023 with a simple mission: to bring
                delicious food from local restaurants to your doorstep. What
                started as a small idea has grown into a platform serving
                thousands of satisfied customers.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We believe that good food brings people together. That's why we
                partner with the best restaurants and chefs in the city to
                ensure every meal is an experience worth remembering.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our commitment to quality, speed, and customer satisfaction
                drives everything we do. Join us on this delicious journey!
              </p>
            </div>
            <div className="text-center">
              <div className="text-8xl mb-4">📖</div>
              <div className="card p-8">
                <p className="text-4xl font-bold text-primary mb-2">50K+</p>
                <p className="text-gray-600">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="section-title">Our Mission & Vision</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="card p-8 text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-dark mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To deliver the finest quality food with exceptional service,
                making dining convenient and affordable for everyone in the
                community.
              </p>
            </div>

            {/* Vision */}
            <div className="card p-8 text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-dark mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To become the leading food delivery platform globally, known
                for reliability, quality, and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                name: "John Doe",
                role: "Founder & CEO",
                emoji: "👨‍💼",
              },
              {
                name: "Sarah Smith",
                role: "Head of Operations",
                emoji: "👩‍💼",
              },
              {
                name: "Mike Johnson",
                role: "Tech Lead",
                emoji: "👨‍💻",
              },
              {
                name: "Emma Wilson",
                role: "Customer Support",
                emoji: "👩‍💼",
              },
            ].map((member, idx) => (
              <div key={idx} className="card p-6 text-center hover:shadow-hover">
                <div className="text-5xl mb-3">{member.emoji}</div>
                <h3 className="text-lg font-bold text-dark mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="section-title">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="text-6xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-dark mb-2">Quality</h3>
              <p className="text-gray-600">
                We never compromise on the quality of our food and service
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="text-6xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-dark mb-2">Trust</h3>
              <p className="text-gray-600">
                Building lasting relationships with customers and partners
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-dark mb-2">Innovation</h3>
              <p className="text-gray-600">
                Continuously improving and adapting to customer needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Order?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Discover amazing food from your favorite restaurants
          </p>
          <button className="bg-white text-primary px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            Start Ordering Now
          </button>
        </div>
      </section>
    </div>
  );
}
