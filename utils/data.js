const restaurantData = [
    {
      title: "Spicy Treats",
      imgUrl: "https://example.com/images/spicy-treats.jpg",
      food: ["Biryani", "Butter Chicken", "Paneer Tikka"],
      time: "30-45 min",
      pickUp: true,
      delivery: true,
      isOpen: true,
      logoUrl: "https://example.com/logos/spicy-treats.png",
      rating: 4.5,
      ratingCount: "245",
      code: "SPICY245",
      coords: {
        id: "1",
        latitude: 28.6139,
        latitudeDelta: 0.01,
        longitude: 77.209,
        longitudeDelta: 0.01,
        address: "Connaught Place, New Delhi, India",
        title: "Spicy Treats - CP"
      }
    },
    {
      title: "Burger House",
      imgUrl: "https://example.com/images/burger-house.jpg",
      food: ["Cheeseburger", "Veggie Burger", "Fries"],
      time: "15-25 min",
      pickUp: true,
      delivery: true,
      isOpen: false,
      logoUrl: "https://example.com/logos/burger-house.png",
      rating: 4.2,
      ratingCount: "180",
      code: "BURGER180",
      coords: {
        id: "2",
        latitude: 19.076,
        latitudeDelta: 0.01,
        longitude: 72.8777,
        longitudeDelta: 0.01,
        address: "Bandra, Mumbai, India",
        title: "Burger House - Bandra"
      }
    },
    {
      title: "Green Leaf Café",
      imgUrl: "https://example.com/images/green-leaf.jpg",
      food: ["Salad", "Smoothie", "Vegan Wrap"],
      time: "20-30 min",
      pickUp: false,
      delivery: true,
      isOpen: true,
      logoUrl: "https://example.com/logos/green-leaf.png",
      rating: 4.8,
      ratingCount: "320",
      code: "GREEN320",
      coords: {
        id: "3",
        latitude: 12.9716,
        latitudeDelta: 0.01,
        longitude: 77.5946,
        longitudeDelta: 0.01,
        address: "Indiranagar, Bengaluru, India",
        title: "Green Leaf Café - Indiranagar"
      }
    }
  ];
  
  module.exports = restaurantData;
  