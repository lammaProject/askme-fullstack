interface CreateAsk {
  name: string;
  text: string;
  status?: "pending" | "read" | "complete" | "not";
}

interface Ask extends CreateAsk {
  id: string;
}
