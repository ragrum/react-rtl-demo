export default async function handler(req, res) {
  const sleep = (delay) =>
    new Promise((resolve) => {
      setTimeout(resolve, delay);
    }, delay);
  const { email, password } = await req.body;
  console.log({ email, password });

  if (email === "pepe@example.com" && password === "12345") {
    await sleep(1000);
    res.status(200).json({ name: "John Doe" });
  }

  if (email && password) {
    await sleep(1000);
    res.status(401).json({ name: "John Doe" });
  }

  await sleep(1000);
  res.status(400).json({ name: "John Doe" });
}
