import fileStore from "./file.store";
import inMemoryStore from "./in-memory.store";

const useInMemoryStore = process.env.USE_IN_MEMORY_STORE === "true";

console.log(`Using ${useInMemoryStore ? "in-memory" : "file"} store`);

export default useInMemoryStore ? inMemoryStore : fileStore;
