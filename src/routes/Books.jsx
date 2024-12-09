import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Button,
  CircularProgress,
  Stack,
  Rating,
  Chip,
  Typography,
} from '@mui/material';

function Books() {
  // State to hold the list of books fetched from the server
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect runs when the component mounts
  useEffect(() => {
    if (books.length === 0) {
      getBooks(); // Fetch the books if the state is empty
    }
  }, []);

  // Function to fetch books data from the API
  // TODO: Replace axios with a custom useAxios hook for more modularity
  async function getBooks() {
    try {
      const response = await axios.get('http://localhost:3000/books');
      setBooks(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  // TODO: Implement search functionality to filter books based on user input
  return (
    <Box sx={{ mx: 'auto', p: 2 }}>
      {/* Show a loading spinner while data is being fetched */}
      {isLoading && <CircularProgress />}

      {!isLoading && (
        <div>
          {/* Stack component used for responsive layout and spacing */}
          <Stack
            sx={{ justifyContent: 'space-around' }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {/* Iterate over the books array and render a Card for each book */}
            {books.map((book) => (
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '15%',
                  minWidth: 200,
                }}
                key={book.name}
              >
                {/* Display the book image */}
                <CardMedia
                  sx={{ height: 250 }}
                  image={book.img}
                  title={book.name}
                />
                <Box sx={{ pt: 2, pl: 2 }}>

                  {book.genres.map((genre, i) => (
                    <Chip
                      key={i}
                      label={genre}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                  <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                    {book.name}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {book.author}
                  </Typography>
                </Box>
                <CardActions
                  sx={{
                    justifyContent: 'space-between',
                    mt: 'auto',
                    pl: 2,
                  }}
                >
                  <Rating
                    name="read-only"
                    value={book.stars} // Rating value
                    readOnly
                    size="small"
                  />

                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </div>
      )}
    </Box>
  );
}

export default Books;
