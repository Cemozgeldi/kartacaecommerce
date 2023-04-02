import React from "react";
import Card from "../../components/Card";
import { Grid } from "@chakra-ui/react";
import { useQuery } from "react-query";
const Products = () => {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("https://fakestoreapi.com/products/").then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      <Grid
        templateColumns={[
          "repeat(1,1fr)",
          "repeat(2,1fr)",
          "repeat(3,1fr)",
          "repeat(4,1fr)",
          "repeat(5,1fr)",
        ]}
        gap={3}
      >
        {data.map((item, key) => (
          <Card key={key} item={item} />
        ))}
      </Grid>
    </div>
  );
};

export default Products;
