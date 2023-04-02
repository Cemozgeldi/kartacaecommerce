import * as Yup from "yup";

const validations = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(5, "Parolanız en az 5 karakter olmalıdır")
    .required("Required"),
});

export default validations;
