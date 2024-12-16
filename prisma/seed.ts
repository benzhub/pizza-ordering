import prisma from "@/prisma/client";

async function main() {
  // Check if the table is empty
  const productCount = await prisma.product.count();

  if (productCount === 0) {
    console.log("Seeding the database...");
    await prisma.product.createMany({
      data: [
        {
            id: 1,
            title: "Delicious Pepperoni Pizza 1",
            description: "A classic pizza topped with savory pepperoni slices, melted mozzarella cheese, and tangy tomato sauce.",
            price: 299,
            thumb: "https://images.pexels.com/photos/367915/pexels-photo-367915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            createdAt: "2024-02-28T07:24:33.997Z",
            updatedAt: "2024-02-28T07:24:33.997Z"
          },
          {
            id: 2,
            title: "Supreme Veggie Delight Pizza 2",
            description: "A garden-fresh pizza loaded with colorful bell peppers, onions, mushrooms, olives, and juicy tomatoes.",
            price: 279,
            thumb: "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            createdAt: "2024-02-28T07:24:55.451Z",
            updatedAt: "2024-02-28T07:24:55.451Z"
          },
          {
            id: 3,
            title: "Sizzling BBQ Chicken Pizza 3",
            description: "Tender grilled chicken breast smothered in tangy barbecue sauce, paired with caramelized onions and gooey cheddar cheese.",
            price: 319,
            thumb: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            createdAt: "2024-02-28T07:25:08.018Z",
            updatedAt: "2024-02-28T07:25:08.018Z"
          },
          {
            id: 4,
            title: "Delicious Pepperoni Pizza 4",
            description: "A classic pizza topped with savory pepperoni slices, melted mozzarella cheese, and tangy tomato sauce.",
            price: 299,
            thumb: "https://images.pexels.com/photos/367915/pexels-photo-367915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            createdAt: "2024-02-28T07:24:33.997Z",
            updatedAt: "2024-02-28T07:24:33.997Z"
          },
          {
            id: 5,
            title: "Supreme Veggie Delight Pizza 5",
            description: "A garden-fresh pizza loaded with colorful bell peppers, onions, mushrooms, olives, and juicy tomatoes.",
            price: 279,
            thumb: "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            createdAt: "2024-02-28T07:24:55.451Z",
            updatedAt: "2024-02-28T07:24:55.451Z"
          },
          {
            id: 6,
            title: "Sizzling BBQ Chicken Pizza 6",
            description: "Tender grilled chicken breast smothered in tangy barbecue sauce, paired with caramelized onions and gooey cheddar cheese.",
            price: 319,
            thumb: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            createdAt: "2024-02-28T07:25:08.018Z",
            updatedAt: "2024-02-28T07:25:08.018Z"
          },
          {
            id: 7,
            title: "Delicious Pepperoni Pizza 7",
            description: "A classic pizza topped with savory pepperoni slices, melted mozzarella cheese, and tangy tomato sauce.",
            price: 299,
            thumb: "https://images.pexels.com/photos/367915/pexels-photo-367915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            createdAt: "2024-02-28T07:24:33.997Z",
            updatedAt: "2024-02-28T07:24:33.997Z"
          },
          {
            id: 8,
            title: "Supreme Veggie Delight Pizza 8",
            description: "A garden-fresh pizza loaded with colorful bell peppers, onions, mushrooms, olives, and juicy tomatoes.",
            price: 279,
            thumb: "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            createdAt: "2024-02-28T07:24:55.451Z",
            updatedAt: "2024-02-28T07:24:55.451Z"
          },
          {
            id: 9,
            title: "Sizzling BBQ Chicken Pizza 9",
            description: "Tender grilled chicken breast smothered in tangy barbecue sauce, paired with caramelized onions and gooey cheddar cheese.",
            price: 319,
            thumb: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            createdAt: "2024-02-28T07:25:08.018Z",
            updatedAt: "2024-02-28T07:25:08.018Z"
          },
          {
            id: 10,
            title: "Delicious Pepperoni Pizza 10",
            description: "A classic pizza topped with savory pepperoni slices, melted mozzarella cheese, and tangy tomato sauce.",
            price: 299,
            thumb: "https://images.pexels.com/photos/367915/pexels-photo-367915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            createdAt: "2024-02-28T07:24:33.997Z",
            updatedAt: "2024-02-28T07:24:33.997Z"
          },{
            id: 11,
            title: "Supreme Veggie Delight Pizza 11",
            description: "A garden-fresh pizza loaded with colorful bell peppers, onions, mushrooms, olives, and juicy tomatoes.",
            price: 279,
            thumb: "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            createdAt: "2024-02-28T07:24:55.451Z",
            updatedAt: "2024-02-28T07:24:55.451Z"
          },
          {
            id: 12,
            title: "Sizzling BBQ Chicken Pizza 12",
            description: "Tender grilled chicken breast smothered in tangy barbecue sauce, paired with caramelized onions and gooey cheddar cheese.",
            price: 319,
            thumb: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            createdAt: "2024-02-28T07:25:08.018Z",
            updatedAt: "2024-02-28T07:25:08.018Z"
          },
          {
            id: 13,
            title: "Delicious Pepperoni Pizza 13",
            description: "A classic pizza topped with savory pepperoni slices, melted mozzarella cheese, and tangy tomato sauce.",
            price: 299,
            thumb: "https://images.pexels.com/photos/367915/pexels-photo-367915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            createdAt: "2024-02-28T07:24:33.997Z",
            updatedAt: "2024-02-28T07:24:33.997Z"
          },
          {
            id: 14,
            title: "Supreme Veggie Delight Pizza 14",
            description: "A garden-fresh pizza loaded with colorful bell peppers, onions, mushrooms, olives, and juicy tomatoes.",
            price: 279,
            thumb: "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            createdAt: "2024-02-28T07:24:55.451Z",
            updatedAt: "2024-02-28T07:24:55.451Z"
          },
          {
            id: 15,
            title: "Sizzling BBQ Chicken Pizza 15",
            description: "Tender grilled chicken breast smothered in tangy barbecue sauce, paired with caramelized onions and gooey cheddar cheese.",
            price: 319,
            thumb: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            createdAt: "2024-02-28T07:25:08.018Z",
            updatedAt: "2024-02-28T07:25:08.018Z"
          },{
            id: 16,
            title: "Delicious Pepperoni Pizza 16",
            description: "A classic pizza topped with savory pepperoni slices, melted mozzarella cheese, and tangy tomato sauce.",
            price: 299,
            thumb: "https://images.pexels.com/photos/367915/pexels-photo-367915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            createdAt: "2024-02-28T07:24:33.997Z",
            updatedAt: "2024-02-28T07:24:33.997Z"
          },
          {
            id: 17,
            title: "Supreme Veggie Delight Pizza 17",
            description: "A garden-fresh pizza loaded with colorful bell peppers, onions, mushrooms, olives, and juicy tomatoes.",
            price: 279,
            thumb: "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            createdAt: "2024-02-28T07:24:55.451Z",
            updatedAt: "2024-02-28T07:24:55.451Z"
          },
          {
            id: 18,
            title: "Sizzling BBQ Chicken Pizza 18",
            description: "Tender grilled chicken breast smothered in tangy barbecue sauce, paired with caramelized onions and gooey cheddar cheese.",
            price: 319,
            thumb: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            createdAt: "2024-02-28T07:25:08.018Z",
            updatedAt: "2024-02-28T07:25:08.018Z"
          },
          {
            id: 19,
            title: "Delicious Pepperoni Pizza 19",
            description: "A classic pizza topped with savory pepperoni slices, melted mozzarella cheese, and tangy tomato sauce.",
            price: 299,
            thumb: "https://images.pexels.com/photos/367915/pexels-photo-367915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            createdAt: "2024-02-28T07:24:33.997Z",
            updatedAt: "2024-02-28T07:24:33.997Z"
          },
          {
            id: 20,
            title: "Supreme Veggie Delight Pizza 20",
            description: "A garden-fresh pizza loaded with colorful bell peppers, onions, mushrooms, olives, and juicy tomatoes.",
            price: 279,
            thumb: "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            createdAt: "2024-02-28T07:24:55.451Z",
            updatedAt: "2024-02-28T07:24:55.451Z"
          },
          {
            id: 21,
            title: "Sizzling BBQ Chicken Pizza 21",
            description: "Tender grilled chicken breast smothered in tangy barbecue sauce, paired with caramelized onions and gooey cheddar cheese.",
            price: 319,
            thumb: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            createdAt: "2024-02-28T07:25:08.018Z",
            updatedAt: "2024-02-28T07:25:08.018Z"
          },
          {
            id: 22,
            title: "Delicious Pepperoni Pizza 22",
            description: "A classic pizza topped with savory pepperoni slices, melted mozzarella cheese, and tangy tomato sauce.",
            price: 299,
            thumb: "https://images.pexels.com/photos/367915/pexels-photo-367915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            createdAt: "2024-02-28T07:24:33.997Z",
            updatedAt: "2024-02-28T07:24:33.997Z"
          },
          {
            id: 23,
            title: "Supreme Veggie Delight Pizza 23",
            description: "A garden-fresh pizza loaded with colorful bell peppers, onions, mushrooms, olives, and juicy tomatoes.",
            price: 279,
            thumb: "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            createdAt: "2024-02-28T07:24:55.451Z",
            updatedAt: "2024-02-28T07:24:55.451Z"
          },
          {
            id: 24,
            title: "Sizzling BBQ Chicken Pizza 24",
            description: "Tender grilled chicken breast smothered in tangy barbecue sauce, paired with caramelized onions and gooey cheddar cheese.",
            price: 319,
            thumb: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            createdAt: "2024-02-28T07:25:08.018Z",
            updatedAt: "2024-02-28T07:25:08.018Z"
          },
      ],
    });
    console.log("Database seeded successfully!");
  } else {
    console.log("Database already seeded. No changes made.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
