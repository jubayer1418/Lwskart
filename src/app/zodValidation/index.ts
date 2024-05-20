import {
  customerSchemaValidator,
  formDataSchema,
} from "./customerSchemaValidator";

export const validateCustomer = async (data: any) => {
  return customerSchemaValidator.safeParse(data);
};
export const validateCustomerLogin = async (data: any) => {
 
    return  formDataSchema.safeParse(data);
 
};
