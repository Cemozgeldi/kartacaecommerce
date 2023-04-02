import {
  Alert,
  Link,
  Image,
  Button,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { postOrder } from "../../api";
import { useBasket } from "../../contexts/BasketContext";

const Basket = () => {
  const [address, setAddress] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const { items, removeFromBasket } = useBasket();
  const total = items.reduce((acc, item) => acc + item.price, 0);

  const handleSubmitForm = async () => {
    // console.log("submit");
    const itemIds = items.map((item) => item.id);
    const input = {
      address,
      items: JSON.stringify(itemIds),
    };
    const response = await postOrder(input);
    console.log(response);
    console.log(itemIds);
  };
  return (
    <Box p="5">
      {items.length < 1 && <Alert status="info">Your basket is empty</Alert>}
      {items.length > 0 && (
        <>
          <ul style={{ listStyleType: "decimal" }}>
            {items.map((item) => (
              <li key={item.id} style={{ marginBottom: 20 }}>
                <Link to={`/product/${item.id}`}>
                  <Text fontSize={20} fontWeight="semibold">
                    {item.title} - {item.price}₺
                  </Text>
                  <Image
                    htmlWidth={200}
                    loading="lazy"
                    src={item.image}
                    alt="basket item"
                  ></Image>
                </Link>
                <Button
                  mt="2"
                  size="sm"
                  colorScheme="pink"
                  onClick={() => removeFromBasket(item.id)}
                >
                  SepettenKaldır
                </Button>
              </li>
            ))}
          </ul>
          <Box mt={10}>
            <Text fontSize={30} fontWeight="bold">
              Total:{total}
            </Text>
          </Box>

          <Button mt={2} size="sm" colorScheme="green" onClick={onOpen}>
            Order
          </Button>
          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Order Page</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Adress</FormLabel>
                  <Textarea
                    ref={initialRef}
                    placeholder="Adress"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSubmitForm}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
};

export default Basket;
