import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";

import Auth from "../utils/auth";
import { GET_USER } from "../graphql-queries-mutations/queries";
import { REMOVE_BOOK } from "../graphql-queries-mutations/mutations";
import { removeBookId } from "../utils/localStorage";
import ServerAlert from "../components/ServerAlert";

const SavedBooks = () => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  const [removeBook] = useMutation(REMOVE_BOOK, {
    context: {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    },
    onError: () => {
      return ServerAlert;
    },
  });

  const { loading, error, data } = useQuery(GET_USER, {
    context: {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    },
  });

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  if (error) {
    return ServerAlert;
  }

  if (data) {
    const userData = data.me;

    // create function that accepts the book's mongo _id value as param and deletes the book from the database
    const handleDeleteBook = async (bookId) => {
      try {
        await removeBook({
          variables: {
            removeBookBookId: bookId,
          },
        });

        // upon success, remove book's id from localStorage
        removeBookId(bookId);
      } catch (err) {
        return ServerAlert;
      }
    };

    return (
      <>
        <Jumbotron fluid className="text-light bg-dark">
          <Container>
            <h1>Viewing saved books!</h1>
          </Container>
        </Jumbotron>
        <Container>
          <h2>
            {userData.savedBooks.length
              ? `Viewing ${userData.savedBooks.length} saved ${
                  userData.savedBooks.length === 1 ? "book" : "books"
                }:`
              : "You have no saved books!"}
          </h2>
          <CardColumns>
            {userData.savedBooks.map((book) => {
              return (
                <Card key={book.bookId} border="dark">
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className="small">Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </CardColumns>
        </Container>
      </>
    );
  }
};

export default SavedBooks;
