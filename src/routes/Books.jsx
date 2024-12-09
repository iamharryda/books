import { useEffect, useState } from 'react';
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
  Alert,
} from '@mui/material';
import useAxios from '../services/useAxios';

function Books() {
  const { data, alert, loading, get } = useAxios('http://localhost:3000'); // Initialize the hook with base URL
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (books.length === 0) {
      fetchBooks(); // Fetch books on component mount
    }
  }, []);

  // Fetch books from the server
  const fetchBooks = async () => {
    await get('books'); // Use the `get` function of `useAxios` hook
  };

  // Set books when data is updated
  useEffect(() => {
    if (data) {
      setBooks(data); // Update local state with fetched data
    }
  }, [data]);

  return (
    <Box sx={{ mx: 'auto', p: 2 }}>
      {/* Show an alert if there's any */}
      {alert.show && <Alert severity={alert.type}>{alert.message}</Alert>}
      {/* Show a loading spinner while fetching data */}
      {loading && <CircularProgress />}
      {!loading && (
        <div>
          <Stack
            sx={{ justifyContent: 'space-around' }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
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
                    value={book.stars}
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
