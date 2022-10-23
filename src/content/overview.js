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
        You can understand more about me and reading my posts beside exploring
        the solar system or even beyond. this is just a try at amazing THREEjs.
      </p>
      <p>
        I'm actively developing website so many parts are not implemented and
        maybe you face some unwanted features. The source code is not licensed
        and is available on the&nbsp;
        <a href="https://github.com/0xcyphered/" alt="Cyphered github">
          Github
        </a>
        .
      </p>
    </>
  );
}
