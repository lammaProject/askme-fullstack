interface CreateAsk {
  name: string;
  text: string;
  status?: "pending" | "read" | "complete" | "not";
  asnwer?: string;
}

interface Ask extends CreateAsk {
  id: string;
}
