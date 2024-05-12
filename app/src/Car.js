export function Car() {
  const shoot = (msg) => {
    alert(msg);
  };
  const element = <button onClick={()=>shoot("hello")}>Click Me</button>
  return <h2>Hi, I am a Car! {element}</h2>;
}

