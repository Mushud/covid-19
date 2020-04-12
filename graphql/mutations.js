import { gql } from '@apollo/client';

const loginUserMutation = gql`
  mutation($phone: String!) {
    loginUser(input: { phone: $phone }) {
      success
    }
  }
`;

const validateLoginMutation = gql`
  mutation($phone: String!, $otp: String!) {
    validateLoginUser(input: { phone: $phone, otp: $otp }) {
      mobileToken
    }
  }
`;

export { loginUserMutation, validateLoginMutation };
