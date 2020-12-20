import styled from "styled-components"

export const Container = styled.main`
  padding: 10px;
  margin: 0 auto;
  max-width: 1366px;

  ul {
    padding: 16px;
    margin: 16px 0;
    border-radius: 4px;

    background: #fff;
    list-style: none;
  }

  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    input {
      height: 32px;
      border: none;
      padding: 8px;
      border-radius: 4px;
      margin-bottom: 16px;
    }

    button {
      height: 32px;
      padding: 4px;
      border-radius: 4px;
      border: 1px solid #fff;

      color: #fff;
      background: transparent;
    }
  }
`
