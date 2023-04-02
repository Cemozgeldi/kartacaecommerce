import { Box, Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FcRating } from "react-icons/fc";
import { FiSmile } from "react-icons/fi";
import { useState } from "react";
import { motion } from "framer-motion";
import { useBasket } from "../../contexts/BasketContext";

function Card({ item }) {
  const [rate, setRate] = useState(item?.rating?.rate);
  const [count, setCount] = useState(item?.rating?.count);
  const { addToBasket, items } = useBasket(); // BasketContext
  const findBasketItem = items.find(
    (basket_item) => basket_item.id === item.id
  );

  const handleLike = (e) => {
    e.stopPropagation();
    setRate(rate + 0.1);
  };

  const handleCount = () => {
    setCount(count + 1);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="3"
      w="100%"
      display="flex"
      flexDirection="column"
    >
      <Link to={`/product/${item.id}`}>
        <Box
          as={motion.div}
          layoutId={item.id}
          display="flex"
          justifyItems="center"
          alignItems="center"
          w="100%"
          textAlign="center"
        >
          <Image
            mx="auto"
            src={item.image}
            alt="brown-coat"
            loading="lazy"
            w="150px"
            h="150px"
          />
        </Box>
        <Box p="6">
          <Box d="flex" alignItems="baseline">
            01/04/2023
          </Box>
          <Box mt="1" fontWeight="bold" as="h3" lineHeight="tight">
            {item.title}
          </Box>
          <Box>{item.price}₺</Box>
        </Box>
      </Link>
      <Box flex={1} alignItems="flex-end" flexGrow={1}>
        <Button onClick={handleLike}>
          <FcRating /> {rate.toFixed(1)}
        </Button>
        <Button onClick={handleCount}>
          <FiSmile /> {count}
        </Button>
        <Button
          colorScheme={findBasketItem ? "green" : "pink"}
          variant="solid"
          onClick={() => addToBasket(item, findBasketItem)}
        >
          {findBasketItem ? "Remove from basket" : "Add to basket"}
        </Button>
      </Box>
    </Box>
  );
}

export default Card;
