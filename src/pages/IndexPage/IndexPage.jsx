import SearchBar from "../../components/SearchBar/SearchBar";
export default function IndexPage({ setSearch }) {
  return (
    <>
      <SearchBar setSearch={setSearch} />
      <h1>Index Page</h1>
    </>
  );
}
