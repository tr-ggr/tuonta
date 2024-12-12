export async function getProfileById() {
    const res = await fetch(`https://localhost:7113/api/profiles/1`);
    const data = await res.json();
    console.log(data);
}
  