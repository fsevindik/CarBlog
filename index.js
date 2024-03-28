import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 4000;
// Do not forget to first   "nodemon server.js"
// then you will run ur "index.js" with nodemon  again

let posts = [
  {
    id: 1,
    title: "The Legendary W-124 German-built Mercedes",
    content:
      "The W-124 series by Mercedes-Benz is revered for its engineering excellence, durability, and timeless design. Introduced in the mid-1980s, the W-124 quickly gained a reputation for its robust construction and advanced technology. Its sleek yet understated aesthetics combined with unparalleled reliability made it a favorite among discerning drivers worldwide. Additionally, some people believe that only cockroaches and W-124s will see the end of the world.",
    author: "Old-Benz",
    date: "2024-03-23T10:00:00Z",
    pictureUrl:
      "https://www.team-bhp.com/sites/default/files/styles/check_extra_large_for_review/public/merc-w124-mechatronik-1.jpg",
  },
  {
    id: 2,
    title: "Unveiling the Ford American Dream Mustang",
    content:
      "No list of epic cars would be complete without mentioning the Ford Mustang. A symbol of the American automotive industry, the Mustang embodies the spirit of freedom and adventure. Since its debut in 1964, the Mustang has captured the hearts of enthusiasts with its muscular presence, exhilarating performance, and iconic design cues. Always will be the number one best seller of the sportscar.",
    author: "Americano",
    date: "2024-03-23T11:00:00Z",
    pictureUrl:
      "https://images.ctfassets.net/lym53uuylvg8/1YrIsuG5YB1Hft7MQvgso2/51d2a2f577bd3a62786125379162f9e3/6_Of_The_Best_Ford_Mustangs__8__-_Copy.jpg?fm=webp&w=1000&q=85",
  },
  {
    id: 3,
    title: "Behold the French Masterpiece: Citroen DS 1970",
    content:
      "When this vehicle was introduced, everyone thought it came from the future: behold the French masterpiece, Citroen DS 1970.",
    author: "La conducteur",
    date: "2024-03-23T12:00:00Z",
    pictureUrl:
      "https://www.classicdriver.com/sites/default/files/cars_images/citro12n_21ds_pallas_008.jpg",
  },
  {
    id: 4,
    title: "Godzilla  Nissan-GT-R",
    content:
      "At launch, the R32 Skyline GT-R of 1989 was often mentioned in the same sentence as the Porsche 959. It was designed around a set of racing rules, Group A, and dominated. And as a road car it’s awesome, and some people called it as GODZILLA. ",
    author: "Samuari Jack",
    pictureUrl:
      "https://www.topgear.com/sites/default/files/news-listicle/image/8s4a8993.jpg?w=827&h=465",
  },
];

let lastId = 3;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

app.post("/posts", (req, res) => {
  const newId = (lastId += 1);
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
