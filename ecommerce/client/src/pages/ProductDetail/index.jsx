import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Button, Text, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useBasket } from "../../contexts/BasketContext";

function ProductDetail() {
  const { product_id } = useParams();
  const { addToBasket, items } = useBasket();

  const { isLoading, error, data } = useQuery(["productData", product_id], () =>
    fetch(`https://fakestoreapi.com/products/${product_id}`).then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const findBasketItem = items.find((item) => item.id === data.id);

  return (
    <div>
      <Button
        colorScheme="pink"
        onClick={() => addToBasket(data, findBasketItem)}
      >
        {findBasketItem ? "Remove from basket" : "Add to basket"}
      </Button>
      <Box>
        <Box>
          <Text as="h2" fontSize="2xl">
            {data.title}
          </Text>{" "}
        </Box>
        <Box display="flex" justifyContent="space-between">
          <motion.img
            layoutId={data.id}
            src={data.image}
            alt="im"
            width={200}
          />
          <Text mx={3} textAlign="center" alignSelf="center">
            {data.description}
          </Text>
        </Box>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
          mt={-20}
          ml={150}
        >
          {data.price}₺
        </Text>
      </Box>
    </div>
  );
}

export default ProductDetail;
