import useStore from "../store";

export default function Overview() {
  const [contentPage, setContentPage] = useStore((state) => [
    state.contentPage,
    state.setContentPage,
  ]);
  return (
    <>
      <h1>Personal homepage</h1>
      <p>
        Hi, This is my personal homepage which you can explore the solar system
        or even beyond beside reading my posts. this is just a try from me on
        THREEjs lib. the source code is open and is available on my github.
      </p>
    </>
  );
}
