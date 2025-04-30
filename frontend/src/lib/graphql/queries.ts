import { gql } from "@apollo/client";

export const GET_DEPARTMENTS = gql`
  query GetDepartments($page: Int, $limit: Int) {
    departments(page: $page, limit: $limit) {
      id
      name
      subDepartments {
        id
        name
      }
    }
  }
`;

export const GET_DEPARTMENT = gql`
  query GetDepartment($id: ID!) {
    department(id: $id) {
      id
      name
      subDepartments {
        id
        name
      }
    }
  }
`;
