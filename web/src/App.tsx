interface ButtonProps {
  title: string;
}

function Button(props: ButtonProps) {
  return <button>{props.title}</button>;
}

function App() {
  return (
    <div>
      <Button title="Hello NLW 1" />
      <Button title="Hello NLW 2" />
      <Button title="Hello NLW 3" />
    </div>
  );
}
export default App;
