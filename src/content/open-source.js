import useStore from "../store";

export default function OpenSource() {
  const [contentPage, setContentPage] = useStore((state) => [
    state.contentPage,
    state.setContentPage,
  ]);
  return (
    <>
      <h1>Open sourced contributes</h1>
      <h2>Recent lib, framework or gists on github</h2>
      <ul>
        <li>
          <a href="https://github.com/0xcyphered/secp256k1-solidity">
            Solidity ECDSA Recover library
          </a>
        </li>
      </ul>
    </>
  );
}
