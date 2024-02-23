// JavaScript code for handling pagination and filter count

// Sample book data
const books = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", subject: "Classic Literature", publishDate: "1925" },
    { title: "To Kill a Mockingbird", author: "Harper Lee", subject: "Fiction", publishDate: "1960" },
    { title: "1984", author: "George Orwell", subject: "Dystopian Fiction", publishDate: "1949" },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", subject: "Coming-of-age Fiction", publishDate: "1951" },
    { title: "Pride and Prejudice", author: "Jane Austen", subject: "Romantic Fiction", publishDate: "1813" },
    { title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", subject: "Fantasy", publishDate: "1997" },
    { title: "The Hobbit", author: "J.R.R. Tolkien", subject: "Fantasy", publishDate: "1937" },
    { title: "The Da Vinci Code", author: "Dan Brown", subject: "Mystery", publishDate: "2003" },
    { title: "The Hunger Games", author: "Suzanne Collins", subject: "Young Adult Fiction", publishDate: "2008" },
    { title: "The Lord of the Rings", author: "J.R.R. Tolkien", subject: "Fantasy", publishDate: "1954" },
    { title: "The Alchemist", author: "Paulo Coelho", subject: "Fantasy", publishDate: "1988" },
    { title: "The Shining", author: "Stephen King", subject: "Horror", publishDate: "1977" },
    // Add more books as needed
  ];
  
  // Pagination
  let currentPage = 1;
  const perPage = 10;
  
  const prevPageBtn = document.getElementById('prevPage');
  const nextPageBtn = document.getElementById('nextPage');
  const currentPageSpan = document.getElementById('currentPage');
  
  function displayBooks(page) {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const booksToShow = books.slice(startIndex, endIndex);
  
    const booksList = document.getElementById('books');
    booksList.innerHTML = '';
  
    booksToShow.forEach(book => {
      const li = document.createElement('li');
      li.textContent = `${book.title} - ${book.author} - ${book.subject} - ${book.publishDate}`;
      booksList.appendChild(li);
    });
  
    currentPageSpan.textContent = `Page ${currentPage}`;
  }
  
  prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      displayBooks(currentPage);
    }
  });
  
  nextPageBtn.addEventListener('click', () => {
    const maxPage = Math.ceil(books.length / perPage);
    if (currentPage < maxPage) {
      currentPage++;
      displayBooks(currentPage);
    }
  });
  
  displayBooks(currentPage);
  
  // Filter counts
  const titleFilterInput = document.getElementById('titleFilter');
  const authorFilterInput = document.getElementById('authorFilter');
  const subjectFilterInput = document.getElementById('subjectFilter');
  const publishDateFilterInput = document.getElementById('publishDateFilter');
  const filterCountsDiv = document.getElementById('filterCounts');
  
  function updateFilterCounts() {
    const titleFilter = titleFilterInput.value.toLowerCase();
    const authorFilter = authorFilterInput.value.toLowerCase();
    const subjectFilter = subjectFilterInput.value.toLowerCase();
    const publishDateFilter = publishDateFilterInput.value.toLowerCase();
  
    const filteredBooks = books.filter(book =>
      book.title.toLowerCase().includes(titleFilter) &&
      book.author.toLowerCase().includes(authorFilter) &&
      book.subject.toLowerCase().includes(subjectFilter) &&
      book.publishDate.toLowerCase().includes(publishDateFilter)
    );
  
    filterCountsDiv.innerHTML = `
      Title: ${filteredBooks.length} books<br>
      Author: ${filteredBooks.length} books<br>
      Subject: ${filteredBooks.length} books<br>
      Publish Date: ${filteredBooks.length} books
    `;
  }
  
  titleFilterInput.addEventListener('input', updateFilterCounts);
  authorFilterInput.addEventListener('input', updateFilterCounts);
  subjectFilterInput.addEventListener('input', updateFilterCounts);
  publishDateFilterInput.addEventListener('input', updateFilterCounts);
  
  updateFilterCounts();
  