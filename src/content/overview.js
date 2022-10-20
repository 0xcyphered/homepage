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
        THREEjs lib.
      </p>
      <p>
        I'm actively developing website so and many parts are not implemented
        yet and maybe you face some unwanted features. The source code is not
        licensed and is available on the&nbsp;
        <a href="https://github.com/0xcyphered/" alt="Cyphered github">
          Github
        </a>
        .
      </p>
    </>
  );
}
